import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SmartNumberInput } from './SmartNumberInput'

describe('SmartNumberInput', () => {
  it('allows an empty draft before committing a value', () => {
    const onChange = vi.fn()
    render(<SmartNumberInput value={0} onChange={onChange} ariaLabel="Protein" step={0.1} />)

    const input = screen.getByLabelText('Protein')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: '' } })
    expect(input).toHaveValue('')

    fireEvent.change(input, { target: { value: '42,5' } })
    expect(input).toHaveValue('42,5')
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(42.5)
    expect(input).toHaveValue('42.5')
  })

  it('removes accidental leading zeros while typing', () => {
    const onChange = vi.fn()
    render(<SmartNumberInput value={0} onChange={onChange} ariaLabel="Kalorien" />)

    const input = screen.getByLabelText('Kalorien')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: '00500' } })
    expect(input).toHaveValue('500')
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(500)
  })

  it('restores the current value without committing when Escape is pressed', () => {
    const onChange = vi.fn()
    render(<SmartNumberInput value={188} onChange={onChange} ariaLabel="Kohlenhydrate" />)

    const input = screen.getByLabelText('Kohlenhydrate')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: '25' } })
    fireEvent.keyDown(input, { key: 'Escape' })

    expect(input).toHaveValue('188')
    expect(onChange).not.toHaveBeenCalled()
  })
})
