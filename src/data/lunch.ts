import type { Recipe } from '../types'
import { accents, bowlVariants, makeRecipe, proteinDinnerVariants, ri, savoryVariants, sweetVariants } from './recipeFactory'

export const lunch: Recipe[] = []

bowlVariants.forEach((variant, index) => {
  lunch.push(makeRecipe({
    id: `lunch-chicken-rice-${index + 1}`,
    title: `Hähnchen-Reis-Bowl ${variant.name}`,
    description: 'Einfaches Alltagsgericht mit magerem Hähnchen, Reis, viel Gemüse und Joghurtdip.',
    category: 'Mittagessen', prepMinutes: 8, cookMinutes: 16,
    ingredients: [ri('chicken', 160), ri('rice', 190), ri('greekYogurt', 80), ...variant.extra],
    steps: ['Gemüse mundgerecht schneiden und in einer großen Pfanne bissfest garen.', 'Hähnchen und gekochten Reis dazugeben und alles gründlich erhitzen.', 'Joghurt mit etwas Zitronensaft, Salz und Gewürzen verrühren und zur Bowl geben.'],
    tags: ['Meal Prep', 'Post Workout', 'Ausgewogen'], equipment: ['Pfanne', 'Messer'], mealPrepDays: 3, portable: true, accent: accents[index],
  }))

  lunch.push(makeRecipe({
    id: `lunch-turkey-potato-${index + 1}`,
    title: `Puten-Kartoffel-Pfanne ${variant.name}`,
    description: 'Große Portion mit Kartoffeln, magerer Pute und Gemüse. Gut vor dem Training planbar.',
    category: 'Mittagessen', prepMinutes: 10, cookMinutes: 18,
    ingredients: [ri('turkey', 175), ri('potato', 320), ri('greekYogurt', 60), ...variant.extra],
    steps: ['Gekochte Kartoffeln in Scheiben schneiden und in einer beschichteten Pfanne anrösten.', 'Pute und Gemüse ergänzen und alles vollständig erhitzen.', 'Joghurt würzen und als frischen Dip dazu servieren.'],
    tags: ['Sehr sättigend', 'Meal Prep', 'Fettarm'], equipment: ['Pfanne'], mealPrepDays: 3, portable: true, accent: accents[(index + 1) % accents.length],
  }))

  lunch.push(makeRecipe({
    id: `lunch-tuna-quinoa-${index + 1}`,
    title: `Thunfisch-Quinoa-Salat ${variant.name}`,
    description: 'Schneller, kalt essbarer Salat mit hoher Proteindichte und guter Transportfähigkeit.',
    category: 'Mittagessen', prepMinutes: 10, cookMinutes: 0,
    ingredients: [ri('tuna', 160), ri('quinoa', 180), ri('cucumber', 100), ri('lemon', 30), ...variant.extra],
    steps: ['Quinoa in eine große Schüssel geben und auflockern.', 'Gemüse schneiden, Thunfisch abtropfen lassen und alles vermengen.', 'Mit Zitrone, Pfeffer und Kräutern abschmecken.'],
    tags: ['Kalt', 'Für unterwegs', 'Ohne Kochen'], equipment: ['Schüssel', 'Messer'], mealPrepDays: 2, portable: true, accent: accents[(index + 2) % accents.length],
  }))

  lunch.push(makeRecipe({
    id: `lunch-lentil-chicken-${index + 1}`,
    title: `Linsen-Hähnchen-Topf ${variant.name}`,
    description: 'Ballaststoffreicher One-Pot mit zwei Proteinquellen und viel Volumen.',
    category: 'Mittagessen', prepMinutes: 8, cookMinutes: 15,
    ingredients: [ri('lentils', 190), ri('chicken', 125), ri('tomato', 180), ri('onion', 50), ...variant.extra],
    steps: ['Zwiebel und Gemüse in einem Topf mit einem Schluck Wasser anschwitzen.', 'Linsen, Tomaten und Hähnchen dazugeben und 10 Minuten köcheln lassen.', 'Kräftig würzen und bei Bedarf mit Wasser auf die gewünschte Konsistenz bringen.'],
    tags: ['One Pot', 'Ballaststoffreich', 'Meal Prep'], equipment: ['Topf'], mealPrepDays: 3, portable: true, accent: accents[(index + 3) % accents.length],
  }))

  lunch.push(makeRecipe({
    id: `lunch-beef-pasta-${index + 1}`,
    title: `Rind-Vollkorn-Pasta ${variant.name}`,
    description: 'Mageres Rind, Vollkornnudeln und Gemüse als unkomplizierte, sättigende Mahlzeit.',
    category: 'Mittagessen', prepMinutes: 8, cookMinutes: 18,
    ingredients: [ri('beef', 145), ri('pasta', 190), ri('tomato', 180), ...variant.extra],
    steps: ['Gemüse in einer großen Pfanne garen.', 'Mageres Rind dazugeben und vollständig erhitzen.', 'Gekochte Vollkornnudeln und Tomaten unterheben, würzen und 3 Minuten ziehen lassen.'],
    tags: ['Post Workout', 'Meal Prep', 'Eisenquelle'], equipment: ['Pfanne'], mealPrepDays: 3, portable: true, accent: accents[(index + 4) % accents.length],
  }))
})
