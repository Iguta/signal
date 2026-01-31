import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './testUtils'

beforeEach(() => {
  localStorage.clear()
})

describe('Task management', () => {
  it('adds a new task from the tasks page', async () => {
    renderApp('/tasks')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /new task/i }))
    await user.type(screen.getByLabelText(/title/i), 'Draft strategy memo')
    await user.type(screen.getByLabelText(/description/i), 'Outline the Q2 focus areas.')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(await screen.findByText('Draft strategy memo')).toBeInTheDocument()
  })
})
