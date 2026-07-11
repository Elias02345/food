import type { Recipe, RecipeCategory, RecipeIngredient } from '../types'
import { accents, makeRecipe } from './recipeFactory'

export type ExpansionVariant = {
  name: string
  ingredients: RecipeIngredient[]
  seasoning: string
  note?: string
  tags?: string[]
}

export type ExpansionFamily = {
  id: string
  title: string
  description: string
  category: RecipeCategory
  prepMinutes: number
  cookMinutes: number
  baseIngredients: RecipeIngredient[]
  variants: ExpansionVariant[]
  steps: (variant: ExpansionVariant) => string[]
  tags: string[]
  equipment: string[]
  mealPrepDays: number
  portable: boolean
  accentOffset?: number
}

export const buildFamily = (family: ExpansionFamily): Recipe[] => {
  if (family.variants.length !== 5) throw new Error(`${family.id} must contain exactly five variants`)
  return family.variants.map((variant, index) => makeRecipe({
    id: `exp-${family.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${family.id}-${index + 1}`,
    title: `${family.title} ${variant.name}`,
    description: `${family.description} ${variant.note ?? ''}`.trim(),
    category: family.category,
    prepMinutes: family.prepMinutes,
    cookMinutes: family.cookMinutes,
    ingredients: [...family.baseIngredients, ...variant.ingredients],
    steps: family.steps(variant),
    tags: [...new Set([...family.tags, ...(variant.tags ?? [])])],
    equipment: family.equipment,
    mealPrepDays: family.mealPrepDays,
    portable: family.portable,
    accent: accents[((family.accentOffset ?? 0) + index) % accents.length],
  }))
}

export const cookingSteps = {
  bowl: (variant: ExpansionVariant) => [
    'Alle vorgegarten Grundzutaten bereitstellen und das frische Gemüse mundgerecht schneiden.',
    `Protein, Sättigungsbeilage und Gemüse in einer Schüssel anrichten und mit ${variant.seasoning} abschmecken.`,
    'Alles gründlich vermengen oder getrennt anrichten und direkt essen beziehungsweise für Meal Prep kalt stellen.',
  ],
  skillet: (variant: ExpansionVariant) => [
    'Gemüse klein schneiden und in einer gut beschichteten Pfanne mit einem Schluck Wasser anbraten.',
    `Die übrigen Zutaten ergänzen, mit ${variant.seasoning} würzen und bei mittlerer Hitze vollständig erhitzen.`,
    'Noch zwei Minuten ziehen lassen, abschmecken und direkt servieren.',
  ],
  pot: (variant: ExpansionVariant) => [
    'Gemüse vorbereiten und im Topf mit wenig Wasser zwei bis drei Minuten anschwitzen.',
    `Die restlichen Zutaten zugeben, mit ${variant.seasoning} würzen und bei niedriger Hitze köcheln lassen.`,
    'Die Konsistenz mit etwas Wasser anpassen, abschmecken und heiß servieren oder portionsweise abkühlen lassen.',
  ],
  tray: (variant: ExpansionVariant) => [
    'Backofen auf 210 °C Ober-/Unterhitze vorheizen und alle Zutaten mundgerecht vorbereiten.',
    `Alles auf einem Blech verteilen, mit ${variant.seasoning} würzen und gleichmäßig vermengen.`,
    'Je nach Protein 18 bis 25 Minuten garen, einmal wenden und vor dem Servieren kurz ruhen lassen.',
  ],
  cold: (variant: ExpansionVariant) => [
    'Alle Zutaten vorbereiten und Obst oder Gemüse klein schneiden.',
    `Die cremige Basis verrühren und mit ${variant.seasoning} abschmecken.`,
    'Einfüllen, Toppings ergänzen und direkt essen oder bis zur Verwendung kalt stellen.',
  ],
  bake: (variant: ExpansionVariant) => [
    'Backofen auf 190 °C Ober-/Unterhitze vorheizen und eine kleine Form bereitstellen.',
    `Alle Zutaten verrühren, mit ${variant.seasoning} abschmecken und gleichmäßig in die Form geben.`,
    'Backen, bis die Mitte fest ist, anschließend kurz abkühlen lassen und warm oder kalt servieren.',
  ],
}
