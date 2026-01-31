import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Category } from '../types/category'
import type { Goal } from '../types/goal'
import type { Task } from '../types/task'
import * as taskService from '../services/taskService'
import * as goalService from '../services/goalService'
import * as categoryService from '../services/categoryService'

interface DataContextValue {
  tasks: Task[]
  goals: Goal[]
  categories: Category[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void
  updateGoal: (goal: Goal) => void
  deleteGoal: (id: string) => void
  addCategory: (name: string, color: string) => void
  removeCategory: (id: string) => void
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => taskService.getTasks())
  const [goals, setGoals] = useState<Goal[]>(() => goalService.getGoals())
  const [categories, setCategories] = useState<Category[]>(() => categoryService.getCategories())

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks(taskService.createTask(task))
  }

  const updateTask = (task: Task) => {
    setTasks(taskService.updateTask(task))
  }

  const deleteTask = (id: string) => {
    setTasks(taskService.deleteTask(id))
  }

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    setGoals(goalService.createGoal(goal))
  }

  const updateGoal = (goal: Goal) => {
    setGoals(goalService.updateGoal(goal))
  }

  const deleteGoal = (id: string) => {
    setGoals(goalService.deleteGoal(id))
  }

  const addCategory = (name: string, color: string) => {
    setCategories(categoryService.createCategory(name, color))
  }

  const removeCategory = (id: string) => {
    setCategories(categoryService.deleteCategory(id))
  }

  const value = useMemo(
    () => ({
      tasks,
      goals,
      categories,
      addTask,
      updateTask,
      deleteTask,
      addGoal,
      updateGoal,
      deleteGoal,
      addCategory,
      removeCategory,
    }),
    [tasks, goals, categories],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
