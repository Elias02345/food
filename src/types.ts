export type RecipeCategory = 'Frühstück' | 'Mittagessen' | 'Pre-Workout' | 'Abendessen' | 'Snack'

export type Nutrition = {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export type Ingredient = {
  id: string
  name: string
  unit: 'g' | 'ml' | 'Stück'
  nutritionPer100g: Nutrition
  allergens?: string[]
  vegetarian: boolean
  vegan: boolean
  pantryGroup: 'Obst' | 'Gemüse' | 'Protein' | 'Milchprodukt' | 'Getreide' | 'Hülsenfrucht' | 'Fett & Saaten' | 'Gewürz'
}

export type RecipeIngredient = {
  ingredientId: string
  amount: number
  note?: string
}

export type Recipe = {
  id: string
  title: string
  description: string
  category: RecipeCategory
  prepMinutes: number
  cookMinutes: number
  difficulty: 'Sehr einfach' | 'Einfach'
  servings: number
  ingredients: RecipeIngredient[]
  steps: string[]
  nutrition: Nutrition
  tags: string[]
  equipment: string[]
  mealPrepDays: number
  portable: boolean
  vegetarian: boolean
  vegan: boolean
  allergens: string[]
  accent: string
}

export type MacroTarget = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type RecipeMatch = {
  recipe: Recipe
  scale: number
  nutrition: Nutrition
  score: number
  fitLabel: 'Nahezu perfekt' | 'Sehr passend' | 'Gut passend' | 'Alternative'
  differences: MacroTarget
  pantryCoverage: number
}

export type ShoppingItem = {
  id: string
  ingredientId?: string
  name: string
  amount: number
  unit: string
  checked: boolean
  sourceRecipeIds: string[]
}

export type PlannerEntry = {
  day: string
  slot: RecipeCategory
  recipeId: string
  scale: number
}
