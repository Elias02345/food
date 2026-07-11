import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Check, ChevronRight, ClipboardList, Clock3, Copy, Dumbbell, Flame, Heart, Info, ListFilter, Plus, Refrigerator, RotateCcw, Search, ShoppingBasket, Sparkles, Sun, Target, Trash2, Upload, Utensils, WandSparkles, X, Zap } from 'lucide-react'
import { ingredientList, ingredients } from '../data/ingredients'
import { recipeCategories, recipes, recipesById } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import { exportLocalData, importLocalData } from '../lib/storage'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from '../types'
import { days, emptyNutrition, macroFields, type Page } from '../appShared'
import { CategoryVisual, EmptyState, MacroPill, ProgressRing, RecipeCard, Toggle } from '../components/RecipeUI'

export function Finder({ initialTarget, favorites, pantry, onOpen, onFavorite }: {
  initialTarget: MacroTarget; favorites: string[]; pantry: string[]; onOpen: (recipe: Recipe, scale?: number) => void; onFavorite: (id: string) => void
}) {
  const [target, setTarget] = useState<MacroTarget>(initialTarget)
  const [category, setCategory] = useState('Alle')
  const [priority, setPriority] = useState<MatchOptions['priority']>('balanced')
  const [maxMinutes, setMaxMinutes] = useState(35)
  const [vegetarian, setVegetarian] = useState(false)
  const [portable, setPortable] = useState(false)
  const [pantryOnly, setPantryOnly] = useState(false)
  const [showPairs, setShowPairs] = useState(false)

  useEffect(() => setTarget(initialTarget), [initialTarget])

  const options = useMemo<MatchOptions>(() => ({ category, priority, maxMinutes, vegetarian, portable, pantryOnly, pantryIngredientIds: pantry }), [category, priority, maxMinutes, vegetarian, portable, pantryOnly, pantry])
  const matches = useMemo(() => findRecipeMatches(recipes, target, options, 24), [target, options])
  const pairs = useMemo(() => showPairs ? findRecipePairs(recipes, target, options, 8) : [], [showPairs, target, options])

  return (
    <div className="finder-layout">
      <aside className="filter-panel">
        <div className="filter-panel__title"><Target size={22} /><div><h2>Was ist noch offen?</h2><p>Die App sucht die passendste skalierte Portion.</p></div></div>
        <div className="macro-input-grid">
          {macroFields.map(({ key, label, short, icon: Icon }) => <label key={key}><span><Icon size={15} /> {label}</span><div><input type="number" min="0" value={target[key]} onChange={(e) => setTarget({ ...target, [key]: Number(e.target.value) })} /><small>{short}</small></div></label>)}
        </div>
        <button className="button button--ghost button--full" onClick={() => setTarget(initialTarget)}><RotateCcw size={16} /> Tagesrest übernehmen</button>
        <hr />
        <label className="field"><span>Kategorie</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Alle</option>{recipeCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field"><span>Priorität</span><select value={priority} onChange={(e) => setPriority(e.target.value as MatchOptions['priority'])}><option value="balanced">Ausgewogen</option><option value="protein">Protein möglichst genau</option><option value="calories">Kalorien möglichst genau</option><option value="carbs">Kohlenhydrate möglichst genau</option></select></label>
        <label className="range-field"><span>Maximale Zeit <b>{maxMinutes} Min.</b></span><input type="range" min="5" max="50" step="5" value={maxMinutes} onChange={(e) => setMaxMinutes(Number(e.target.value))} /></label>
        <div className="toggle-list">
          <Toggle checked={vegetarian} onChange={setVegetarian} label="Nur vegetarisch" />
          <Toggle checked={portable} onChange={setPortable} label="Für unterwegs" />
          <Toggle checked={pantryOnly} onChange={setPantryOnly} label="Nur aus Vorräten" disabled={pantry.length === 0} />
        </div>
        <div className="info-box"><Info size={17} /><p>Nährwerte sind berechnete Näherungswerte. Marke, Garzustand und tatsächliches Gewicht können abweichen.</p></div>
      </aside>

      <section className="finder-results">
        <div className="section-heading section-heading--align-end"><div><span className="eyebrow">{matches.length} Vorschläge</span><h2>Deine besten Treffer</h2><p>Sortiert nach der kleinsten gemeinsamen Abweichung aller vier Zielwerte.</p></div><div className="segmented"><button className={!showPairs ? 'is-active' : ''} onClick={() => setShowPairs(false)}>Ein Rezept</button><button className={showPairs ? 'is-active' : ''} onClick={() => setShowPairs(true)}>Zwei kombinieren</button></div></div>
        {!showPairs ? (
          <div className="recipe-grid recipe-grid--three">{matches.map((match) => <RecipeCard key={match.recipe.id} recipe={match.recipe} match={match} favorite={favorites.includes(match.recipe.id)} onFavorite={() => onFavorite(match.recipe.id)} onOpen={() => onOpen(match.recipe, match.scale)} />)}</div>
        ) : (
          <div className="pair-list">{pairs.map((pair, index) => <div className="pair-card" key={`${pair.first.recipe.id}-${pair.second.recipe.id}`}><div className="pair-card__rank">#{index + 1}</div><div className="pair-card__recipes"><button onClick={() => onOpen(pair.first.recipe, pair.first.scale)}><CategoryVisual recipe={pair.first.recipe} compact /><span><b>{pair.first.recipe.title}</b><small>{Math.round(pair.first.scale * 100)} % Portion</small></span></button><Plus size={20} /><button onClick={() => onOpen(pair.second.recipe, pair.second.scale)}><CategoryVisual recipe={pair.second.recipe} compact /><span><b>{pair.second.recipe.title}</b><small>{Math.round(pair.second.scale * 100)} % Portion</small></span></button></div><div className="pair-card__macros"><MacroPill label="kcal" value={pair.combined.calories} unit="" strong /><MacroPill label="Protein" value={pair.combined.protein} unit="g" /><MacroPill label="KH" value={pair.combined.carbs} unit="g" /><MacroPill label="Fett" value={pair.combined.fat} unit="g" /></div></div>)}</div>
        )}
      </section>
    </div>
  )
}
