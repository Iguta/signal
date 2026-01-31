import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './testUtils'

beforeEach(() => {
  localStorage.clear()
})

describe('Goal management', () => {
  it('adds a new monthly goal', async () => {
    renderApp('/goals')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /new goal/i }))
    await user.type(screen.getByLabelText(/goal title/i), 'Publish two essays')
    await user.selectOptions(screen.getByLabelText(/type/i), 'monthly')
    await user.click(screen.getByRole('button', { name: /save goal/i }))

    expect(await screen.findByText('Publish two essays')).toBeInTheDocument()
  })
})
