import { useEffect, useMemo, useState } from 'react'
import { Info, Plus, RotateCcw, Target } from 'lucide-react'
import { recipeCategories, recipes } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import type { MacroTarget, MealDistribution, Recipe, RecipeCategory } from '../types'
import { categoryIcons, macroFields, mealSlots, scaleMacroTarget } from '../appShared'
import { CategoryVisual, MacroPill, RecipeCard, Toggle } from '../components/RecipeUI'
import { SmartNumberInput } from '../components/SmartNumberInput'

type MealChoice = RecipeCategory | 'Frei'

export function Finder({ initialTarget, distribution, favorites, pantry, onOpen, onFavorite }: {
  initialTarget: MacroTarget
  distribution: MealDistribution
  favorites: string[]
  pantry: string[]
  onOpen: (recipe: Recipe, scale?: number) => void
  onFavorite: (id: string) => void
}) {
  const initialMeal: RecipeCategory = 'Mittagessen'
  const initialShare = distribution[initialMeal] ?? 30
  const [meal, setMeal] = useState<MealChoice>(initialMeal)
  const [sharePercent, setSharePercent] = useState(initialShare)
  const [target, setTarget] = useState<MacroTarget>(() => scaleMacroTarget(initialTarget, initialShare))
  const [customTarget, setCustomTarget] = useState(false)
  const [category, setCategory] = useState<string>(initialMeal)
  const [priority, setPriority] = useState<MatchOptions['priority']>('balanced')
  const [maxMinutes, setMaxMinutes] = useState(35)
  const [vegetarian, setVegetarian] = useState(false)
  const [portable, setPortable] = useState(false)
  const [pantryOnly, setPantryOnly] = useState(false)
  const [showPairs, setShowPairs] = useState(false)

  useEffect(() => {
    if (!customTarget) setTarget(scaleMacroTarget(initialTarget, sharePercent))
  }, [initialTarget, sharePercent, customTarget])

  const applyShare = (percent: number) => {
    const safePercent = Math.min(100, Math.max(0, percent))
    setSharePercent(safePercent)
    setCustomTarget(false)
    setTarget(scaleMacroTarget(initialTarget, safePercent))
  }

  const selectMeal = (slot: RecipeCategory) => {
    setMeal(slot)
    setCategory(slot)
    applyShare(distribution[slot] ?? 0)
  }

  const options = useMemo<MatchOptions>(() => ({ category, priority, maxMinutes, vegetarian, portable, pantryOnly, pantryIngredientIds: pantry }), [category, priority, maxMinutes, vegetarian, portable, pantryOnly, pantry])
  const hasTarget = Object.values(target).some((value) => value > 0)
  const matches = useMemo(() => hasTarget ? findRecipeMatches(recipes, target, options, 24) : [], [hasTarget, target, options])
  const pairs = useMemo(() => showPairs && hasTarget ? findRecipePairs(recipes, target, options, 8) : [], [showPairs, hasTarget, target, options])

  return (
    <div className="finder-layout">
      <aside className="filter-panel">
        <div className="filter-panel__title"><Target size={22} /><div><h2>Wie groß soll diese Mahlzeit sein?</h2><p>Wähle eine Mahlzeit oder skaliere einen freien Anteil deines offenen Tagesziels.</p></div></div>

        <div className="meal-target-panel">
          <div className="meal-preset-row">
            {mealSlots.map((slot) => {
              const Icon = categoryIcons[slot]
              return <button key={slot} className={meal === slot ? 'is-active' : ''} onClick={() => selectMeal(slot)}><Icon size={16} /><span>{slot}<small>{distribution[slot] ?? 0} %</small></span></button>
            })}
            <button className={meal === 'Frei' ? 'is-active' : ''} onClick={() => { setMeal('Frei'); setCategory('Alle') }}><Target size={16} /><span>Frei<small>eigener Anteil</small></span></button>
          </div>

          <label className="share-slider">
            <span><b>{customTarget ? 'Manuell angepasst' : `${sharePercent} % vom offenen Tagesrest`}</b><strong>{sharePercent} %</strong></span>
            <input type="range" min="0" max="100" step="5" value={sharePercent} onChange={(event) => applyShare(Number(event.target.value))} />
            <small>{Math.round(initialTarget.calories * sharePercent / 100)} kcal · {Math.round(initialTarget.protein * sharePercent / 100)} g Protein als Ausgangswert</small>
          </label>
        </div>

        <div className="macro-input-grid">
          {macroFields.map(({ key, label, short, icon: Icon }) => <label key={key}><span><Icon size={15} /> {label}</span><div><SmartNumberInput value={target[key]} ariaLabel={`${label} für diese Mahlzeit`} min={0} step={key === 'calories' ? 1 : 0.1} onChange={(value) => { setTarget((current) => ({ ...current, [key]: value })); setCustomTarget(true) }} /><small>{short}</small></div></label>)}
        </div>
        <div className="finder-target-actions">
          <button className="button button--ghost" onClick={() => applyShare(sharePercent)}><RotateCcw size={16} /> Anteil neu berechnen</button>
          <button className="button button--ghost" onClick={() => applyShare(100)}>100 % Rest</button>
        </div>

        <hr />
        <label className="field"><span>Rezeptkategorie</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Alle</option>{recipeCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field"><span>Priorität</span><select value={priority} onChange={(event) => setPriority(event.target.value as MatchOptions['priority'])}><option value="balanced">Ausgewogen</option><option value="protein">Protein möglichst genau</option><option value="calories">Kalorien möglichst genau</option><option value="carbs">Kohlenhydrate möglichst genau</option></select></label>
        <label className="range-field"><span>Maximale Zeit <b>{maxMinutes} Min.</b></span><input type="range" min="5" max="50" step="5" value={maxMinutes} onChange={(event) => setMaxMinutes(Number(event.target.value))} /></label>
        <div className="toggle-list">
          <Toggle checked={vegetarian} onChange={setVegetarian} label="Nur vegetarisch" />
          <Toggle checked={portable} onChange={setPortable} label="Für unterwegs" />
          <Toggle checked={pantryOnly} onChange={setPantryOnly} label="Nur aus Vorräten" disabled={pantry.length === 0} />
        </div>
        <div className="info-box"><Info size={17} /><p>Du kannst den gemeinsamen Anteil per Slider wählen und danach Kalorien oder einzelne Makros unabhängig korrigieren.</p></div>
      </aside>

      <section className="finder-results">
        <div className="section-heading section-heading--align-end"><div><span className="eyebrow">{matches.length} Vorschläge</span><h2>{meal === 'Frei' ? 'Passend zu deinem Mahlzeitenziel' : `Passend für ${meal}`}</h2><p>Sortiert nach der kleinsten gemeinsamen Abweichung vom gewählten Teilziel.</p></div><div className="segmented"><button className={!showPairs ? 'is-active' : ''} onClick={() => setShowPairs(false)}>Ein Rezept</button><button className={showPairs ? 'is-active' : ''} onClick={() => setShowPairs(true)}>Zwei kombinieren</button></div></div>
        {!hasTarget ? <div className="finder-empty-target"><Target size={34} /><h3>Lege zuerst ein Mahlzeitenziel fest</h3><p>Mindestens einer der vier Zielwerte muss größer als null sein.</p></div> : !showPairs ? (
          <div className="recipe-grid recipe-grid--three">{matches.map((match) => <RecipeCard key={match.recipe.id} recipe={match.recipe} match={match} favorite={favorites.includes(match.recipe.id)} onFavorite={() => onFavorite(match.recipe.id)} onOpen={() => onOpen(match.recipe, match.scale)} />)}</div>
        ) : (
          <div className="pair-list">{pairs.map((pair, index) => <div className="pair-card" key={`${pair.first.recipe.id}-${pair.second.recipe.id}`}><div className="pair-card__rank">#{index + 1}</div><div className="pair-card__recipes"><button onClick={() => onOpen(pair.first.recipe, pair.first.scale)}><CategoryVisual recipe={pair.first.recipe} compact /><span><b>{pair.first.recipe.title}</b><small>{Math.round(pair.first.scale * 100)} % Portion</small></span></button><Plus size={20} /><button onClick={() => onOpen(pair.second.recipe, pair.second.scale)}><CategoryVisual recipe={pair.second.recipe} compact /><span><b>{pair.second.recipe.title}</b><small>{Math.round(pair.second.scale * 100)} % Portion</small></span></button></div><div className="pair-card__macros"><MacroPill label="kcal" value={pair.combined.calories} unit="" strong /><MacroPill label="Protein" value={pair.combined.protein} unit="g" /><MacroPill label="KH" value={pair.combined.carbs} unit="g" /><MacroPill label="Fett" value={pair.combined.fat} unit="g" /></div></div>)}</div>
        )}
      </section>
    </div>
  )
}
