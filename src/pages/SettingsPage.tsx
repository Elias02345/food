import { useState } from 'react'
import { Download, Info, Moon, PieChart, RotateCcw, Sun, Target, Upload } from 'lucide-react'
import { exportLocalData, importLocalData } from '../lib/storage'
import type { MacroTarget, MealDistribution, RecipeCategory } from '../types'
import { categoryIcons, defaultMealDistribution, macroFields, mealSlots, rebalanceMealDistribution } from '../appShared'
import { SmartNumberInput } from '../components/SmartNumberInput'

export function SettingsPage({ target, setTarget, distribution, setDistribution, theme, setTheme }: {
  target: MacroTarget
  setTarget: (value: MacroTarget) => void
  distribution: MealDistribution
  setDistribution: (value: MealDistribution) => void
  theme: 'dark' | 'light'
  setTheme: (value: 'dark' | 'light') => void
}) {
  const [message, setMessage] = useState('')
  const totalShare = mealSlots.reduce((sum, slot) => sum + distribution[slot], 0)

  const updateShare = (slot: RecipeCategory, value: number) => setDistribution({ ...distribution, [slot]: Math.min(100, Math.max(0, value)) })

  return (
    <div className="settings-grid">
      <section className="settings-card"><div className="settings-card__head"><Target size={22} /><div><h2>Tägliche Ziele</h2><p>Diese Werte bilden die Grundlage für Dashboard, Finder und Wochenplan.</p></div></div><div className="macro-input-grid">{macroFields.map(({ key, label, short }) => <label key={key}><span>{label}</span><div><SmartNumberInput value={target[key]} ariaLabel={`Tagesziel ${label}`} min={0} step={key === 'calories' ? 1 : 0.1} onChange={(value) => setTarget({ ...target, [key]: value })} /><small>{short}</small></div></label>)}</div></section>

      <section className="settings-card"><div className="settings-card__head"><Sun size={22} /><div><h2>Darstellung</h2><p>Die Auswahl wird auf diesem Gerät gespeichert.</p></div></div><div className="theme-choice"><button className={theme === 'dark' ? 'is-active' : ''} onClick={() => setTheme('dark')}><Moon /><span><b>Dunkel</b><small>Ruhig und kontrastreich</small></span></button><button className={theme === 'light' ? 'is-active' : ''} onClick={() => setTheme('light')}><Sun /><span><b>Hell</b><small>Klar und freundlich</small></span></button></div></section>

      <section className="settings-card settings-card--wide">
        <div className="settings-card__head"><PieChart size={22} /><div><h2>Tagesziel auf Mahlzeiten verteilen</h2><p>Diese Anteile erscheinen als Presets im Recipe Finder und steuern die automatische Wochenplanung.</p></div></div>
        <div className={`distribution-total ${totalShare === 100 ? 'is-valid' : ''}`}><div><span>Gesamte Verteilung</span><b>{totalShare} %</b></div><p>{totalShare === 100 ? 'Der gesamte Tag ist vollständig verteilt.' : 'Die Werte dürfen während der Bearbeitung abweichen. Der Wochenplan normalisiert sie automatisch.'}</p></div>
        <div className="distribution-grid">
          {mealSlots.map((slot) => {
            const Icon = categoryIcons[slot]
            return <div className="distribution-row" key={slot}><div className="distribution-row__head"><Icon size={18} /><span><b>{slot}</b><small>{distribution[slot]} % des Tagesziels</small></span><label className="distribution-number"><SmartNumberInput value={distribution[slot]} ariaLabel={`Anteil ${slot}`} min={0} max={100} onChange={(value) => updateShare(slot, value)} /><small>%</small></label></div><input type="range" min="0" max="60" step="5" value={Math.min(60, distribution[slot])} onChange={(event) => updateShare(slot, Number(event.target.value))} /></div>
          })}
        </div>
        <div className="button-row"><button className="button button--ghost" onClick={() => setDistribution(defaultMealDistribution)}><RotateCcw size={16} /> Standardverteilung</button><button className="button button--primary" onClick={() => setDistribution(rebalanceMealDistribution(distribution))}>Auf 100 % ausgleichen</button></div>
      </section>

      <section className="settings-card"><div className="settings-card__head"><Download size={22} /><div><h2>Daten sichern</h2><p>Favoriten, Vorräte, Planer, Ziele, Verteilung und Einkaufsliste als JSON exportieren.</p></div></div><div className="button-row"><button className="button button--ghost" onClick={exportLocalData}><Download size={16} /> Exportieren</button><label className="button button--ghost"><Upload size={16} /> Importieren<input type="file" accept="application/json" hidden onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { await importLocalData(file); setMessage('Import erfolgreich. Die App wird neu geladen.'); window.setTimeout(() => window.location.reload(), 500) } catch { setMessage('Die Datei konnte nicht importiert werden.') } }} /></label></div>{message && <p className="settings-message">{message}</p>}</section>

      <section className="settings-card"><div className="settings-card__head"><Info size={22} /><div><h2>Nährwert-Hinweis</h2><p>Die App berechnet Rezeptwerte aus hinterlegten Referenzwerten pro 100 g. Tatsächliche Werte hängen von Produkt, Reifegrad, Garverlust und Messgenauigkeit ab. Die App ersetzt keine medizinische oder ernährungstherapeutische Beratung.</p></div></div></section>
    </div>
  )
}
