# MacroKitchen

Eine installierbare, local-first Web-App für proteinreiche Whole-Food-Rezepte. MacroKitchen enthält **225 berechnete Rezepte**, einen Makro-Finder mit automatischer Portionsskalierung, kombinierte Rezeptvorschläge, eine Einkaufsliste, Vorratsverwaltung, Wochenplanung und einen ablenkungsfreien Kochmodus.

## Live-Version

Nach der ersten erfolgreichen GitHub-Pages-Ausführung ist die App normalerweise hier erreichbar:

`https://elias02345.github.io/food/`

Falls GitHub Pages im Repository noch nicht aktiviert ist, unter **Settings → Pages → Source** die Option **GitHub Actions** auswählen. Der Workflow `.github/workflows/pages.yml` übernimmt danach den Build und das Deployment.

## Funktionen

1. **225 Rezepte** mit exakt 45 Einträgen pro Kategorie
2. Automatisch berechnete Kalorien, Protein, Kohlenhydrate, Fett und Ballaststoffe
3. Recipe Finder mit automatischer Portionsskalierung und Rezeptkombinationen
4. Rezeptbrowser, Favoriten, Wochenplan, Einkaufsliste und Pantry-Modus
5. Guided Cooking mit Zutaten-Checkliste, Timern und Wake Lock
6. PWA-Installation, Offline-Cache, helles und dunkles Design
7. Docker- und GitHub-Pages-Deployment

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Qualitätsprüfung

```bash
npm run check
```

## Docker

```bash
docker compose up -d --build
```

Danach ist MacroKitchen unter `http://localhost:8080` erreichbar.

## Datenschutz

Die App benötigt kein Konto. Ziele, Favoriten, Wochenplan, Einkaufsliste und Vorräte werden lokal im Browser gespeichert und können als JSON exportiert werden.

## Nährwertmethodik

Die Rezeptwerte werden aus Referenzwerten pro 100 g berechnet. Grundlage sind generische Lebensmittelprofile aus USDA FoodData Central. Die Werte sind Näherungen und ersetzen keine medizinische oder ernährungstherapeutische Beratung.

## Lizenz

MIT
