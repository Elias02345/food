import type { Recipe } from '../types'
import { expandedBreakfast } from './expandedBreakfast'
import { expandedLunch } from './expandedLunch'
import { expandedPreWorkout } from './expandedPreWorkout'
import { expandedDinner } from './expandedDinner'
import { expandedSnacks } from './expandedSnacks'

export const expandedRecipes: Recipe[] = [
  ...expandedBreakfast,
  ...expandedLunch,
  ...expandedPreWorkout,
  ...expandedDinner,
  ...expandedSnacks,
]
