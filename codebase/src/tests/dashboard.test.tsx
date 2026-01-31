import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderApp } from './testUtils'

beforeEach(() => {
  localStorage.clear()
})

describe('Progress tracking dashboard', () => {
  it('shows progress panels for key timeframes', () => {
    renderApp('/')

    expect(screen.getAllByText(/today/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/this week/i)).toBeInTheDocument()
    expect(screen.getByText(/this month/i)).toBeInTheDocument()
    expect(screen.getByText(/this year/i)).toBeInTheDocument()
  })
})
