import type { Recipe, RecipeCategory } from '../types'
import { breakfast } from './breakfast'
import { lunch } from './lunch'
import { preWorkout } from './preWorkout'
import { dinner } from './dinner'
import { snacks } from './snacks'

export const recipes: Recipe[] = [...breakfast, ...lunch, ...preWorkout, ...dinner, ...snacks]
export const recipeCategories: RecipeCategory[] = ['Frühstück', 'Mittagessen', 'Pre-Workout', 'Abendessen', 'Snack']
export const recipesById = Object.fromEntries(recipes.map((recipe) => [recipe.id, recipe])) as Record<string, Recipe>
