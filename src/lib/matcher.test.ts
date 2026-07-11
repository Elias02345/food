import { describe, expect, it } from 'vitest'
import { recipes } from '../data/recipes'
import { findRecipeMatches, findRecipePairs } from './matcher'

 describe('macro matcher', () => {
  const target = { calories: 550, protein: 50, carbs: 55, fat: 14 }

  it('returns sorted scaled recipe matches', () => {
    const matches = findRecipeMatches(recipes, target, { priority: 'balanced' }, 10)
    expect(matches).toHaveLength(10)
    expect(matches[0].score).toBeLessThanOrEqual(matches[9].score)
    expect(matches[0].scale).toBeGreaterThanOrEqual(0.5)
    expect(matches[0].scale).toBeLessThanOrEqual(2.5)
  })

  it('respects category and dietary filters', () => {
    const matches = findRecipeMatches(recipes, target, { category: 'Frühstück', vegetarian: true }, 20)
    expect(matches.every((match) => match.recipe.category === 'Frühstück' && match.recipe.vegetarian)).toBe(true)
  })

  it('can combine two recipes', () => {
    const pairs = findRecipePairs(recipes, target, { category: 'Snack' }, 4)
    expect(pairs).toHaveLength(4)
    expect(pairs[0].combined.calories).toBeGreaterThan(0)
  })
})
