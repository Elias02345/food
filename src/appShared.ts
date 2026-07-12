import { Apple, BookOpen, CircleGauge, Dumbbell, ClipboardList, Flame, Home, Moon, Refrigerator, ShoppingBasket, Sun, Target, Utensils, Zap } from 'lucide-react'
import type { MacroTarget, MealDistribution, Nutrition, RecipeCategory } from './types'

export const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
export const navItems = [
  { id: 'home', label: 'Übersicht', icon: Home },
  { id: 'finder', label: 'Recipe Finder', icon: Target },
  { id: 'browse', label: 'Rezepte', icon: BookOpen },
  { id: 'planner', label: 'Wochenplan', icon: ClipboardList },
  { id: 'shopping', label: 'Einkauf', icon: ShoppingBasket },
  { id: 'pantry', label: 'Vorräte', icon: Refrigerator },
] as const

export type Page = typeof navItems[number]['id'] | 'settings'
export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const mealSlots: RecipeCategory[] = ['Frühstück', 'Mittagessen', 'Pre-Workout', 'Abendessen', 'Snack']
export const defaultMealDistribution: MealDistribution = { Frühstück: 25, Mittagessen: 30, 'Pre-Workout': 10, Abendessen: 30, Snack: 5 }

export const categoryIcons: Record<RecipeCategory, typeof Apple> = {
  Frühstück: Sun, Mittagessen: Utensils, 'Pre-Workout': Zap, Abendessen: Moon, Snack: Apple,
}
export const emptyNutrition: Nutrition = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
export const macroFields = [
  { key: 'calories', label: 'Kalorien', short: 'kcal', icon: Flame },
  { key: 'protein', label: 'Protein', short: 'g', icon: Dumbbell },
  { key: 'carbs', label: 'Kohlenhydrate', short: 'g', icon: Zap },
  { key: 'fat', label: 'Fett', short: 'g', icon: CircleGauge },
] as const

export const clampRemaining = (target: MacroTarget, consumed: MacroTarget): MacroTarget => ({
  calories: Math.max(0, target.calories - consumed.calories), protein: Math.max(0, target.protein - consumed.protein),
  carbs: Math.max(0, target.carbs - consumed.carbs), fat: Math.max(0, target.fat - consumed.fat),
})

export const scaleMacroTarget = (target: MacroTarget, percent: number): MacroTarget => {
  const factor = Math.max(0, percent) / 100
  return {
    calories: Math.round(target.calories * factor),
    protein: Math.round(target.protein * factor * 10) / 10,
    carbs: Math.round(target.carbs * factor * 10) / 10,
    fat: Math.round(target.fat * factor * 10) / 10,
  }
}

export const normalizeMealDistribution = (distribution: MealDistribution): Record<RecipeCategory, number> => {
  const positiveTotal = mealSlots.reduce((sum, slot) => sum + Math.max(0, distribution[slot] ?? 0), 0)
  const source = positiveTotal > 0 ? distribution : defaultMealDistribution
  const total = mealSlots.reduce((sum, slot) => sum + Math.max(0, source[slot] ?? 0), 0)
  return Object.fromEntries(mealSlots.map((slot) => [slot, Math.max(0, source[slot] ?? 0) / total])) as Record<RecipeCategory, number>
}

export const rebalanceMealDistribution = (distribution: MealDistribution): MealDistribution => {
  const normalized = normalizeMealDistribution(distribution)
  const entries = mealSlots.map((slot) => [slot, Math.round(normalized[slot] * 100)] as const)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  const largestIndex = entries.reduce((best, current, index) => current[1] > entries[best][1] ? index : best, 0)
  entries[largestIndex] = [entries[largestIndex][0], entries[largestIndex][1] + (100 - total)]
  return Object.fromEntries(entries) as MealDistribution
}

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const addNutrition = (a: MacroTarget, b: Nutrition, scale = 1): MacroTarget => ({
  calories: Math.round(a.calories + b.calories * scale), protein: Math.round((a.protein + b.protein * scale) * 10) / 10,
  carbs: Math.round((a.carbs + b.carbs * scale) * 10) / 10, fat: Math.round((a.fat + b.fat * scale) * 10) / 10,
})
