import type { MacroTarget, Recipe, RecipeMatch, Nutrition } from '../types'
import { scaleNutrition } from './nutrition'

export type MatchOptions = {
  category?: string
  maxMinutes?: number
  vegetarian?: boolean
  vegan?: boolean
  portable?: boolean
  pantryIngredientIds?: string[]
  pantryOnly?: boolean
  priority?: 'balanced' | 'protein' | 'calories' | 'carbs'
}

const safeTarget = (value: number, fallback: number) => Math.max(value, fallback)

const scoreNutrition = (nutrition: Nutrition, target: MacroTarget, priority: MatchOptions['priority'] = 'balanced') => {
  const weights = {
    balanced: { calories: 1.35, protein: 1.5, carbs: 0.95, fat: 1.1 },
    protein: { calories: 1.1, protein: 2.7, carbs: 0.65, fat: 0.8 },
    calories: { calories: 2.8, protein: 1.1, carbs: 0.65, fat: 0.85 },
    carbs: { calories: 1.15, protein: 1.0, carbs: 2.25, fat: 0.75 },
  }[priority]

  const components = {
    calories: Math.abs(nutrition.calories - target.calories) / safeTarget(target.calories, 250),
    protein: Math.abs(nutrition.protein - target.protein) / safeTarget(target.protein, 20),
    carbs: Math.abs(nutrition.carbs - target.carbs) / safeTarget(target.carbs, 30),
    fat: Math.abs(nutrition.fat - target.fat) / safeTarget(target.fat, 10),
  }

  const overshootPenalty =
    Math.max(0, nutrition.calories - target.calories) / safeTarget(target.calories, 250) * 0.9 +
    Math.max(0, nutrition.fat - target.fat) / safeTarget(target.fat, 10) * 0.45

  return (
    components.calories * weights.calories +
    components.protein * weights.protein +
    components.carbs * weights.carbs +
    components.fat * weights.fat +
    overshootPenalty
  )
}

const fitLabel = (score: number): RecipeMatch['fitLabel'] => {
  if (score < 0.28) return 'Nahezu perfekt'
  if (score < 0.55) return 'Sehr passend'
  if (score < 0.9) return 'Gut passend'
  return 'Alternative'
}

export const findRecipeMatches = (recipes: Recipe[], target: MacroTarget, options: MatchOptions = {}, limit = 24): RecipeMatch[] => {
  const pantry = new Set(options.pantryIngredientIds ?? [])

  return recipes
    .filter((recipe) => !options.category || options.category === 'Alle' || recipe.category === options.category)
    .filter((recipe) => !options.maxMinutes || recipe.prepMinutes + recipe.cookMinutes <= options.maxMinutes)
    .filter((recipe) => !options.vegetarian || recipe.vegetarian)
    .filter((recipe) => !options.vegan || recipe.vegan)
    .filter((recipe) => !options.portable || recipe.portable)
    .map((recipe) => {
      const usedIds = recipe.ingredients.map((item) => item.ingredientId)
      const pantryCoverage = usedIds.length ? usedIds.filter((id) => pantry.has(id)).length / usedIds.length : 0
      return { recipe, pantryCoverage }
    })
    .filter(({ pantryCoverage }) => !options.pantryOnly || pantryCoverage === 1)
    .map(({ recipe, pantryCoverage }) => {
      let bestScale = 1
      let bestScore = Number.POSITIVE_INFINITY
      let bestNutrition = recipe.nutrition

      for (let scale = 0.5; scale <= 2.5; scale += 0.05) {
        const nutrition = scaleNutrition(recipe.nutrition, scale)
        let score = scoreNutrition(nutrition, target, options.priority)
        score -= pantryCoverage * 0.1
        if (scale < 0.7 || scale > 1.8) score += 0.08
        if (score < bestScore) {
          bestScore = score
          bestScale = Math.round(scale * 20) / 20
          bestNutrition = nutrition
        }
      }

      return {
        recipe,
        scale: bestScale,
        nutrition: bestNutrition,
        score: bestScore,
        fitLabel: fitLabel(bestScore),
        differences: {
          calories: Math.round(target.calories - bestNutrition.calories),
          protein: Math.round((target.protein - bestNutrition.protein) * 10) / 10,
          carbs: Math.round((target.carbs - bestNutrition.carbs) * 10) / 10,
          fat: Math.round((target.fat - bestNutrition.fat) * 10) / 10,
        },
        pantryCoverage,
      }
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
}

export type RecipePairMatch = {
  first: RecipeMatch
  second: RecipeMatch
  combined: Nutrition
  score: number
}

export const findRecipePairs = (recipes: Recipe[], target: MacroTarget, options: MatchOptions = {}, limit = 8): RecipePairMatch[] => {
  const candidates = findRecipeMatches(recipes, target, options, 32)
  const pairs: RecipePairMatch[] = []

  for (let i = 0; i < Math.min(candidates.length, 20); i += 1) {
    for (let j = i + 1; j < Math.min(candidates.length, 20); j += 1) {
      const a = candidates[i]
      const b = candidates[j]
      const first = { ...a, scale: Math.max(0.5, a.scale * 0.55), nutrition: scaleNutrition(a.recipe.nutrition, Math.max(0.5, a.scale * 0.55)) }
      const second = { ...b, scale: Math.max(0.5, b.scale * 0.55), nutrition: scaleNutrition(b.recipe.nutrition, Math.max(0.5, b.scale * 0.55)) }
      const combined = {
        calories: first.nutrition.calories + second.nutrition.calories,
        protein: first.nutrition.protein + second.nutrition.protein,
        carbs: first.nutrition.carbs + second.nutrition.carbs,
        fat: first.nutrition.fat + second.nutrition.fat,
        fiber: first.nutrition.fiber + second.nutrition.fiber,
      }
      const score = scoreNutrition(combined, target, options.priority)
      pairs.push({ first, second, combined, score })
    }
  }

  return pairs.sort((a, b) => a.score - b.score).slice(0, limit)
}
