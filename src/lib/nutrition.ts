import { ingredients } from '../data/ingredients'
import type { Nutrition, RecipeIngredient } from '../types'

export const emptyNutrition = (): Nutrition => ({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })

export const roundNutrition = (value: Nutrition): Nutrition => ({
  calories: Math.round(value.calories),
  protein: Math.round(value.protein * 10) / 10,
  carbs: Math.round(value.carbs * 10) / 10,
  fat: Math.round(value.fat * 10) / 10,
  fiber: Math.round(value.fiber * 10) / 10,
})

export const calculateNutrition = (items: RecipeIngredient[]): Nutrition => {
  const total = items.reduce((sum, item) => {
    const ingredient = ingredients[item.ingredientId]
    if (!ingredient) throw new Error(`Unknown ingredient: ${item.ingredientId}`)
    const factor = item.amount / 100
    return {
      calories: sum.calories + ingredient.nutritionPer100g.calories * factor,
      protein: sum.protein + ingredient.nutritionPer100g.protein * factor,
      carbs: sum.carbs + ingredient.nutritionPer100g.carbs * factor,
      fat: sum.fat + ingredient.nutritionPer100g.fat * factor,
      fiber: sum.fiber + ingredient.nutritionPer100g.fiber * factor,
    }
  }, emptyNutrition())
  return roundNutrition(total)
}

export const scaleNutrition = (nutrition: Nutrition, scale: number): Nutrition => roundNutrition({
  calories: nutrition.calories * scale,
  protein: nutrition.protein * scale,
  carbs: nutrition.carbs * scale,
  fat: nutrition.fat * scale,
  fiber: nutrition.fiber * scale,
})

export const formatAmount = (amount: number) => {
  const rounded = Math.round(amount * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}
