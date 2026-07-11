import { useMemo, useState } from 'react'
import { BarChart3, Check, Download, Moon, ChevronRight, ClipboardList, Clock3, Copy, Dumbbell, Flame, Heart, Info, ListFilter, Plus, Refrigerator, RotateCcw, Search, ShoppingBasket, Sparkles, Sun, Target, Trash2, Upload, Utensils, WandSparkles, X, Zap } from 'lucide-react'
import { ingredientList, ingredients } from '../data/ingredients'
import { recipeCategories, recipes, recipesById } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import { exportLocalData, importLocalData } from '../lib/storage'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from '../types'
import { days, emptyNutrition, macroFields, type Page } from '../appShared'
import { EmptyState, ProgressRing, RecipeCard, Toggle } from '../components/RecipeUI'

export function SettingsPage({ target, setTarget, theme, setTheme }: { target: MacroTarget; setTarget: (value: MacroTarget) => void; theme: 'dark' | 'light'; setTheme: (value: 'dark' | 'light') => void }) {
  const [message, setMessage] = useState('')
  return (
    <div className="settings-grid">
      <section className="settings-card"><div className="settings-card__head"><Target size={22} /><div><h2>Tägliche Ziele</h2><p>Diese Werte bilden die Grundlage für Dashboard und Wochenplan.</p></div></div><div className="macro-input-grid">{macroFields.map(({ key, label, short }) => <label key={key}><span>{label}</span><div><input type="number" min="0" value={target[key]} onChange={(e) => setTarget({ ...target, [key]: Number(e.target.value) })} /><small>{short}</small></div></label>)}</div></section>
      <section className="settings-card"><div className="settings-card__head"><Sun size={22} /><div><h2>Darstellung</h2><p>Die Auswahl wird auf diesem Gerät gespeichert.</p></div></div><div className="theme-choice"><button className={theme === 'dark' ? 'is-active' : ''} onClick={() => setTheme('dark')}><Moon /><span><b>Dunkel</b><small>Ruhig und kontrastreich</small></span></button><button className={theme === 'light' ? 'is-active' : ''} onClick={() => setTheme('light')}><Sun /><span><b>Hell</b><small>Klar und freundlich</small></span></button></div></section>
      <section className="settings-card"><div className="settings-card__head"><Download size={22} /><div><h2>Daten sichern</h2><p>Favoriten, Vorräte, Planer, Ziele und Einkaufsliste als JSON exportieren.</p></div></div><div className="button-row"><button className="button button--ghost" onClick={exportLocalData}><Download size={16} /> Exportieren</button><label className="button button--ghost"><Upload size={16} /> Importieren<input type="file" accept="application/json" hidden onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; try { await importLocalData(file); setMessage('Import erfolgreich. Lade die Seite neu.'); } catch { setMessage('Die Datei konnte nicht importiert werden.') } }} /></label></div>{message && <p className="settings-message">{message}</p>}</section>
      <section className="settings-card settings-card--wide"><div className="settings-card__head"><Info size={22} /><div><h2>Nährwert-Hinweis</h2><p>Die App berechnet Rezeptwerte aus hinterlegten Referenzwerten pro 100 g. Tatsächliche Werte hängen von Produkt, Reifegrad, Garverlust und Messgenauigkeit ab. Die App ersetzt keine medizinische oder ernährungstherapeutische Beratung.</p></div></div></section>
    </div>
  )
}
