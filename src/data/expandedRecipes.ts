import type { Recipe } from '../types'
import { expandedBreakfast } from './expandedBreakfast'
import { expandedLunch } from './expandedLunch'
import { expandedPreWorkout } from './expandedPreWorkout'
import { expandedDinner } from './expandedDinner'
import { expandedSnacks } from './expandedSnacks'

const rawExpandedRecipes: Recipe[] = [
  ...expandedBreakfast,
  ...expandedLunch,
  ...expandedPreWorkout,
  ...expandedDinner,
  ...expandedSnacks,
]

export const expandedRecipes = rawExpandedRecipes.map((recipe) => {
  if (recipe.id.startsWith('exp-pre-workout-quark-fruit-cup-')) {
    return { ...recipe, title: recipe.title.replace('Quark-Frucht-Cup', 'Quark-Frucht-Trainingscup') }
  }
  if (recipe.id.startsWith('exp-snack-tuna-cucumber-cup-')) {
    return { ...recipe, title: recipe.title.replace('Thunfisch-Gemüse-Cup', 'Thunfisch-Skyr-Snackcup') }
  }
  return recipe
})
