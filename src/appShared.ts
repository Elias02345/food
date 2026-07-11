import { Apple, BookOpen, CircleGauge, Dumbbell, ClipboardList, Flame, Home, Moon, Refrigerator, ShoppingBasket, Sun, Target, Utensils, Zap } from 'lucide-react'
import type { MacroTarget, Nutrition, RecipeCategory } from './types'

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
export const addNutrition = (a: MacroTarget, b: Nutrition, scale = 1): MacroTarget => ({
  calories: Math.round(a.calories + b.calories * scale), protein: Math.round((a.protein + b.protein * scale) * 10) / 10,
  carbs: Math.round((a.carbs + b.carbs * scale) * 10) / 10, fat: Math.round((a.fat + b.fat * scale) * 10) / 10,
})
