import { useMemo, useState } from 'react'
import { BarChart3, Check, ChevronRight, ClipboardList, Clock3, Copy, Dumbbell, Flame, Heart, Info, ListFilter, Plus, Refrigerator, RotateCcw, Search, ShoppingBasket, Sparkles, Sun, Target, Trash2, Upload, Utensils, WandSparkles, X, Zap } from 'lucide-react'
import { ingredientList, ingredients } from '../data/ingredients'
import { recipeCategories, recipes, recipesById } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import { exportLocalData, importLocalData } from '../lib/storage'
import { formatAmount } from '../lib/nutrition'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from '../types'
import { days, emptyNutrition, macroFields, type Page } from '../appShared'
import { EmptyState, ProgressRing, RecipeCard, Toggle } from '../components/RecipeUI'

export function Shopping({ items, setItems }: { items: ShoppingItem[]; setItems: (value: ShoppingItem[] | ((current: ShoppingItem[]) => ShoppingItem[])) => void }) {
  const [manual, setManual] = useState('')
  const grouped = useMemo(() => {
    const map: Record<string, ShoppingItem[]> = {}
    items.forEach((item) => {
      const group = item.ingredientId ? ingredients[item.ingredientId].pantryGroup : 'Sonstiges'
      map[group] = [...(map[group] ?? []), item]
    })
    return map
  }, [items])
  const copyList = async () => {
    const text = items.filter((item) => !item.checked).map((item) => `${item.name}: ${formatAmount(item.amount)} ${item.unit}`).join('\n')
    await navigator.clipboard.writeText(text)
  }
  const addManual = () => {
    if (!manual.trim()) return
    setItems((current) => [...current, { id: `manual-${Date.now()}`, name: manual.trim(), amount: 1, unit: 'Stück', checked: false, sourceRecipeIds: [] }])
    setManual('')
  }
  return (
    <div className="shopping-layout">
      <section className="shopping-main">
        <div className="section-heading"><div><span className="eyebrow">Automatisch zusammengeführt</span><h2>Deine Einkaufsliste</h2><p>Gleiche Zutaten werden über mehrere Rezepte addiert.</p></div><div className="button-row"><button className="button button--ghost" onClick={copyList} disabled={!items.length}><Copy size={16} /> Kopieren</button><button className="button button--ghost" onClick={() => setItems((current) => current.filter((item) => !item.checked))} disabled={!items.some((item) => item.checked)}><Trash2 size={16} /> Erledigte löschen</button></div></div>
        <div className="manual-add"><input placeholder="Eigenen Eintrag hinzufügen …" value={manual} onChange={(e) => setManual(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addManual()} /><button onClick={addManual}><Plus size={18} /></button></div>
        {!items.length ? <EmptyState icon={ShoppingBasket} title="Deine Liste ist noch leer" text="Öffne ein Rezept und füge seine Zutaten mit einem Klick hinzu." /> : <div className="shopping-groups">{Object.entries(grouped).map(([group, groupItems]) => <section key={group}><h3>{group}</h3>{groupItems.map((item) => <label className={`shopping-item ${item.checked ? 'is-checked' : ''}`} key={item.id}><input type="checkbox" checked={item.checked} onChange={() => setItems((current) => current.map((x) => x.id === item.id ? { ...x, checked: !x.checked } : x))} /><i><Check size={14} /></i><span><b>{item.name}</b><small>{item.sourceRecipeIds.length ? `Aus ${item.sourceRecipeIds.length} Rezept${item.sourceRecipeIds.length > 1 ? 'en' : ''}` : 'Manueller Eintrag'}</small></span><strong>{formatAmount(item.amount)} {item.unit}</strong><button onClick={(e) => { e.preventDefault(); setItems((current) => current.filter((x) => x.id !== item.id)) }}><X size={16} /></button></label>)}</section>)}</div>}
      </section>
      <aside className="shopping-summary"><ShoppingBasket size={32} /><h3>{items.filter((item) => !item.checked).length} offene Zutaten</h3><p>{items.filter((item) => item.checked).length} bereits abgehakt</p><div className="completion-bar"><i style={{ width: `${items.length ? items.filter((item) => item.checked).length / items.length * 100 : 0}%` }} /></div><small>Die Liste bleibt lokal auf diesem Gerät gespeichert.</small></aside>
    </div>
  )
}
