# MacroKitchen

Eine installierbare, local-first Web-App für proteinreiche Whole-Food-Rezepte. MacroKitchen enthält **725 berechnete Rezepte**, einen Makro-Finder mit frei wählbaren Mahlzeitenanteilen, kombinierte Rezeptvorschläge, eine Einkaufsliste, Vorratsverwaltung, Wochenplanung und einen ablenkungsfreien Kochmodus.

## Live-Version

Nach der ersten erfolgreichen GitHub-Pages-Ausführung ist die App normalerweise hier erreichbar:

`https://elias02345.github.io/food/`

Falls GitHub Pages im Repository noch nicht aktiviert ist, unter **Settings → Pages → Source** die Option **GitHub Actions** auswählen. Der Workflow `.github/workflows/pages.yml` übernimmt danach den Build und das Deployment.

## Funktionen

1. **725 Rezepte** mit exakt 145 Einträgen pro Kategorie
   1. Frühstück
   2. Mittagessen
   3. Pre-Workout
   4. Abendessen
   5. Snacks
2. Automatisch berechnete Kalorien, Protein, Kohlenhydrate, Fett und Ballaststoffe
3. Recipe Finder mit frei wählbarem Anteil des offenen Tagesziels
4. Mahlzeiten-Presets für Frühstück, Mittagessen, Pre-Workout, Abendessen und Snacks
5. Manuelle Korrektur einzelner Makros nach der gemeinsamen Prozent-Skalierung
6. Saubere Zahlenfelder, die beim Tippen leer bleiben dürfen und keine führenden Nullen erzeugen
7. Automatische Portionsskalierung zwischen 50 und 250 Prozent
8. Kombination von zwei kleineren Rezepten für schwer erreichbare Teilziele
9. Filter nach Kategorie, Zeit, Küche, vegetarisch, transportierbar und vorhandenen Zutaten
10. Browser mit Suche, Favoriten, Küchenfilter, Nährwertfiltern und schrittweisem Laden
11. Wochenplan mit frei konfigurierbarer Mahlzeitenverteilung
12. Einkaufsliste mit Zusammenführung gleicher Zutaten
13. Pantry-Modus zur Resteverwertung
14. Guided Cooking mit einzelnen Schritten, Zutaten-Checkliste, Timern und Wake Lock
15. Tagesfortschritt mit automatischem Reset bei einem neuen Kalendertag
16. JSON-Export und -Import aller lokalen Daten
17. Dunkles und helles Design
18. PWA-Installation mit aktualisierendem Offline-Cache
19. Responsive Layout für Handy, Tablet und Desktop
20. Docker- und GitHub-Pages-Deployment

## Mahlzeitenverteilung

In den Einstellungen lassen sich Prozentwerte für Frühstück, Mittagessen, Pre-Workout, Abendessen und Snacks festlegen. Diese Werte werden im Recipe Finder als schnelle Presets verwendet. Der Wochenplan normalisiert die Verteilung automatisch auf 100 Prozent, sodass auch vorübergehend noch nicht vollständig ausgeglichene Eingaben sicher verarbeitet werden.

## Rezeptvielfalt

Die Datenbank enthält bewährte Formate wie Overnight Oats, Quark- und Skyr-Bowls, herzhafte Frühstückspfannen, Salate, Lunchboxen, Bowls, One-Pot-Gerichte, Suppen, Eintöpfe, Blechgerichte und proteinreiche Snacks. Die Erweiterung ergänzt mediterrane, mexikanische, indische, asiatische, nahöstliche, nordische, griechische, italienische und marokkanische Geschmacksrichtungen.

Die Online-Recherche, Entwicklungsgrundsätze und Quellen sind in [`docs/RECIPE_RESEARCH.md`](docs/RECIPE_RESEARCH.md) dokumentiert. Die Rezepte sind eigenständig entwickelt und nicht aus einzelnen Webseiten kopiert.

## Lokale Entwicklung

Voraussetzungen:

1. Node.js 22 oder neuer
2. npm 10 oder neuer

```bash
npm install
npm run dev
```

Die Entwicklungsseite läuft anschließend standardmäßig unter `http://localhost:5173`.

## Qualitätsprüfung

```bash
npm run check
```

Der Befehl führt ESLint, automatisierte Eingabe-, Zielverteilungs-, Datensatz-, Diversitäts- und Matcher-Tests sowie den Produktions-Build aus.

## Produktions-Build

```bash
npm run build
npm run preview
```

Die fertige statische App liegt in `dist/`.

## Docker

```bash
docker compose up -d --build
```

Danach ist MacroKitchen unter `http://localhost:8080` erreichbar.

## Projektstruktur

```text
src/
  components/
    SmartNumberInput.tsx     fehlertolerante Zahlenfelder
  data/
    ingredients.ts           Referenzwerte der Zutaten
    recipes.ts               zusammengeführte Rezeptdatenbank
    expandedRecipes.ts       Einstiegspunkt der 500-Rezepte-Erweiterung
    expandedBreakfast.ts     100 neue Frühstücke
    expandedLunch.ts         100 neue Mittagessen
    expandedPreWorkout.ts    100 neue Pre-Workout-Gerichte
    expandedDinner.ts        100 neue Abendessen
    expandedSnacks.ts        100 neue Snacks
    expansionFactory.ts      geprüfte Rezeptfamilien-Erzeugung
    expansionProfiles.ts     kuratierte Geschmacks- und Zutatenprofile
  lib/
    matcher.ts               Makro-Matching und Rezeptkombinationen
    nutrition.ts             Nährwertberechnung und Skalierung
    storage.ts               lokale Speicherung und Backup
  App.tsx                    Benutzeroberfläche und alle Workflows
  appShared.ts               Mahlzeitenverteilung und gemeinsame Berechnungen
  styles.css                 responsives Designsystem
public/
  manifest.webmanifest       PWA-Metadaten
  sw.js                      Offline- und Update-Cache
.github/workflows/
  ci.yml                     Lint, Tests und Build
  pages.yml                  GitHub-Pages-Deployment
docs/
  NUTRITION_DATA.md          Nährwertmethodik
  RECIPE_RESEARCH.md         Recherche und Rezeptentwicklung
```

## Daten und Datenschutz

MacroKitchen benötigt kein Konto und keinen externen Backend-Dienst. Ziele, Mahlzeitenverteilung, Favoriten, Wochenplan, Einkaufsliste und Vorräte werden im `localStorage` des jeweiligen Browsers gespeichert. Über die Einstellungen können diese Daten exportiert und später wieder importiert werden.

Die App sendet keine Ernährungsdaten an einen Server. Nach dem ersten Laden kann sie weitgehend offline verwendet werden.

## Nährwertmethodik

Die Rezeptwerte werden aus hinterlegten Referenzwerten pro 100 g berechnet. Grundlage sind generische Lebensmittelprofile aus **USDA FoodData Central**. Details und Einschränkungen stehen in [`docs/NUTRITION_DATA.md`](docs/NUTRITION_DATA.md).

Die Werte sind Näherungen und ersetzen keine medizinische oder ernährungstherapeutische Beratung.

## Lizenz

MIT
