import { ri } from './recipeFactory'
import type { ExpansionVariant } from './expansionFactory'

export const sweetProfilesA: ExpansionVariant[] = [
  { name: 'Beere-Zitrone-Chia', ingredients: [ri('berries', 120), ri('lemon', 20), ri('chia', 8)], seasoning: 'Zitronenabrieb und Zimt', note: 'Frisch, säuerlich und ballaststoffreich.', tags: ['Beerig'] },
  { name: 'Apfel-Zimt-Leinsamen', ingredients: [ri('apple', 150), ri('flax', 8)], seasoning: 'Zimt und einer Prise Salz', note: 'Erinnert an Apfelkuchen, bleibt aber alltagstauglich.', tags: ['Apfel-Zimt'] },
  { name: 'Banane-Kakao', ingredients: [ri('banana', 110), ri('cocoa', 7)], seasoning: 'Backkakao und Zimt', note: 'Natürlich süß und schokoladig.', tags: ['Schokoladig'] },
  { name: 'Birne-Walnuss', ingredients: [ri('pear', 145), ri('walnuts', 8)], seasoning: 'Zimt und Vanille', note: 'Saftige Birne trifft auf kleinen, kontrollierten Crunch.', tags: ['Nussig'] },
  { name: 'Orange-Kiwi-Kürbiskern', ingredients: [ri('orange', 100), ri('kiwi', 80), ri('pumpkinSeeds', 8)], seasoning: 'Orangenabrieb', note: 'Sehr frisch und farbenreich.', tags: ['Frisch'] },
]

export const sweetProfilesB: ExpansionVariant[] = [
  { name: 'Traube-Mandel', ingredients: [ri('grapes', 120), ri('almonds', 9)], seasoning: 'Zimt', note: 'Knackig, saftig und schnell vorbereitet.', tags: ['Knackig'] },
  { name: 'Beere-Kakao-Chia', ingredients: [ri('berries', 110), ri('cocoa', 6), ri('chia', 7)], seasoning: 'Kakao und Vanille', note: 'Dessertartig, aber ohne Fertigprodukt.', tags: ['Dessertartig'] },
  { name: 'Apfel-Erdnuss', ingredients: [ri('apple', 130), ri('peanutButter', 9)], seasoning: 'Zimt', note: 'Sättigend mit sparsam dosiertem Erdnussmus.', tags: ['Cremig'] },
  { name: 'Banane-Chia', ingredients: [ri('banana', 105), ri('chia', 9)], seasoning: 'Zimt und Vanille', note: 'Mild, cremig und gut vorzubereiten.', tags: ['Mild'] },
  { name: 'Kiwi-Beere-Kürbiskern', ingredients: [ri('kiwi', 80), ri('berries', 90), ri('pumpkinSeeds', 8)], seasoning: 'Zitronenabrieb', note: 'Säuerlich, fruchtig und mit leichtem Crunch.', tags: ['Vitaminreich'] },
]

export const savoryProfilesA: ExpansionVariant[] = [
  { name: 'Mediterran', ingredients: [ri('tomato', 130), ri('cucumber', 100), ri('lemon', 20)], seasoning: 'Oregano, Pfeffer und Zitrone', note: 'Klar, frisch und mediterran.', tags: ['Mediterran'] },
  { name: 'Spinat-Tomate', ingredients: [ri('spinach', 100), ri('tomato', 120)], seasoning: 'Muskat, Pfeffer und Kräutern', note: 'Ein bewährtes, mildes Gemüse-Duo.', tags: ['Grün'] },
  { name: 'Smoky Paprika-Bohne', ingredients: [ri('pepper', 130), ri('kidneyBeans', 80), ri('onion', 35)], seasoning: 'geräuchertem Paprikapulver und Kreuzkümmel', note: 'Herzhaft mit mexikanisch inspirierter Würzung.', tags: ['Mexikanisch inspiriert'] },
  { name: 'Curry-Erbse-Spinat', ingredients: [ri('peas', 90), ri('spinach', 90), ri('onion', 30)], seasoning: 'mildem Curry, Kurkuma und Pfeffer', note: 'Wärmend und indisch inspiriert.', tags: ['Curry'] },
  { name: 'Pilz-Zwiebel', ingredients: [ri('mushroom', 150), ri('onion', 45)], seasoning: 'Thymian und schwarzem Pfeffer', note: 'Deftig im Geschmack, aber kalorienarm.', tags: ['Rustikal'] },
]

export const savoryProfilesB: ExpansionVariant[] = [
  { name: 'Brokkoli-Zitrone', ingredients: [ri('broccoli', 150), ri('lemon', 20)], seasoning: 'Zitrone, Knoblauch und Pfeffer', note: 'Frisch, grün und unkompliziert.', tags: ['Zitronig'] },
  { name: 'Zucchini-Tomate', ingredients: [ri('zucchini', 150), ri('tomato', 130)], seasoning: 'Basilikum, Oregano und Pfeffer', note: 'Italienisch inspiriert und saftig.', tags: ['Italienisch inspiriert'] },
  { name: 'Karotte-Erbse', ingredients: [ri('carrot', 120), ri('peas', 90)], seasoning: 'Petersilie, Muskat und Pfeffer', note: 'Mild, leicht süßlich und familienfreundlich.', tags: ['Mild'] },
  { name: 'Gurke-Paprika-Dill', ingredients: [ri('cucumber', 130), ri('pepper', 120), ri('lemon', 18)], seasoning: 'Dill, Zitrone und Pfeffer', note: 'Nordisch inspiriert und besonders frisch.', tags: ['Nordisch inspiriert'] },
  { name: 'Spinat-Pilz', ingredients: [ri('spinach', 100), ri('mushroom', 140)], seasoning: 'Knoblauch, Thymian und Pfeffer', note: 'Herzhaft mit viel Volumen.', tags: ['High Volume'] },
]

export const worldVegProfilesA: ExpansionVariant[] = [
  { name: 'Mediterrane Kräuter', ingredients: [ri('tomato', 150), ri('zucchini', 130), ri('lemon', 20)], seasoning: 'Oregano, Basilikum, Knoblauch und Zitrone', tags: ['Mediterran'] },
  { name: 'Smoky Mexico', ingredients: [ri('pepper', 140), ri('kidneyBeans', 60), ri('onion', 40)], seasoning: 'Kreuzkümmel, geräuchertem Paprika und Chili', tags: ['Mexikanisch inspiriert'] },
  { name: 'Curry-Spinat', ingredients: [ri('spinach', 110), ri('peas', 90), ri('onion', 35)], seasoning: 'Curry, Kurkuma, Ingwer und Pfeffer', tags: ['Indisch inspiriert'] },
  { name: 'Sesam-Gemüse', ingredients: [ri('broccoli', 130), ri('carrot', 100), ri('mushroom', 90)], seasoning: 'Ingwer, Knoblauch und geröstetem Sesamgewürz', tags: ['Asiatisch inspiriert'] },
  { name: 'Za’atar-Zitrone', ingredients: [ri('cucumber', 120), ri('tomato', 130), ri('lemon', 25)], seasoning: 'Za’atar, Minze und Zitrone', tags: ['Nahöstlich inspiriert'] },
]

export const worldVegProfilesB: ExpansionVariant[] = [
  { name: 'Tomate-Basilikum', ingredients: [ri('tomato', 180), ri('spinach', 80)], seasoning: 'Basilikum, Knoblauch und Pfeffer', tags: ['Italienisch inspiriert'] },
  { name: 'Griechische Gurke', ingredients: [ri('cucumber', 150), ri('pepper', 110), ri('lemon', 20)], seasoning: 'Dill, Oregano und Zitrone', tags: ['Griechisch inspiriert'] },
  { name: 'Marokkanische Karotte', ingredients: [ri('carrot', 140), ri('chickpeas', 55), ri('onion', 35)], seasoning: 'Kreuzkümmel, Zimt, Paprika und Zitrone', tags: ['Marokkanisch inspiriert'] },
  { name: 'Nordischer Dill', ingredients: [ri('cucumber', 130), ri('apple', 70), ri('lemon', 20)], seasoning: 'Dill, Senfgewürz und Zitrone', tags: ['Nordisch inspiriert'] },
  { name: 'Rustikale Pilze', ingredients: [ri('mushroom', 170), ri('onion', 45), ri('spinach', 70)], seasoning: 'Thymian, Knoblauch und Pfeffer', tags: ['Rustikal'] },
]

export const leanProteinProfiles: ExpansionVariant[] = [
  { name: 'Hähnchen-Kräuter', ingredients: [ri('chicken', 150), ri('tomato', 130), ri('cucumber', 100)], seasoning: 'Zitrone, Oregano und Petersilie', tags: ['Hähnchen'] },
  { name: 'Pute-Paprika', ingredients: [ri('turkey', 165), ri('pepper', 150), ri('onion', 35)], seasoning: 'Paprika, Kreuzkümmel und Chili', tags: ['Pute'] },
  { name: 'Thunfisch-Dill', ingredients: [ri('tuna', 150), ri('cucumber', 130), ri('lemon', 20)], seasoning: 'Dill, Zitrone und Pfeffer', tags: ['Thunfisch'] },
  { name: 'Kabeljau-Curry', ingredients: [ri('cod', 190), ri('spinach', 110), ri('peas', 90)], seasoning: 'Curry, Kurkuma und Ingwer', tags: ['Fisch'] },
  { name: 'Garnelen-Ingwer', ingredients: [ri('shrimp', 170), ri('broccoli', 140), ri('carrot', 100)], seasoning: 'Ingwer, Knoblauch und Chili', tags: ['Garnelen'] },
]

export const proteinProfilesB: ExpansionVariant[] = [
  { name: 'Lachs-Zitrone', ingredients: [ri('salmon', 135), ri('broccoli', 150), ri('lemon', 20)], seasoning: 'Dill, Zitrone und Pfeffer', tags: ['Lachs'] },
  { name: 'Rind-Pilz', ingredients: [ri('beef', 145), ri('mushroom', 160), ri('onion', 40)], seasoning: 'Thymian, Knoblauch und Pfeffer', tags: ['Rind'] },
  { name: 'Tofu-Sesam', ingredients: [ri('tofu', 180), ri('broccoli', 130), ri('carrot', 100)], seasoning: 'Ingwer, Knoblauch und Sesamgewürz', tags: ['Vegan'] },
  { name: 'Hähnchen-Za’atar', ingredients: [ri('chicken', 150), ri('tomato', 140), ri('cucumber', 100)], seasoning: 'Za’atar, Minze und Zitrone', tags: ['Nahöstlich inspiriert'] },
  { name: 'Pute-Curry', ingredients: [ri('turkey', 160), ri('spinach', 100), ri('peas', 90)], seasoning: 'Curry, Kurkuma und Ingwer', tags: ['Curry'] },
]

export const plantProteinProfiles: ExpansionVariant[] = [
  { name: 'Tofu-Sesam', ingredients: [ri('tofu', 180), ri('broccoli', 130), ri('carrot', 90)], seasoning: 'Ingwer, Knoblauch und Sesamgewürz', tags: ['Vegan'] },
  { name: 'Linsen-Curry', ingredients: [ri('lentils', 180), ri('spinach', 100), ri('onion', 35)], seasoning: 'Curry, Kurkuma und Kreuzkümmel', tags: ['Vegan'] },
  { name: 'Kichererbse-Za’atar', ingredients: [ri('chickpeas', 165), ri('tomato', 130), ri('cucumber', 100)], seasoning: 'Za’atar, Minze und Zitrone', tags: ['Vegan'] },
  { name: 'Bohne-Smoky', ingredients: [ri('kidneyBeans', 180), ri('pepper', 130), ri('onion', 40)], seasoning: 'geräuchertem Paprika, Kreuzkümmel und Chili', tags: ['Vegan'] },
  { name: 'Ei-Spinat', ingredients: [ri('egg', 100), ri('eggWhite', 150), ri('spinach', 110), ri('tomato', 100)], seasoning: 'Muskat, Pfeffer und Kräutern', tags: ['Vegetarisch'] },
]
