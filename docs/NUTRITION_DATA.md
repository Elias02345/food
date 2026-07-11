# Methodik der Nährwertdaten

MacroKitchen speichert für jede verwendete Grundzutat Referenzwerte je 100 g und berechnet daraus jede Rezeptportion. Die Berechnung ist reproduzierbar und befindet sich in `src/lib/nutrition.ts`.

## Primäre Datenquelle

Die Werte wurden anhand generischer Lebensmittelprofile aus USDA FoodData Central zusammengestellt und auf eine für deutsche Zutaten verständliche Bezeichnung vereinheitlicht.

Quelle: U.S. Department of Agriculture, Agricultural Research Service, FoodData Central.

https://fdc.nal.usda.gov/

FoodData Central stellt die Daten öffentlich unter CC0 bereit. Das Projekt speichert bewusst keine geheimen API-Schlüssel und benötigt zur Laufzeit keine externe Ernährungs-API.

## Genauigkeit

Die Werte sind Näherungen. Abweichungen entstehen unter anderem durch:

1. unterschiedliche Marken und Sorten
2. Rohgewicht gegenüber gegartem Gewicht
3. Wasserverlust oder Wasseraufnahme beim Garen
4. Fettgehalt einzelner Fleisch- und Milchprodukte
5. Rundung der Portionsmengen

Die App ist ein Planungswerkzeug und keine medizinische oder ernährungstherapeutische Anwendung.

## Whole-Food-Regel

Die eingebaute Datenbank nutzt überwiegend unverarbeitete oder nur minimal verarbeitete Grundzutaten, etwa Gemüse, Obst, Kartoffeln, Reis, Hafer, Hülsenfrüchte, Eier, Naturmilchprodukte, unverarbeitetes Fleisch, Fisch, Tofu, Nüsse und Saaten. Gewürze werden nicht einzeln bilanziert, weil ihre verwendeten Mengen im Alltag sehr klein und stark individuell sind.
