import { useEffect, useMemo, useState } from 'react'
import { BookOpen, ListFilter, RotateCcw, Search } from 'lucide-react'
import { recipeCategories, recipes } from '../data/recipes'
import type { Recipe } from '../types'
import { categoryIcons } from '../appShared'
import { RecipeCard, Toggle } from '../components/RecipeUI'

const cuisineOptions = ['Alle Küchen', 'Mediterran', 'Mexikanisch', 'Indisch', 'Asiatisch', 'Nahöstlich', 'Nordisch', 'Griechisch', 'Italienisch', 'Marokkanisch']

export function Browse({ favorites, onOpen, onFavorite }: { favorites: string[]; onOpen: (recipe: Recipe, scale?: number) => void; onFavorite: (id: string) => void }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Alle')
  const [cuisine, setCuisine] = useState('Alle Küchen')
  const [maxCalories, setMaxCalories] = useState(800)
  const [minProtein, setMinProtein] = useState(0)
  const [quickOnly, setQuickOnly] = useState(false)
  const [favoriteOnly, setFavoriteOnly] = useState(false)
  const [sort, setSort] = useState('protein')
  const [visibleCount, setVisibleCount] = useState(36)

  useEffect(() => setVisibleCount(36), [search, category, cuisine, maxCalories, minProtein, quickOnly, favoriteOnly, sort])

  const filtered = useMemo(() => recipes
    .filter((recipe) => category === 'Alle' || recipe.category === category)
    .filter((recipe) => cuisine === 'Alle Küchen' || recipe.tags.some((tag) => tag.toLowerCase().includes(cuisine.toLowerCase())))
    .filter((recipe) => recipe.nutrition.calories <= maxCalories && recipe.nutrition.protein >= minProtein)
    .filter((recipe) => !quickOnly || recipe.prepMinutes + recipe.cookMinutes <= 15)
    .filter((recipe) => !favoriteOnly || favorites.includes(recipe.id))
    .filter((recipe) => `${recipe.title} ${recipe.description} ${recipe.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'protein' ? b.nutrition.protein - a.nutrition.protein : sort === 'calories' ? a.nutrition.calories - b.nutrition.calories : (a.prepMinutes + a.cookMinutes) - (b.prepMinutes + b.cookMinutes)), [search, category, cuisine, maxCalories, minProtein, quickOnly, favoriteOnly, favorites, sort])

  const visibleRecipes = filtered.slice(0, visibleCount)

  return (
    <div className="page-stack">
      <section className="browse-toolbar">
        <label className="search-field"><Search size={19} /><input placeholder="Rezepte, Zutaten oder Eigenschaften suchen …" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>{cuisineOptions.map((option) => <option key={option}>{option}</option>)}</select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="protein">Höchstes Protein</option><option value="calories">Wenigste Kalorien</option><option value="time">Schnellste zuerst</option></select>
      </section>
      <section className="category-row"><button className={category === 'Alle' ? 'is-active' : ''} onClick={() => setCategory('Alle')}><BookOpen size={17} /> Alle <small>{recipes.length}</small></button>{recipeCategories.map((item) => { const Icon = categoryIcons[item]; return <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}><Icon size={17} /> {item} <small>{recipes.filter((recipe) => recipe.category === item).length}</small></button> })}</section>
      <section className="browse-content">
        <aside className="mini-filter">
          <div className="mini-filter__head"><ListFilter size={18} /><b>Filter</b></div>
          <label className="range-field"><span>Max. Kalorien <b>{maxCalories}</b></span><input type="range" min="150" max="900" step="50" value={maxCalories} onChange={(e) => setMaxCalories(Number(e.target.value))} /></label>
          <label className="range-field"><span>Min. Protein <b>{minProtein} g</b></span><input type="range" min="0" max="80" step="5" value={minProtein} onChange={(e) => setMinProtein(Number(e.target.value))} /></label>
          <Toggle checked={quickOnly} onChange={setQuickOnly} label="Maximal 15 Minuten" />
          <Toggle checked={favoriteOnly} onChange={setFavoriteOnly} label="Nur Favoriten" />
          <button className="text-button" onClick={() => { setMaxCalories(800); setMinProtein(0); setQuickOnly(false); setFavoriteOnly(false); setSearch(''); setCuisine('Alle Küchen') }}><RotateCcw size={15} /> Filter löschen</button>
        </aside>
        <div>
          <div className="results-meta"><b>{filtered.length} Rezepte</b><span>{Math.min(visibleCount, filtered.length)} geladen · insgesamt {recipes.length}</span></div>
          <div className="recipe-grid recipe-grid--three">{visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => onFavorite(recipe.id)} onOpen={() => onOpen(recipe)} />)}</div>
          {visibleCount < filtered.length && <div className="load-more-row"><button className="button button--ghost" onClick={() => setVisibleCount((count) => count + 36)}>Weitere 36 Rezepte laden</button></div>}
        </div>
      </section>
    </div>
  )
}
