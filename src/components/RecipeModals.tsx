import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Check, ChefHat, Clock3, Heart, PackageCheck, Plus, ShoppingBasket, Timer, X } from 'lucide-react'
import { ingredients } from '../data/ingredients'
import { formatAmount, scaleNutrition } from '../lib/nutrition'
import type { Recipe } from '../types'
import { CategoryVisual, MacroPill } from '../components/RecipeUI'

export function RecipeDetail({ recipe, scale, favorite, onClose, onFavorite, onShopping, onCook, onLog }: { recipe: Recipe; scale: number; favorite: boolean; onClose: () => void; onFavorite: () => void; onShopping: (portion: number) => void; onCook: (portion: number) => void; onLog: (portion: number) => void }) {
  const [portion, setPortion] = useState(scale)
  const nutrition = scaleNutrition(recipe.nutrition, portion)
  return (
    <div className="modal-backdrop" onMouseDown={onClose}><article className="recipe-modal" onMouseDown={(e) => e.stopPropagation()}>
      <button className="icon-button modal-close" onClick={onClose}><X /></button>
      <div className="recipe-modal__hero"><CategoryVisual recipe={recipe} /><div><span className="badge">{recipe.category}</span><h2>{recipe.title}</h2><p>{recipe.description}</p><div className="meta-row"><span><Clock3 size={16} /> {recipe.prepMinutes + recipe.cookMinutes} Min.</span><span><ChefHat size={16} /> {recipe.difficulty}</span><span><PackageCheck size={16} /> {recipe.mealPrepDays} Tage Meal Prep</span></div></div></div>
      <div className="portion-control"><div><b>Portionsgröße</b><span>Alle Mengen und Nährwerte werden direkt skaliert.</span></div><div><button onClick={() => setPortion(Math.max(0.5, Math.round((portion - 0.25) * 4) / 4))}>−</button><strong>{Math.round(portion * 100)} %</strong><button onClick={() => setPortion(Math.min(2.5, Math.round((portion + 0.25) * 4) / 4))}>+</button></div></div>
      <div className="detail-macros"><MacroPill label="Kalorien" value={nutrition.calories} unit="kcal" strong /><MacroPill label="Protein" value={nutrition.protein} unit="g" /><MacroPill label="Kohlenhydrate" value={nutrition.carbs} unit="g" /><MacroPill label="Fett" value={nutrition.fat} unit="g" /><MacroPill label="Ballaststoffe" value={nutrition.fiber} unit="g" /></div>
      <div className="recipe-modal__content"><section><h3>Zutaten</h3><div className="ingredient-list">{recipe.ingredients.map((line) => { const ingredient = ingredients[line.ingredientId]; return <div key={`${line.ingredientId}-${line.amount}`}><span>{ingredient.name}<small>{line.note}</small></span><b>{formatAmount(line.amount * portion)} {ingredient.unit}</b></div> })}</div></section><section><h3>Zubereitung</h3><ol className="step-list">{recipe.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section></div>
      <div className="tag-row">{recipe.tags.map((tag) => <span key={tag}>{tag}</span>)}{recipe.vegetarian && <span>Vegetarisch</span>}{recipe.vegan && <span>Vegan</span>}</div>
      <footer className="recipe-modal__footer"><button className={`button button--ghost ${favorite ? 'is-active' : ''}`} onClick={onFavorite}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /> Favorit</button><button className="button button--ghost" onClick={() => onShopping(portion)}><ShoppingBasket size={17} /> Einkaufen</button><button className="button button--ghost" onClick={() => onLog(portion)}><BarChart3 size={17} /> Als gegessen</button><button className="button button--primary" onClick={() => onCook(portion)}><ChefHat size={17} /> Kochmodus starten</button></footer>
    </article></div>
  )
}

export function GuidedCooking({ recipe, scale, onClose }: { recipe: Recipe; scale: number; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [checked, setChecked] = useState<string[]>([])

  useEffect(() => {
    let interval = 0
    if (running && seconds > 0) interval = window.setInterval(() => setSeconds((current) => current - 1), 1000)
    if (seconds === 0) setRunning(false)
    return () => window.clearInterval(interval)
  }, [running, seconds])

  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null
    const request = async () => {
      try { lock = await (navigator as Navigator & { wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> } }).wakeLock?.request('screen') ?? null } catch { /* not supported */ }
    }
    request()
    return () => { lock?.release().catch(() => undefined) }
  }, [])

  const formatTime = (value: number) => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
  return (
    <div className="cooking-mode">
      <header><button className="button button--ghost" onClick={onClose}><ArrowLeft size={17} /> Rezept verlassen</button><div><ChefHat size={22} /><span><b>{recipe.title}</b><small>Schritt {step + 1} von {recipe.steps.length}</small></span></div><div className="cooking-progress"><i style={{ width: `${(step + 1) / recipe.steps.length * 100}%` }} /></div></header>
      <main>
        <aside><h3>Zutaten abhaken</h3>{recipe.ingredients.map((line) => { const ingredient = ingredients[line.ingredientId]; const id = `${line.ingredientId}-${line.amount}`; return <label className={checked.includes(id) ? 'is-checked' : ''} key={id}><input type="checkbox" checked={checked.includes(id)} onChange={() => setChecked((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])} /><i><Check size={13} /></i><span>{ingredient.name}</span><b>{formatAmount(line.amount * scale)} {ingredient.unit}</b></label> })}</aside>
        <section className="cooking-step"><span className="cooking-step__number">{step + 1}</span><p>{recipe.steps[step]}</p><div className="timer-box"><div><Timer size={23} /><span><b>{formatTime(seconds)}</b><small>{running ? 'Timer läuft' : seconds ? 'Pausiert' : 'Timer auswählen'}</small></span></div><div className="timer-presets">{[3, 5, 10, 15].map((minutes) => <button key={minutes} onClick={() => { setSeconds(minutes * 60); setRunning(true) }}>{minutes} Min.</button>)}</div>{seconds > 0 && <button className="button button--ghost" onClick={() => setRunning(!running)}>{running ? 'Pausieren' : 'Fortsetzen'}</button>}</div><div className="cooking-nav"><button className="button button--ghost" disabled={step === 0} onClick={() => setStep((current) => current - 1)}><ArrowLeft size={17} /> Zurück</button>{step < recipe.steps.length - 1 ? <button className="button button--primary" onClick={() => setStep((current) => current + 1)}>Nächster Schritt <ArrowRight size={17} /></button> : <button className="button button--primary" onClick={onClose}><Check size={17} /> Fertig gekocht</button>}</div></section>
      </main>
    </div>
  )
}
