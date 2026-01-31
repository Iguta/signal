import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './testUtils'

beforeEach(() => {
  localStorage.clear()
})

describe('Task search', () => {
  it('filters tasks using the global search bar', async () => {
    renderApp('/tasks')
    const user = userEvent.setup()

    await user.type(screen.getByRole('searchbox', { name: /search tasks/i }), 'weekly')

    expect(await screen.findByText(/plan weekly priorities/i)).toBeInTheDocument()
  })
})
