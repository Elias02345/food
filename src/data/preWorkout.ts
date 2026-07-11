import type { Recipe } from '../types'
import { accents, bowlVariants, makeRecipe, proteinDinnerVariants, ri, savoryVariants, sweetVariants } from './recipeFactory'

export const preWorkout: Recipe[] = []

sweetVariants.forEach((variant, index) => {
  preWorkout.push(makeRecipe({
    id: `preworkout-skyr-oats-${index + 1}`,
    title: `Pre-Workout Skyr-Oats ${variant.name}`,
    description: 'Leicht verdauliche Kombination aus Kohlenhydraten und Protein mit kontrollierter Fettmenge.',
    category: 'Pre-Workout', prepMinutes: 5, cookMinutes: 0,
    ingredients: [ri('skyr', 220), ri('oats', 40), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 110) }))],
    steps: ['Skyr mit einem kleinen Schluck Wasser cremig rühren.', 'Haferflocken unterheben.', 'Obst und Topping ergänzen und idealerweise 60 bis 120 Minuten vor dem Training essen.'],
    tags: ['Schnell', 'Vor dem Training', 'Fettarm'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[index],
  }))

  preWorkout.push(makeRecipe({
    id: `preworkout-rice-${index + 1}`,
    title: `Süße Reis-Skyr-Bowl ${variant.name}`,
    description: 'Sehr einfache Bowl aus gekochtem Reis, Skyr und Obst für gut planbare Kohlenhydrate.',
    category: 'Pre-Workout', prepMinutes: 6, cookMinutes: 0,
    ingredients: [ri('rice', 170), ri('skyr', 180), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 100) }))],
    steps: ['Gekochten, abgekühlten Reis mit Skyr vermengen.', 'Obst klein schneiden und unterheben.', 'Kalt essen oder kurz in der Mikrowelle lauwarm machen.'],
    tags: ['Vor dem Training', 'Meal Prep', 'Magenfreundlich'], equipment: ['Schüssel'], mealPrepDays: 2, portable: true, accent: accents[(index + 2) % accents.length],
  }))

  preWorkout.push(makeRecipe({
    id: `preworkout-quark-fruit-${index + 1}`,
    title: `Quark-Frucht-Cup ${variant.name}`,
    description: 'Kompakter Protein-Snack mit Obst und einer kleinen Haferportion.',
    category: 'Pre-Workout', prepMinutes: 5, cookMinutes: 0,
    ingredients: [ri('quark', 220), ri('kefir', 60), ri('oats', 25), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 90) }))],
    steps: ['Quark und Kefir glatt rühren.', 'Haferflocken einrühren.', 'Obst und Topping obenauf geben und bis zum Essen kalt halten.'],
    tags: ['Für unterwegs', 'Proteinreich', 'Schnell'], equipment: ['Becher'], mealPrepDays: 1, portable: true, accent: accents[(index + 4) % accents.length],
  }))

  preWorkout.push(makeRecipe({
    id: `preworkout-porridge-${index + 1}`,
    title: `Leichtes Trainings-Porridge ${variant.name}`,
    description: 'Warmes Porridge mit Eiklar für viel Protein bei niedriger Fettmenge.',
    category: 'Pre-Workout', prepMinutes: 4, cookMinutes: 7,
    ingredients: [ri('oats', 45), ri('milk', 130), ri('eggWhite', 130), ...variant.extra.map((x) => ({ ...x, amount: Math.min(x.amount, 95) }))],
    steps: ['Haferflocken und Milch 3 Minuten köcheln lassen.', 'Eiklar langsam einrühren und bei niedriger Hitze stocken lassen.', 'Mit Obst und Topping servieren.'],
    tags: ['Warm', 'Vor dem Training', 'Fettarm'], equipment: ['Topf'], mealPrepDays: 1, portable: false, accent: accents[(index + 6) % accents.length],
  }))

  preWorkout.push(makeRecipe({
    id: `preworkout-date-${index + 1}`,
    title: `Dattel-Bananen-Energiebecher ${index + 1}`,
    description: 'Schnelle Kohlenhydrate aus Obst, kombiniert mit Skyr und einer kleinen Haferportion.',
    category: 'Pre-Workout', prepMinutes: 5, cookMinutes: 0,
    ingredients: [ri('dates', 25 + index), ri('banana', 100), ri('skyr', 180), ri('oats', 25), index % 2 === 0 ? ri('berries', 60) : ri('kiwi', 70)],
    steps: ['Datteln und Banane klein schneiden.', 'Skyr mit Haferflocken verrühren.', 'Obst unterheben und 45 bis 90 Minuten vor dem Training essen.'],
    tags: ['Schnelle Energie', 'Vor dem Training', 'Ohne Kochen'], equipment: ['Schüssel'], mealPrepDays: 1, portable: true, accent: accents[(index + 8) % accents.length],
  }))
})
