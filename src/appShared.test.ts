import { describe, expect, it } from 'vitest'
import { defaultMealDistribution, getLocalDateKey, normalizeMealDistribution, rebalanceMealDistribution, scaleMacroTarget } from './appShared'

describe('meal target helpers', () => {
  it('scales all macro targets by one shared percentage', () => {
    expect(scaleMacroTarget({ calories: 2000, protein: 160, carbs: 220, fat: 60 }, 25)).toEqual({ calories: 500, protein: 40, carbs: 55, fat: 15 })
  })

  it('normalizes custom meal percentages for the weekly planner', () => {
    const normalized = normalizeMealDistribution({ Frühstück: 20, Mittagessen: 30, 'Pre-Workout': 0, Abendessen: 50, Snack: 0 })
    expect(normalized.Frühstück).toBeCloseTo(0.2)
    expect(normalized.Mittagessen).toBeCloseTo(0.3)
    expect(normalized.Abendessen).toBeCloseTo(0.5)
  })

  it('falls back to a valid default when every share is zero', () => {
    const normalized = normalizeMealDistribution({ Frühstück: 0, Mittagessen: 0, 'Pre-Workout': 0, Abendessen: 0, Snack: 0 })
    expect(normalized.Frühstück).toBeCloseTo(defaultMealDistribution.Frühstück / 100)
  })

  it('rebalances arbitrary values to exactly 100 percent', () => {
    const balanced = rebalanceMealDistribution({ Frühstück: 10, Mittagessen: 10, 'Pre-Workout': 10, Abendessen: 10, Snack: 10 })
    expect(Object.values(balanced).reduce((sum, value) => sum + value, 0)).toBe(100)
  })

  it('creates a local calendar date key', () => {
    expect(getLocalDateKey(new Date(2026, 6, 12, 23, 59))).toBe('2026-07-12')
  })
})
