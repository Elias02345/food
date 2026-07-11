import { describe, expect, it } from 'vitest'
import { ingredients } from './ingredients'
import { recipeCategories, recipes } from './recipes'

describe('recipe database', () => {
  it('contains exactly 725 recipes', () => {
    expect(recipes).toHaveLength(725)
  })

  it('contains 145 recipes in every requested category', () => {
    for (const category of recipeCategories) {
      expect(recipes.filter((recipe) => recipe.category === category)).toHaveLength(145)
    }
  })

  it('uses valid ingredients and plausible positive nutrition values', () => {
    for (const recipe of recipes) {
      expect(recipe.ingredients.length).toBeGreaterThanOrEqual(3)
      expect(recipe.steps.length).toBeGreaterThanOrEqual(3)
      expect(recipe.nutrition.calories).toBeGreaterThan(80)
      expect(recipe.nutrition.protein).toBeGreaterThan(10)
      expect(recipe.nutrition.fat).toBeGreaterThanOrEqual(0)
      for (const line of recipe.ingredients) {
        expect(ingredients[line.ingredientId]).toBeDefined()
        expect(line.amount).toBeGreaterThan(0)
      }
    }
  })

  it('has unique ids and titles within a category', () => {
    expect(new Set(recipes.map((recipe) => recipe.id)).size).toBe(recipes.length)
    for (const category of recipeCategories) {
      const titles = recipes.filter((recipe) => recipe.category === category).map((recipe) => recipe.title)
      expect(new Set(titles).size).toBe(titles.length)
    }
  })
})
