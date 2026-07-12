import { useEffect, useRef, useState } from 'react'

type SmartNumberInputProps = {
  value: number
  onChange: (value: number) => void
  ariaLabel: string
  min?: number
  max?: number
  step?: number
  className?: string
}

const formatValue = (value: number) => {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : String(rounded)
}

const cleanDraft = (draft: string) => {
  if (draft === '') return ''
  const separator = draft.includes(',') ? ',' : draft.includes('.') ? '.' : ''
  const [integerPart = '', decimalPart] = separator ? draft.split(separator) : [draft]
  const cleanedInteger = integerPart.replace(/^0+(?=\d)/, '')
  if (!separator) return cleanedInteger || '0'
  return `${cleanedInteger || '0'}${separator}${decimalPart ?? ''}`
}

export function SmartNumberInput({ value, onChange, ariaLabel, min = 0, max = Number.POSITIVE_INFINITY, step = 1, className }: SmartNumberInputProps) {
  const [draft, setDraft] = useState(() => formatValue(value))
  const focused = useRef(false)

  useEffect(() => {
    if (!focused.current) setDraft(formatValue(value))
  }, [value])

  const commit = () => {
    focused.current = false
    const normalized = draft.trim().replace(',', '.')
    const parsed = normalized === '' ? min : Number(normalized)
    const safeValue = Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : value
    const stepped = step >= 1 ? Math.round(safeValue / step) * step : Math.round(safeValue * 10) / 10
    onChange(stepped)
    setDraft(formatValue(stepped))
  }

  return (
    <input
      className={className}
      type="text"
      inputMode={step < 1 ? 'decimal' : 'numeric'}
      aria-label={ariaLabel}
      value={draft}
      onFocus={(event) => {
        focused.current = true
        event.currentTarget.select()
      }}
      onChange={(event) => {
        const next = event.target.value
        if (/^\d*(?:[.,]\d*)?$/.test(next)) setDraft(cleanDraft(next))
      }}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') event.currentTarget.blur()
        if (event.key === 'Escape') {
          setDraft(formatValue(value))
          event.currentTarget.blur()
        }
      }}
    />
  )
}
