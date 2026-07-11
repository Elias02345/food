import { useMemo, useState } from 'react'
import { BarChart3, Check, ChevronRight, ClipboardList, Clock3, Copy, Dumbbell, Flame, Heart, Info, ListFilter, Plus, Refrigerator, RotateCcw, Search, ShoppingBasket, Sparkles, Sun, Target, Trash2, Upload, Utensils, WandSparkles, X, Zap } from 'lucide-react'
import { ingredientList, ingredients } from '../data/ingredients'
import { recipeCategories, recipes, recipesById } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import { exportLocalData, importLocalData } from '../lib/storage'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from '../types'
import { days, emptyNutrition, macroFields, type Page } from '../appShared'
import { EmptyState, ProgressRing, RecipeCard, Toggle } from '../components/RecipeUI'

export function Pantry({ selected, setSelected }: { selected: string[]; setSelected: (value: string[] | ((current: string[]) => string[])) => void }) {
  const [search, setSearch] = useState('')
  const groups = useMemo(() => [...new Set(ingredientList.map((item) => item.pantryGroup))], [])
  const filtered = ingredientList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="page-stack">
      <section className="pantry-hero"><div><span className="badge"><Refrigerator size={15} /> Vorratsmodus</span><h2>Erst verbrauchen, dann einkaufen.</h2><p>Markiere Lebensmittel, die du normalerweise zu Hause hast. Der Recipe Finder kann danach sortieren oder ausschließlich daraus suchen.</p></div><div className="pantry-stat"><b>{selected.length}</b><span>verfügbare Zutaten</span></div></section>
      <label className="search-field"><Search size={19} /><input placeholder="Zutat suchen …" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
      <div className="pantry-groups">{groups.map((group) => { const items = filtered.filter((item) => item.pantryGroup === group); if (!items.length) return null; return <section key={group}><div className="section-heading"><h3>{group}</h3><button className="text-button" onClick={() => { const ids = items.map((item) => item.id); setSelected((current) => ids.every((id) => current.includes(id)) ? current.filter((id) => !ids.includes(id)) : [...new Set([...current, ...ids])]) }}>Alle umschalten</button></div><div className="ingredient-grid">{items.map((item) => <button className={selected.includes(item.id) ? 'is-active' : ''} key={item.id} onClick={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}><span>{item.name.slice(0, 1)}</span><div><b>{item.name}</b><small>{Math.round(item.nutritionPer100g.protein)} g Protein / 100 g</small></div>{selected.includes(item.id) && <Check size={17} />}</button>)}</div></section> })}</div>
    </div>
  )
}
