import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './testUtils'

beforeEach(() => {
  localStorage.clear()
})

describe('Calendar view', () => {
  it('adds a task from the calendar view and shows it for the day', async () => {
    renderApp('/calendar')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /add task/i }))
    await user.type(screen.getByLabelText(/title/i), 'Review sprint plan')
    await user.type(screen.getByLabelText(/description/i), 'Align tasks to calendar.')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(await screen.findByText('Review sprint plan')).toBeInTheDocument()
  })
})
