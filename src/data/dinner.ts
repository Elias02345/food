import type { Recipe } from '../types'
import { accents, bowlVariants, makeRecipe, proteinDinnerVariants, ri, savoryVariants, sweetVariants } from './recipeFactory'

export const dinner: Recipe[] = []

proteinDinnerVariants.forEach((variant, index) => {
  dinner.push(makeRecipe({
    id: `dinner-sheetpan-${index + 1}`,
    title: `Blechgericht ${variant.name}`,
    description: 'Protein, Kartoffeln und Gemüse auf einem Blech. Wenig Abwasch und gut skalierbar.',
    category: 'Abendessen', prepMinutes: 10, cookMinutes: 25,
    ingredients: [variant.protein, ri('potato', 300), variant.extra, ri('oliveOil', 5)],
    steps: ['Backofen auf 210 °C Ober-/Unterhitze vorheizen.', 'Kartoffeln und Gemüse klein schneiden, mit Öl und Gewürzen mischen und 15 Minuten vorbacken.', 'Protein ergänzen und je nach Sorte weitere 10 bis 15 Minuten vollständig garen.'],
    tags: ['Blechgericht', 'Wenig Abwasch', 'Sättigend'], equipment: ['Backblech', 'Backofen'], mealPrepDays: 3, portable: true, accent: accents[index],
  }))

  dinner.push(makeRecipe({
    id: `dinner-rice-pan-${index + 1}`,
    title: `Gemüse-Reis-Pfanne ${variant.name}`,
    description: 'Schnelle Pfanne mit einer großen Portion Gemüse und exakt berechenbaren Zutaten.',
    category: 'Abendessen', prepMinutes: 8, cookMinutes: 14,
    ingredients: [variant.protein, ri('brownRice', 180), variant.extra, ri('onion', 45)],
    steps: ['Zwiebel und Gemüse in einer großen beschichteten Pfanne garen.', 'Protein hinzufügen und vollständig erhitzen oder garen.', 'Vollkornreis unterheben, kräftig würzen und 3 Minuten ziehen lassen.'],
    tags: ['Pfannengericht', 'Meal Prep', 'Ausgewogen'], equipment: ['Pfanne'], mealPrepDays: 3, portable: true, accent: accents[(index + 1) % accents.length],
  }))

  dinner.push(makeRecipe({
    id: `dinner-quinoa-${index + 1}`,
    title: `Quinoa-Protein-Teller ${variant.name}`,
    description: 'Farbenfroher Teller mit Quinoa, Proteinquelle, Gemüse und einem leichten Joghurtdip.',
    category: 'Abendessen', prepMinutes: 10, cookMinutes: 12,
    ingredients: [variant.protein, ri('quinoa', 180), variant.extra, ri('greekYogurt', 70), ri('lemon', 25)],
    steps: ['Gemüse und Protein in einer Pfanne vollständig garen.', 'Quinoa erwärmen und auf einem Teller verteilen.', 'Joghurt mit Zitrone und Gewürzen verrühren und alles gemeinsam servieren.'],
    tags: ['Proteinreich', 'Bowl', 'Glutenfrei'], equipment: ['Pfanne', 'Schüssel'], mealPrepDays: 2, portable: true, accent: accents[(index + 2) % accents.length],
  }))

  dinner.push(makeRecipe({
    id: `dinner-lentil-${index + 1}`,
    title: `Linsen-Gemüse-Topf ${variant.name}`,
    description: 'Wärmender Topf mit Linsen, Gemüse und zusätzlicher Proteinquelle.',
    category: 'Abendessen', prepMinutes: 8, cookMinutes: 18,
    ingredients: [variant.protein, ri('lentils', 180), variant.extra, ri('tomato', 180), ri('onion', 45)],
    steps: ['Zwiebel und Gemüse in einem Topf kurz anschwitzen.', 'Tomaten und Linsen dazugeben und 10 Minuten köcheln lassen.', 'Protein ergänzen, vollständig garen beziehungsweise erhitzen und abschmecken.'],
    tags: ['One Pot', 'Ballaststoffreich', 'Meal Prep'], equipment: ['Topf'], mealPrepDays: 3, portable: true, accent: accents[(index + 3) % accents.length],
  }))

  dinner.push(makeRecipe({
    id: `dinner-loaded-potato-${index + 1}`,
    title: `Gefüllte Kartoffel ${variant.name}`,
    description: 'Große Ofenkartoffel mit proteinreicher Füllung, Gemüse und frischem Skyr-Topping.',
    category: 'Abendessen', prepMinutes: 8, cookMinutes: 28,
    ingredients: [variant.protein, ri('potato', 350), variant.extra, ri('skyr', 90)],
    steps: ['Kartoffeln halbieren und im Ofen oder Airfryer weich garen.', 'Gemüse und Protein währenddessen in einer Pfanne zubereiten.', 'Kartoffeln aufdrücken, füllen und mit gewürztem Skyr abschließen.'],
    tags: ['Comfort Food', 'Sehr sättigend', 'High Volume'], equipment: ['Backofen oder Airfryer', 'Pfanne'], mealPrepDays: 2, portable: false, accent: accents[(index + 4) % accents.length],
  }))
})
