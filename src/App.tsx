import { useEffect, useMemo, useState } from 'react'
import { Check, ChefHat, Download, Moon, PackageCheck, Settings, ShoppingBasket, Sun } from 'lucide-react'
import { ingredients } from './data/ingredients'
import { recipes } from './data/recipes'
import { usePersistentState } from './lib/storage'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from './types'
import { addNutrition, clampRemaining, navItems, type InstallPromptEvent, type Page } from './appShared'
import { Dashboard } from './pages/Dashboard'
import { Finder } from './pages/Finder'
import { Browse } from './pages/Browse'
import { Planner } from './pages/Planner'
import { Shopping } from './pages/Shopping'
import { Pantry } from './pages/Pantry'
import { SettingsPage } from './pages/SettingsPage'
import { GuidedCooking, RecipeDetail } from './components/RecipeModals'

function App() {
  const knownPages: Page[] = [...navItems.map((item) => item.id), 'settings']
  const initialPage = knownPages.includes(window.location.hash.slice(1) as Page) ? window.location.hash.slice(1) as Page : 'home'
  const [page, setPage] = useState<Page>(initialPage)
  const [dailyTarget, setDailyTarget] = usePersistentState<MacroTarget>('macroKitchen.dailyTarget', { calories: 1972, protein: 159, carbs: 188, fat: 59 })
  const [consumed, setConsumed] = usePersistentState<MacroTarget>('macroKitchen.consumed', { calories: 0, protein: 0, carbs: 0, fat: 0 })
  const [favorites, setFavorites] = usePersistentState<string[]>('macroKitchen.favorites', [])
  const [shopping, setShopping] = usePersistentState<ShoppingItem[]>('macroKitchen.shopping', [])
  const [pantry, setPantry] = usePersistentState<string[]>('macroKitchen.pantry', [])
  const [planner, setPlanner] = usePersistentState<PlannerEntry[]>('macroKitchen.planner', [])
  const [theme, setTheme] = usePersistentState<'dark' | 'light'>('macroKitchen.theme', 'dark')
  const [selected, setSelected] = useState<{ recipe: Recipe; scale: number } | null>(null)
  const [cooking, setCooking] = useState<{ recipe: Recipe; scale: number } | null>(null)
  const [toast, setToast] = useState<string>('')
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)

  const remaining = useMemo(() => clampRemaining(dailyTarget, consumed), [dailyTarget, consumed])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    window.history.replaceState(null, '', `#${page}`)
  }, [page])

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  const addRecipeToShopping = (recipe: Recipe, scale = 1) => {
    setShopping((current) => {
      const next = [...current]
      recipe.ingredients.forEach((line) => {
        const ingredient = ingredients[line.ingredientId]
        const amount = Math.round(line.amount * scale * 10) / 10
        const existingIndex = next.findIndex((item) => item.ingredientId === line.ingredientId && !item.checked)
        if (existingIndex >= 0) {
          next[existingIndex] = {
            ...next[existingIndex],
            amount: Math.round((next[existingIndex].amount + amount) * 10) / 10,
            sourceRecipeIds: [...new Set([...next[existingIndex].sourceRecipeIds, recipe.id])],
          }
        } else {
          next.push({
            id: `${line.ingredientId}-${Date.now()}-${Math.random()}`,
            ingredientId: line.ingredientId,
            name: ingredient.name,
            amount,
            unit: ingredient.unit,
            checked: false,
            sourceRecipeIds: [recipe.id],
          })
        }
      })
      return next
    })
    setToast(`${recipe.title} wurde zur Einkaufsliste hinzugefügt.`)
  }

  const logRecipe = (recipe: Recipe, scale = 1) => {
    setConsumed((current) => addNutrition(current, recipe.nutrition, scale))
    setToast('Mahlzeit wurde zu den heutigen Makros addiert.')
  }

  const openRecipe = (recipe: Recipe, scale = 1) => setSelected({ recipe, scale })

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage('home')}>
          <span className="brand__mark"><ChefHat size={24} /></span>
          <span><b>MacroKitchen</b><small>Whole food. Exact fit.</small></span>
        </button>
        <nav className="main-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return <button key={item.id} className={page === item.id ? 'is-active' : ''} onClick={() => setPage(item.id)}><Icon size={19} /><span>{item.label}</span></button>
          })}
        </nav>
        <div className="sidebar__footer">
          <div className="database-chip"><PackageCheck size={18} /><span><b>{recipes.length} Rezepte</b><small>lokal verfügbar</small></span></div>
          <button className={page === 'settings' ? 'is-active' : ''} onClick={() => setPage('settings')}><Settings size={19} /> Einstellungen</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="topbar__kicker">Dein Ernährungssystem</p>
            <h1>{navItems.find((item) => item.id === page)?.label ?? 'Einstellungen'}</h1>
          </div>
          <div className="topbar__actions">
            {installPrompt && <button className="button button--ghost" onClick={async () => { await installPrompt.prompt(); setInstallPrompt(null) }}><Download size={17} /> App installieren</button>}
            <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Darstellung wechseln">{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
            <button className="avatar">EK</button>
          </div>
        </header>

        {page === 'home' && <Dashboard remaining={remaining} target={dailyTarget} consumed={consumed} favorites={favorites} pantry={pantry} onOpen={openRecipe} onFavorite={toggleFavorite} onNavigate={setPage} onReset={() => setConsumed({ calories: 0, protein: 0, carbs: 0, fat: 0 })} />}
        {page === 'finder' && <Finder initialTarget={remaining} favorites={favorites} pantry={pantry} onOpen={openRecipe} onFavorite={toggleFavorite} />}
        {page === 'browse' && <Browse favorites={favorites} onOpen={openRecipe} onFavorite={toggleFavorite} />}
        {page === 'planner' && <Planner entries={planner} setEntries={setPlanner} target={dailyTarget} onOpen={openRecipe} addRecipeToShopping={addRecipeToShopping} />}
        {page === 'shopping' && <Shopping items={shopping} setItems={setShopping} />}
        {page === 'pantry' && <Pantry selected={pantry} setSelected={setPantry} />}
        {page === 'settings' && <SettingsPage target={dailyTarget} setTarget={setDailyTarget} theme={theme} setTheme={setTheme} />}
      </main>

      <nav className="bottom-nav">
        {navItems.slice(0, 5).map((item) => { const Icon = item.icon; return <button key={item.id} className={page === item.id ? 'is-active' : ''} onClick={() => setPage(item.id)}><Icon size={20} /><span>{item.label.replace('Recipe ', '')}</span></button> })}
      </nav>

      {selected && <RecipeDetail recipe={selected.recipe} scale={selected.scale} favorite={favorites.includes(selected.recipe.id)} onClose={() => setSelected(null)} onFavorite={() => toggleFavorite(selected.recipe.id)} onShopping={(portion) => addRecipeToShopping(selected.recipe, portion)} onCook={(portion) => { setCooking({ recipe: selected.recipe, scale: portion }); setSelected(null) }} onLog={(portion) => logRecipe(selected.recipe, portion)} />}
      {cooking && <GuidedCooking recipe={cooking.recipe} scale={cooking.scale} onClose={() => setCooking(null)} />}
      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
    </div>
  )
}


export default App
