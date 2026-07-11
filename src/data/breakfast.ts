import type { Recipe } from '../types'
import { accents, bowlVariants, makeRecipe, proteinDinnerVariants, ri, savoryVariants, sweetVariants } from './recipeFactory'

export const breakfast: Recipe[] = []

sweetVariants.forEach((variant, index) => {
  breakfast.push(makeRecipe({
    id: `breakfast-overnight-${index + 1}`,
    title: `Overnight Oats ${variant.name}`,
    description: `Cremige Protein-Oats, ${variant.note}. Abends in zwei Minuten vorbereitet.`,
    category: 'Frühstück', prepMinutes: 5, cookMinutes: 0,
    ingredients: [ri('oats', 55), ri('skyr', 250), ri('milk', 80), ...variant.extra],
    steps: ['Haferflocken, Skyr und Milch in einem verschließbaren Glas glatt rühren.', 'Obst vorbereiten und zusammen mit dem Topping auf die Oats geben.', 'Mindestens 3 Stunden kalt stellen. Vor dem Essen einmal umrühren.'],
    tags: ['Meal Prep', 'Kalt', 'Proteinreich', 'Für unterwegs'], equipment: ['Schüssel oder Glas'], mealPrepDays: 2, portable: true, accent: accents[index],
  }))

  breakfast.push(makeRecipe({
    id: `breakfast-quark-${index + 1}`,
    title: `Magerquark-Bowl ${variant.name}`,
    description: `Große, sättigende Bowl mit viel Protein und wenigen Arbeitsschritten.`,
    category: 'Frühstück', prepMinutes: 6, cookMinutes: 0,
    ingredients: [ri('quark', 300), ri('oats', 30), ri('kefir', 60), ...variant.extra],
    steps: ['Magerquark mit Kefir cremig rühren.', 'Haferflocken unterheben.', 'Obst schneiden, auflegen und mit dem jeweiligen Topping abschließen.'],
    tags: ['Sehr sättigend', 'Ohne Kochen', 'Proteinreich'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[(index + 2) % accents.length],
  }))

  breakfast.push(makeRecipe({
    id: `breakfast-porridge-${index + 1}`,
    title: `Protein-Porridge ${variant.name}`,
    description: `Warmer Haferbrei, der durch Eiklar cremig und deutlich proteinreicher wird.`,
    category: 'Frühstück', prepMinutes: 4, cookMinutes: 8,
    ingredients: [ri('oats', 60), ri('milk', 160), ri('eggWhite', 160), ...variant.extra],
    steps: ['Haferflocken und Milch in einem kleinen Topf 4 Minuten köcheln lassen.', 'Hitze reduzieren und Eiklar langsam unter ständigem Rühren einarbeiten.', 'Noch 2 Minuten cremig ziehen lassen und anschließend Obst und Topping ergänzen.'],
    tags: ['Warm', 'Proteinreich', 'Unter 15 Minuten'], equipment: ['Topf', 'Kochlöffel'], mealPrepDays: 1, portable: false, accent: accents[(index + 4) % accents.length],
  }))

  breakfast.push(makeRecipe({
    id: `breakfast-pancake-${index + 1}`,
    title: `Hafer-Pancakes ${variant.name}`,
    description: `Weiche Pancakes aus Hafer, Ei und Eiklar mit einer frischen Proteincreme.`,
    category: 'Frühstück', prepMinutes: 7, cookMinutes: 10,
    ingredients: [ri('oats', 50), ri('egg', 60), ri('eggWhite', 130), ri('skyr', 120), ...variant.extra],
    steps: ['Haferflocken, Ei und Eiklar zu einem dickflüssigen Teig verrühren.', 'In einer guten beschichteten Pfanne kleine Pancakes von beiden Seiten ausbacken.', 'Mit Skyr, Obst und Topping servieren.'],
    tags: ['Wochenende', 'Proteinreich', 'Ohne Proteinpulver'], equipment: ['Pfanne', 'Schüssel'], mealPrepDays: 2, portable: true, accent: accents[(index + 6) % accents.length],
  }))
})

savoryVariants.forEach((variant, index) => {
  breakfast.push(makeRecipe({
    id: `breakfast-omelette-${index + 1}`,
    title: `Frühstücks-Omelett ${variant.name}`,
    description: 'Voluminöses Omelett mit Eiklar, Ei, körnigem Frischkäse und viel Gemüse.',
    category: 'Frühstück', prepMinutes: 7, cookMinutes: 10,
    ingredients: [ri('eggWhite', 220), ri('egg', 100), ri('cottage', 80), ...variant.extra],
    steps: ['Gemüse klein schneiden und in einer beschichteten Pfanne 3 bis 4 Minuten garen.', 'Ei und Eiklar verquirlen, über das Gemüse geben und bei mittlerer Hitze stocken lassen.', 'Körnigen Frischkäse darauf verteilen, zusammenklappen und kurz nachziehen lassen.'],
    tags: ['Herzhaft', 'Low Carb', 'Sehr proteinreich'], equipment: ['Pfanne', 'Schüssel'], mealPrepDays: 1, portable: false, accent: accents[index],
  }))
})
