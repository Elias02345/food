import * as React from 'react'
import { Apple, Clock3, Heart, ShoppingBasket, Sparkles } from 'lucide-react'
import type { Recipe, RecipeMatch } from '../types'
import { categoryIcons } from '../appShared'

export const MacroPill = ({ label, value, unit, strong = false }: { label: string; value: number; unit: string; strong?: boolean }) => (
  <div className={`macro-pill ${strong ? 'macro-pill--strong' : ''}`}>
    <span>{label}</span>
    <b>{Math.round(value)} {unit}</b>
  </div>
)

export const CategoryVisual = ({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) => {
  const Icon = categoryIcons[recipe.category]
  return (
    <div className={`food-visual food-visual--${recipe.accent} ${compact ? 'food-visual--compact' : ''}`}>
      <div className="food-visual__orb food-visual__orb--one" />
      <div className="food-visual__orb food-visual__orb--two" />
      <Icon size={compact ? 28 : 44} strokeWidth={1.7} />
      <span>{recipe.category}</span>
    </div>
  )
}

export const RecipeCard = ({ recipe, favorite, onFavorite, onOpen, match }: {
  recipe: Recipe
  favorite: boolean
  onFavorite: () => void
  onOpen: () => void
  match?: RecipeMatch
}) => {
  const nutrition = match?.nutrition ?? recipe.nutrition
  const totalTime = recipe.prepMinutes + recipe.cookMinutes
  return (
    <article className="recipe-card" onClick={onOpen}>
      <CategoryVisual recipe={recipe} />
      <button className={`icon-button recipe-card__favorite ${favorite ? 'is-active' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite() }} aria-label="Favorit umschalten">
        <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <div className="recipe-card__body">
        <div className="eyebrow-row">
          <span>{recipe.category}</span>
          <span><Clock3 size={14} /> {totalTime} Min.</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        {match && (
          <div className="match-badge"><Sparkles size={14} /> {match.fitLabel} · {Math.round(match.scale * 100)} % Portion</div>
        )}
        <div className="recipe-card__macros">
          <MacroPill label="kcal" value={nutrition.calories} unit="" strong />
          <MacroPill label="Protein" value={nutrition.protein} unit="g" />
          <MacroPill label="KH" value={nutrition.carbs} unit="g" />
          <MacroPill label="Fett" value={nutrition.fat} unit="g" />
        </div>
      </div>
    </article>
  )
}

export const ProgressRing = ({ value, max, label, unit }: { value: number; max: number; label: string; unit: string }) => {
  const percentage = Math.min(100, Math.max(0, max ? value / max * 100 : 0))
  return (
    <div className="progress-ring" style={{ '--progress': `${percentage * 3.6}deg` } as React.CSSProperties}>
      <div>
        <b>{Math.round(value)}</b>
        <small>{unit}</small>
        <span>{label}</span>
      </div>
    </div>
  )
}


export function Toggle({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (value: boolean) => void; label: string; disabled?: boolean }) {
  return <label className={`toggle ${disabled ? 'is-disabled' : ''}`}><input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} /><i /><span>{label}</span></label>
}


export function EmptyState({ icon: Icon, title, text }: { icon: typeof ShoppingBasket; title: string; text: string }) {
  return <div className="empty-state"><Icon size={36} /><h3>{title}</h3><p>{text}</p></div>
}
