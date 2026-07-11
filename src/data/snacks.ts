import type { Recipe } from '../types'
import { accents, bowlVariants, makeRecipe, proteinDinnerVariants, ri, savoryVariants, sweetVariants } from './recipeFactory'

export const snacks: Recipe[] = []

sweetVariants.forEach((variant, index) => {
  snacks.push(makeRecipe({
    id: `snack-skyr-${index + 1}`,
    title: `Skyr-Snack ${variant.name}`,
    description: 'Kleine, schnelle Portion mit viel Protein und frischem Obst.',
    category: 'Snack', prepMinutes: 4, cookMinutes: 0,
    ingredients: [ri('skyr', 220), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 80) }))],
    steps: ['Skyr cremig rühren.', 'Obst klein schneiden und auflegen.', 'Topping sparsam darübergeben und direkt essen oder kalt stellen.'],
    tags: ['Unter 5 Minuten', 'Proteinreich', 'Süß'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[index],
  }))

  snacks.push(makeRecipe({
    id: `snack-quark-${index + 1}`,
    title: `Quark-Creme ${variant.name}`,
    description: 'Sehr sättigende Creme aus Magerquark, etwas Kefir und Obst.',
    category: 'Snack', prepMinutes: 5, cookMinutes: 0,
    ingredients: [ri('quark', 220), ri('kefir', 50), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 70) }))],
    steps: ['Quark und Kefir glatt rühren.', 'Obst vorbereiten und unterheben.', 'Mit dem jeweiligen Topping abschließen.'],
    tags: ['Sehr sättigend', 'Proteinreich', 'Ohne Kochen'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[(index + 2) % accents.length],
  }))

  snacks.push(makeRecipe({
    id: `snack-cottage-${index + 1}`,
    title: `Körniger-Frischkäse-Snack ${savoryVariants[index].name}`,
    description: 'Herzhafter Snackteller aus körnigem Frischkäse und knackigem Gemüse.',
    category: 'Snack', prepMinutes: 6, cookMinutes: 0,
    ingredients: [ri('cottage', 200), ...savoryVariants[index].extra.map((x) => ({ ...x, amount: Math.min(x.amount, 100) }))],
    steps: ['Gemüse waschen und in mundgerechte Stücke schneiden.', 'Körnigen Frischkäse würzen und in eine Schale geben.', 'Gemüse dazu anrichten oder direkt unterheben.'],
    tags: ['Herzhaft', 'Low Carb', 'Ohne Kochen'], equipment: ['Messer', 'Schüssel'], mealPrepDays: 1, portable: true, accent: accents[(index + 4) % accents.length],
  }))

  snacks.push(makeRecipe({
    id: `snack-egg-${index + 1}`,
    title: `Eiklar-Snackbox ${savoryVariants[index].name}`,
    description: 'Warme oder kalte Mini-Frittata mit hohem Proteinanteil und viel Gemüse.',
    category: 'Snack', prepMinutes: 6, cookMinutes: 9,
    ingredients: [ri('eggWhite', 180), ri('egg', 50), ...savoryVariants[index].extra.map((x) => ({ ...x, amount: Math.min(x.amount, 90) }))],
    steps: ['Gemüse klein schneiden und kurz in einer Pfanne garen.', 'Ei und Eiklar verquirlen, dazugeben und vollständig stocken lassen.', 'In Stücke schneiden und warm essen oder für unterwegs abkühlen lassen.'],
    tags: ['Herzhaft', 'Meal Prep', 'Sehr proteinreich'], equipment: ['Pfanne'], mealPrepDays: 2, portable: true, accent: accents[(index + 6) % accents.length],
  }))

  snacks.push(makeRecipe({
    id: `snack-tuna-${index + 1}`,
    title: `Thunfisch-Gemüse-Cup ${savoryVariants[index].name}`,
    description: 'Kompakter herzhafter Snack mit Thunfisch, Skyr und knackigem Gemüse.',
    category: 'Snack', prepMinutes: 6, cookMinutes: 0,
    ingredients: [ri('tuna', 110), ri('skyr', 70), ...savoryVariants[index].extra.map((x) => ({ ...x, amount: Math.min(x.amount, 80) }))],
    steps: ['Thunfisch abtropfen lassen.', 'Mit Skyr, Pfeffer, Zitrone und Kräutern verrühren.', 'Gemüse fein schneiden und unterheben oder separat dazu essen.'],
    tags: ['Herzhaft', 'Sehr proteinreich', 'Ohne Kochen'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[(index + 8) % accents.length],
  }))
})
