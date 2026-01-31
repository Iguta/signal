import type { Goal } from '../types/goal'
import { createId } from '../utils/id'
import { loadFromStorage, saveToStorage } from './storage'

const STORAGE_KEY = 'signal.goals'

const seedGoals: Goal[] = [
  {
    id: createId(),
    title: 'Run a 10K this year',
    type: 'yearly',
    targetDate: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: createId(),
    title: 'Finish two books',
    type: 'monthly',
    targetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: createId(),
    title: 'Hydrate consistently',
    type: 'daily',
    targetDate: new Date().toISOString().split('T')[0],
    completed: true,
    createdAt: new Date().toISOString(),
  },
]

const ensureSeed = (goals: Goal[]) => {
  if (goals.length > 0) return goals
  saveToStorage(STORAGE_KEY, seedGoals)
  return seedGoals
}

export const getGoals = () => ensureSeed(loadFromStorage<Goal[]>(STORAGE_KEY, []))

export const saveGoals = (goals: Goal[]) => saveToStorage(STORAGE_KEY, goals)

export const createGoal = (data: Omit<Goal, 'id' | 'createdAt'>) => {
  const goals = getGoals()
  const goal: Goal = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
  }
  const updated = [goal, ...goals]
  saveGoals(updated)
  return updated
}

export const updateGoal = (updatedGoal: Goal) => {
  const goals = getGoals()
  const updated = goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
  saveGoals(updated)
  return updated
}

export const deleteGoal = (id: string) => {
  const goals = getGoals()
  const updated = goals.filter((goal) => goal.id !== id)
  saveGoals(updated)
  return updated
}
