import { useMemo, useState } from 'react'
import { ArrowRight, BarChart3, BookOpen, Check, ChevronRight, ClipboardList, Clock3, Copy, Dumbbell, Flame, Heart, Info, ListFilter, Plus, Refrigerator, RotateCcw, Search, ShoppingBasket, Sparkles, Sun, Target, Trash2, Upload, Utensils, WandSparkles, X, Zap } from 'lucide-react'
import { ingredientList, ingredients } from '../data/ingredients'
import { recipeCategories, recipes, recipesById } from '../data/recipes'
import { findRecipeMatches, findRecipePairs, type MatchOptions } from '../lib/matcher'
import { exportLocalData, importLocalData } from '../lib/storage'
import type { MacroTarget, PlannerEntry, Recipe, ShoppingItem } from '../types'
import { days, emptyNutrition, macroFields, type Page } from '../appShared'
import { EmptyState, ProgressRing, RecipeCard, Toggle } from '../components/RecipeUI'

export function Dashboard({ remaining, target, consumed, favorites, pantry, onOpen, onFavorite, onNavigate, onReset }: {
  remaining: MacroTarget; target: MacroTarget; consumed: MacroTarget; favorites: string[]; pantry: string[]
  onOpen: (recipe: Recipe, scale?: number) => void; onFavorite: (id: string) => void; onNavigate: (page: Page) => void; onReset: () => void
}) {
  const recommendations = useMemo(() => findRecipeMatches(recipes, remaining, { pantryIngredientIds: pantry }, 4), [remaining, pantry])
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-card">
          <div className="hero-card__copy">
            <span className="badge"><WandSparkles size={15} /> Smarter Tagesabschluss</span>
            <h2>Noch {Math.round(remaining.calories)} kcal. Wir finden die Mahlzeit, die wirklich passt.</h2>
            <p>Der Finder skaliert Portionen automatisch und bewertet Kalorien, Protein, Kohlenhydrate und Fett gemeinsam.</p>
            <button className="button button--primary" onClick={() => onNavigate('finder')}>Passende Rezepte finden <ArrowRight size={17} /></button>
          </div>
          <div className="hero-card__target">
            <span>Offenes Tagesziel</span>
            <b>{Math.round(remaining.protein)} g</b>
            <small>Protein verbleibend</small>
            <div className="mini-bars"><i style={{ width: `${Math.min(100, remaining.calories / Math.max(target.calories, 1) * 100)}%` }} /><i style={{ width: `${Math.min(100, remaining.protein / Math.max(target.protein, 1) * 100)}%` }} /><i style={{ width: `${Math.min(100, remaining.carbs / Math.max(target.carbs, 1) * 100)}%` }} /></div>
          </div>
        </div>
        <div className="quick-card">
          <div className="section-heading"><div><span className="eyebrow">Heute</span><h3>Makro-Fortschritt</h3></div><button className="text-button" onClick={onReset}><RotateCcw size={15} /> Zurücksetzen</button></div>
          <div className="rings-grid">
            <ProgressRing value={consumed.calories} max={target.calories} label="Kalorien" unit="kcal" />
            <ProgressRing value={consumed.protein} max={target.protein} label="Protein" unit="g" />
            <ProgressRing value={consumed.carbs} max={target.carbs} label="Kohlenhydrate" unit="g" />
            <ProgressRing value={consumed.fat} max={target.fat} label="Fett" unit="g" />
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading"><div><span className="eyebrow">Dynamisch berechnet</span><h2>Beste Matches für heute</h2></div><button className="text-button" onClick={() => onNavigate('finder')}>Alle Matches <ChevronRight size={16} /></button></div>
        <div className="recipe-grid recipe-grid--four">
          {recommendations.map((match) => <RecipeCard key={match.recipe.id} recipe={match.recipe} match={match} favorite={favorites.includes(match.recipe.id)} onFavorite={() => onFavorite(match.recipe.id)} onOpen={() => onOpen(match.recipe, match.scale)} />)}
        </div>
      </section>

      <section className="insight-grid">
        <button className="insight-card" onClick={() => onNavigate('browse')}><BookOpen size={25} /><div><b>{recipes.length} geprüfte Rezeptvarianten</b><span>Je 45 für Frühstück, Mittagessen, Pre-Workout, Abendessen und Snacks.</span></div><ChevronRight /></button>
        <button className="insight-card" onClick={() => onNavigate('pantry')}><Refrigerator size={25} /><div><b>{pantry.length} Zutaten im Vorrat</b><span>Nutze vorhandene Lebensmittel zuerst und reduziere unnötige Einkäufe.</span></div><ChevronRight /></button>
        <button className="insight-card" onClick={() => onNavigate('planner')}><ClipboardList size={25} /><div><b>Woche automatisch planen</b><span>Rezepte passend zu Tageszielen und Mahlzeiten verteilen.</span></div><ChevronRight /></button>
      </section>
    </div>
  )
}
