import { useEffect, useState } from 'react'

export const usePersistentState = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) as T : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export const exportLocalData = () => {
  const payload: Record<string, unknown> = {}
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (key?.startsWith('macroKitchen.')) {
      try {
        payload[key] = JSON.parse(localStorage.getItem(key) ?? 'null')
      } catch {
        payload[key] = localStorage.getItem(key)
      }
    }
  }
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data: payload }, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `macrokitchen-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(link.href)
}

export const importLocalData = async (file: File) => {
  const parsed = JSON.parse(await file.text()) as { data?: Record<string, unknown> }
  if (!parsed.data || typeof parsed.data !== 'object') throw new Error('Ungültige Sicherungsdatei')
  Object.entries(parsed.data).forEach(([key, value]) => {
    if (key.startsWith('macroKitchen.')) localStorage.setItem(key, JSON.stringify(value))
  })
}
