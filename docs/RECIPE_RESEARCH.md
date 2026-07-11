# Recherche und Entwicklung der Rezepterweiterung

Stand: 11. Juli 2026

MacroKitchen 1.1 erweitert die ursprüngliche Datenbank um 500 neue, selbst entwickelte Rezepte. Die Rezepte wurden nicht aus einzelnen Webseiten kopiert. Stattdessen wurden bewährte Gerichtsmuster, Zubereitungsarten und Zutatenkombinationen aus mehreren Quellen analysiert und anschließend als eigenständige Whole-Food-Rezepte mit neuen Mengen, Anleitungen und berechneten Nährwerten umgesetzt.

## Beobachtete Erfolgsprinzipien

1. Proteinreiche Mahlzeiten funktionieren besonders zuverlässig als Bowls, Pfannengerichte, Blechgerichte, Suppen, Eintöpfe, Salate und vorbereitete Frühstücksgläser.
2. Lean Protein, Hülsenfrüchte, Vollkornbeilagen und viel Gemüse verbessern Sättigung und Nährstoffdichte.
3. Skyr, Magerquark, körniger Frischkäse, Eier und Eiklar ermöglichen einfache Frühstücke und Snacks ohne Proteinpulver.
4. Kalte Lunchboxen, Overnight-Gerichte und Schichtsalate eignen sich gut für Meal Prep und unterwegs.
5. Internationale Gewürzprofile erzeugen Abwechslung, ohne komplizierte Zutatenlisten zu benötigen.
6. Die Rezepte bleiben bei drei klaren Arbeitsschritten, wenigen Küchengeräten und kurzen aktiven Zubereitungszeiten.

## Verwendete Inspirationsquellen

### EatingWell

Analysierte Muster:

1. proteinreiche Make-ahead-Mahlzeiten mit Overnight Oats, Eieraufläufen, Pasta-Salaten, Hähnchen und Kichererbsen
2. kalorienbewusste Lunches mit Hähnchen, Thunfisch, Lachs, Bohnen, Quinoa und frischem Gemüse
3. One-Pot-Gerichte mit Bohnen, Kichererbsen, Tofu und ballaststoffreichen Zutaten
4. Snacks aus gerösteten Hülsenfrüchten, Dips und einfachen Joghurt- oder Cottage-Cheese-Basen
5. diabetesfreundliche Hähnchengerichte mit Vollkornprodukten, Hülsenfrüchten und Gemüse

Quellen:

https://www.eatingwell.com/make-ahead-high-protein-recipes-12010867
https://www.eatingwell.com/gallery/8052571/high-protein-low-calorie-lunches-summer/
https://www.eatingwell.com/no-sugar-lunch-recipes-for-weight-loss-12013895
https://www.eatingwell.com/one-pot-gut-healthy-dinner-recipes-12013892
https://www.eatingwell.com/low-sugar-diabetes-friendly-snack-recipes-12013803
https://www.eatingwell.com/highly-rated-diabetes-friendly-chicken-dinner-recipes-11988250

### Verywell Health

Analysierte Muster:

1. Hähnchen, Thunfisch, griechischer Joghurt, Cottage Cheese, Bohnen, Quinoa und Eier als unkomplizierte Proteinbausteine
2. kombinierbare Salate, Bowls und Lunchboxen statt verarbeiteter Aufschnittprodukte

Quelle:

https://www.verywellhealth.com/high-protein-lunch-foods-11962399

### Fit&Well und Real Simple

Analysierte Muster:

1. Kräuter-Joghurt-Hähnchen, Lachs-Kartoffel-Gerichte und frische Salsa-Kombinationen
2. Kabeljau mit Gewürzen, Tofu-Reis-Gerichte, Linsensuppen und gefüllte Süßkartoffeln
3. mehr Gemüse und Hülsenfrüchte bei weiterhin einfacher Zubereitung

Quellen:

https://www.fitandwell.com/nutrition/em-the-nutritionist-recipes/
https://www.realsimple.com/recipes-for-longevity-12006169

### Schnelle internationale Gerichte

Die Struktur einfacher 15-Minuten-Gerichte wurde als Inspiration für internationale Profile genutzt, etwa mediterran, mexikanisch, indisch, nordisch, nahöstlich und asiatisch inspiriert. Es wurden keine Originalrezepte oder Originaltexte übernommen.

Referenz:

https://en.wikipedia.org/wiki/Jamie%27s_15-Minute_Meals

## Eigene Entwicklung

Die 500 neuen Rezepte wurden als 100 eigenständige Rezeptfamilien mit jeweils fünf kuratierten Varianten entwickelt. Dadurch entstehen:

1. 100 neue Frühstücke
2. 100 neue Mittagessen
3. 100 neue Pre-Workout-Gerichte
4. 100 neue Abendessen
5. 100 neue Snacks

Die Varianten unterscheiden sich in Hauptzutaten, Gemüseprofil, Gewürzrichtung, Zubereitungsart und Nährwertverteilung. Die Generatoren prüfen, dass jede Familie genau fünf Varianten erzeugt.

## Qualitätsergebnisse der Erweiterung

1. 500 neue Rezepte insgesamt
2. 100 neue Rezepte pro Kategorie
3. 462 unterschiedliche Zutaten-Signaturen
4. 406 Rezepte mit mindestens 30 g Protein
5. 318 Rezepte mit höchstens 500 kcal
6. 255 Rezepte mit maximal 15 Minuten Gesamtzeit
7. 460 transportierbare Rezepte
8. durchschnittlich rund 459 kcal und 41,4 g Protein
9. maximale Portionsgröße der Erweiterung unter 700 kcal

## Nährwertberechnung

Wie bei der ursprünglichen Datenbank werden die Nährwerte aus den hinterlegten Zutatenwerten pro 100 g berechnet. Die Berechnung erfolgt in `src/lib/nutrition.ts`. Die Zutatenwerte und Einschränkungen sind in `docs/NUTRITION_DATA.md` dokumentiert.

Forschung zur automatisierten Nährwertschätzung zeigt, dass eine Berechnung aus strukturierten Zutaten und Referenzdaten wesentlich zuverlässiger ist als unvollständige oder uneinheitliche Angaben aus Rezeptseiten.

https://arxiv.org/abs/2004.12286
https://arxiv.org/abs/2003.07027
