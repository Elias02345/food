import { ingredients } from './ingredients'
import { calculateNutrition } from '../lib/nutrition'
import type { Recipe, RecipeCategory, RecipeIngredient } from '../types'

export const ri = (ingredientId: string, amount: number, note?: string): RecipeIngredient => ({ ingredientId, amount, note })

type RecipeInput = Omit<Recipe, 'nutrition' | 'vegetarian' | 'vegan' | 'allergens' | 'difficulty' | 'servings'>

export const makeRecipe = (input: RecipeInput): Recipe => {
  const used = input.ingredients.map((item) => ingredients[item.ingredientId])
  return {
    ...input,
    nutrition: calculateNutrition(input.ingredients),
    vegetarian: used.every((item) => item.vegetarian),
    vegan: used.every((item) => item.vegan),
    allergens: [...new Set(used.flatMap((item) => item.allergens ?? []))],
    difficulty: input.cookMinutes > 15 ? 'Einfach' : 'Sehr einfach',
    servings: 1,
  }
}

export const accents = ['sage', 'berry', 'sun', 'ocean', 'plum', 'citrus', 'tomato', 'mint', 'cocoa']

export const sweetVariants = [
  { name: 'Blaubeere-Zimt', extra: [ri('berries', 120), ri('chia', 8)], note: 'fruchtig und ballaststoffreich' },
  { name: 'Apfel-Zimt', extra: [ri('apple', 160), ri('flax', 8)], note: 'knackig, mild und sättigend' },
  { name: 'Banane-Kakao', extra: [ri('banana', 120), ri('cocoa', 8)], note: 'schokoladig ohne zugesetzten Zucker' },
  { name: 'Beeren-Chia', extra: [ri('berries', 150), ri('chia', 12)], note: 'frisch mit vielen Ballaststoffen' },
  { name: 'Birne-Walnuss', extra: [ri('pear', 150), ri('walnuts', 8)], note: 'saftig mit etwas Crunch' },
  { name: 'Orange-Kiwi', extra: [ri('orange', 120), ri('kiwi', 90)], note: 'leicht und besonders frisch' },
  { name: 'Traube-Mandel', extra: [ri('grapes', 130), ri('almonds', 10)], note: 'süß, knackig und schnell gemacht' },
  { name: 'Banane-Erdnuss', extra: [ri('banana', 100), ri('peanutButter', 10)], note: 'cremig mit natürlicher Süße' },
  { name: 'Beeren-Leinsamen', extra: [ri('berries', 130), ri('flax', 10)], note: 'beerig mit nussiger Note' },
]

export const savoryVariants = [
  { name: 'Spinat-Tomate', extra: [ri('spinach', 100), ri('tomato', 140)] },
  { name: 'Paprika-Zwiebel', extra: [ri('pepper', 140), ri('onion', 50)] },
  { name: 'Champignon-Spinat', extra: [ri('mushroom', 150), ri('spinach', 80)] },
  { name: 'Zucchini-Tomate', extra: [ri('zucchini', 160), ri('tomato', 120)] },
  { name: 'Brokkoli-Paprika', extra: [ri('broccoli', 150), ri('pepper', 100)] },
  { name: 'Erbse-Karotte', extra: [ri('peas', 90), ri('carrot', 110)] },
  { name: 'Tomate-Gurke', extra: [ri('tomato', 150), ri('cucumber', 130)] },
  { name: 'Pilz-Zwiebel', extra: [ri('mushroom', 170), ri('onion', 45)] },
  { name: 'Spinat-Paprika', extra: [ri('spinach', 100), ri('pepper', 150)] },
]

export const bowlVariants = [
  { name: 'Brokkoli-Zitrone', extra: [ri('broccoli', 180), ri('lemon', 35)] },
  { name: 'Paprika-Tomate', extra: [ri('pepper', 160), ri('tomato', 140)] },
  { name: 'Zucchini-Pilz', extra: [ri('zucchini', 170), ri('mushroom', 140)] },
  { name: 'Spinat-Erbse', extra: [ri('spinach', 110), ri('peas', 100)] },
  { name: 'Karotte-Gurke', extra: [ri('carrot', 130), ri('cucumber', 150)] },
  { name: 'Brokkoli-Paprika', extra: [ri('broccoli', 140), ri('pepper', 140)] },
  { name: 'Tomate-Spinat', extra: [ri('tomato', 180), ri('spinach', 90)] },
  { name: 'Pilz-Erbse', extra: [ri('mushroom', 160), ri('peas', 90)] },
  { name: 'Zucchini-Karotte', extra: [ri('zucchini', 180), ri('carrot', 120)] },
]

export const proteinDinnerVariants = [
  { name: 'Hähnchen', protein: ri('chicken', 170), extra: ri('broccoli', 180) },
  { name: 'Pute', protein: ri('turkey', 180), extra: ri('pepper', 170) },
  { name: 'Kabeljau', protein: ri('cod', 220), extra: ri('zucchini', 200) },
  { name: 'Garnelen', protein: ri('shrimp', 190), extra: ri('spinach', 130) },
  { name: 'Thunfisch', protein: ri('tuna', 170), extra: ri('tomato', 200) },
  { name: 'Mageres Rind', protein: ri('beef', 150), extra: ri('mushroom', 180) },
  { name: 'Lachs', protein: ri('salmon', 140), extra: ri('broccoli', 180) },
  { name: 'Tofu', protein: ri('tofu', 200), extra: ri('pepper', 180) },
  { name: 'Hähnchen-Spinat', protein: ri('chicken', 160), extra: ri('spinach', 150) },
]
