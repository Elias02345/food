import { describe, expect, it } from 'vitest'
import { recipeCategories } from './recipes'
import { expandedRecipes } from './expandedRecipes'

describe('500 recipe expansion', () => {
  it('adds exactly 500 recipes with 100 in every category', () => {
    expect(expandedRecipes).toHaveLength(500)
    for (const category of recipeCategories) {
      expect(expandedRecipes.filter((recipe) => recipe.category === category)).toHaveLength(100)
    }
  })

  it('keeps ids and titles unique', () => {
    expect(new Set(expandedRecipes.map((recipe) => recipe.id)).size).toBe(500)
    expect(new Set(expandedRecipes.map((recipe) => `${recipe.category}:${recipe.title}`)).size).toBe(500)
  })

  it('has meaningful ingredient diversity', () => {
    const signatures = new Set(expandedRecipes.map((recipe) => recipe.ingredients.map((line) => line.ingredientId).sort().join('|')))
    expect(signatures.size).toBeGreaterThan(400)
  })

  it('stays aligned with the high-protein, lower-calorie brief', () => {
    expect(expandedRecipes.filter((recipe) => recipe.nutrition.protein >= 30).length).toBeGreaterThanOrEqual(400)
    expect(expandedRecipes.filter((recipe) => recipe.nutrition.calories <= 500).length).toBeGreaterThanOrEqual(300)
    expect(Math.max(...expandedRecipes.map((recipe) => recipe.nutrition.calories))).toBeLessThanOrEqual(700)
  })

  it('contains practical and internationally inspired options', () => {
    expect(expandedRecipes.filter((recipe) => recipe.portable).length).toBeGreaterThanOrEqual(450)
    expect(expandedRecipes.filter((recipe) => recipe.prepMinutes + recipe.cookMinutes <= 15).length).toBeGreaterThanOrEqual(250)
    const tags = new Set(expandedRecipes.flatMap((recipe) => recipe.tags))
    for (const tag of ['Mediterran', 'Mexikanisch inspiriert', 'Indisch inspiriert', 'Asiatisch inspiriert', 'Nahöstlich inspiriert', 'Nordisch inspiriert']) {
      expect(tags.has(tag)).toBe(true)
    }
  })
})
