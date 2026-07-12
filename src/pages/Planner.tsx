import { ShoppingBasket, Sparkles, Trash2, WandSparkles } from 'lucide-react'
import { recipes, recipesById } from '../data/recipes'
import { findRecipeMatches } from '../lib/matcher'
import type { MacroTarget, MealDistribution, PlannerEntry, Recipe, RecipeCategory } from '../types'
import { categoryIcons, days, emptyNutrition, mealSlots, normalizeMealDistribution } from '../appShared'
import { CategoryVisual } from '../components/RecipeUI'

export function Planner({ entries, setEntries, target, distribution, onOpen, addRecipeToShopping }: {
  entries: PlannerEntry[]
  setEntries: (value: PlannerEntry[] | ((current: PlannerEntry[]) => PlannerEntry[])) => void
  target: MacroTarget
  distribution: MealDistribution
  onOpen: (recipe: Recipe, scale?: number) => void
  addRecipeToShopping: (recipe: Recipe, scale?: number) => void
}) {
  const autoPlan = () => {
    const allocation = normalizeMealDistribution(distribution)
    const next: PlannerEntry[] = []
    days.forEach((day, dayIndex) => {
      mealSlots.forEach((slot, slotIndex) => {
        const fraction = allocation[slot]
        if (fraction <= 0) return
        const slotTarget = { calories: target.calories * fraction, protein: target.protein * fraction, carbs: target.carbs * fraction, fat: target.fat * fraction }
        const candidates = findRecipeMatches(recipes, slotTarget, { category: slot }, 8)
        const match = candidates[(dayIndex + slotIndex * 2) % Math.max(candidates.length, 1)]
        if (match) next.push({ day, slot, recipeId: match.recipe.id, scale: match.scale })
      })
    })
    setEntries(next)
  }

  const dayNutrition = (day: string) => entries.filter((entry) => entry.day === day).reduce((sum, entry) => {
    const recipe = recipesById[entry.recipeId]
    return recipe ? {
      calories: sum.calories + recipe.nutrition.calories * entry.scale,
      protein: sum.protein + recipe.nutrition.protein * entry.scale,
      carbs: sum.carbs + recipe.nutrition.carbs * entry.scale,
      fat: sum.fat + recipe.nutrition.fat * entry.scale,
      fiber: sum.fiber + recipe.nutrition.fiber * entry.scale,
    } : sum
  }, { ...emptyNutrition })

  const addWeekToShopping = () => entries.forEach((entry) => { const recipe = recipesById[entry.recipeId]; if (recipe) addRecipeToShopping(recipe, entry.scale) })

  return (
    <div className="page-stack">
      <section className="planner-hero"><div><span className="badge"><WandSparkles size={15} /> Automatische Planung</span><h2>Eine Woche nach deiner Mahlzeitenverteilung.</h2><p>Die gespeicherten Prozentwerte werden auf exakt 100 Prozent normalisiert und auf alle sieben Tage angewendet.</p><div className="allocation-preview">{mealSlots.map((slot) => <span key={slot}>{slot}: <b>{distribution[slot]} %</b></span>)}</div></div><div className="button-row"><button className="button button--ghost" onClick={() => setEntries([])}><Trash2 size={16} /> Leeren</button><button className="button button--ghost" onClick={addWeekToShopping} disabled={!entries.length}><ShoppingBasket size={16} /> Woche einkaufen</button><button className="button button--primary" onClick={autoPlan}><Sparkles size={16} /> Woche generieren</button></div></section>
      <div className="week-grid">{days.map((day) => { const nutrition = dayNutrition(day); return <section className="day-column" key={day}><div className="day-column__head"><div><span>{day.slice(0, 2)}</span><b>{day}</b></div><small>{Math.round(nutrition.calories)} kcal · {Math.round(nutrition.protein)} g P</small></div><div className="day-column__slots">{mealSlots.map((slot: RecipeCategory) => { const entry = entries.find((item) => item.day === day && item.slot === slot); const recipe = entry ? recipesById[entry.recipeId] : null; const Icon = categoryIcons[slot]; return <div className={`plan-slot ${recipe ? 'is-filled' : ''}`} key={slot}>{recipe ? <button onClick={() => onOpen(recipe, entry?.scale)}><CategoryVisual recipe={recipe} compact /><span><small>{slot}</small><b>{recipe.title}</b><em>{Math.round((entry?.scale ?? 1) * 100)} % Portion</em></span></button> : <div><Icon size={18} /><span>{slot}</span></div>}</div> })}</div></section> })}</div>
    </div>
  )
}
