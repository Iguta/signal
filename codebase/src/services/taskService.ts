import type { Task } from '../types/task'
import { createId } from '../utils/id'
import { loadFromStorage, saveToStorage } from './storage'

const STORAGE_KEY = 'signal.tasks'

const seedTasks: Task[] = [
  {
    id: createId(),
    title: 'Plan weekly priorities',
    description: 'Define the top three outcomes for the week.',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: createId(),
    title: 'Refine monthly goals',
    description: 'Update progress and align with calendar milestones.',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: createId(),
    title: 'Schedule focus block',
    description: 'Reserve a 2-hour deep work session in the calendar.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .split('T')[0],
    priority: 'low',
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

const ensureSeed = (tasks: Task[]) => {
  if (tasks.length > 0) return tasks
  saveToStorage(STORAGE_KEY, seedTasks)
  return seedTasks
}

export const getTasks = () => ensureSeed(loadFromStorage<Task[]>(STORAGE_KEY, []))

export const saveTasks = (tasks: Task[]) => saveToStorage(STORAGE_KEY, tasks)

export const createTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
  const tasks = getTasks()
  const task: Task = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
  }
  const updated = [task, ...tasks]
  saveTasks(updated)
  return updated
}

export const updateTask = (updatedTask: Task) => {
  const tasks = getTasks()
  const updated = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  saveTasks(updated)
  return updated
}

export const deleteTask = (id: string) => {
  const tasks = getTasks()
  const updated = tasks.filter((task) => task.id !== id)
  saveTasks(updated)
  return updated
}
