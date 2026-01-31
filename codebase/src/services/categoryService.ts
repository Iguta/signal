import type { Category } from '../types/category'
import { createId } from '../utils/id'
import { loadFromStorage, saveToStorage } from './storage'

const STORAGE_KEY = 'signal.categories'

const seedCategories: Category[] = [
  { id: createId(), name: 'Personal', color: '#7C8AFB' },
  { id: createId(), name: 'Health', color: '#7DE2D1' },
  { id: createId(), name: 'Work', color: '#F7A8B8' },
]

const ensureSeed = (categories: Category[]) => {
  if (categories.length > 0) return categories
  saveToStorage(STORAGE_KEY, seedCategories)
  return seedCategories
}

export const getCategories = () => ensureSeed(loadFromStorage<Category[]>(STORAGE_KEY, []))

export const saveCategories = (categories: Category[]) => saveToStorage(STORAGE_KEY, categories)

export const createCategory = (name: string, color: string) => {
  const categories = getCategories()
  const category: Category = { id: createId(), name, color }
  const updated = [category, ...categories]
  saveCategories(updated)
  return updated
}

export const deleteCategory = (id: string) => {
  const categories = getCategories()
  const updated = categories.filter((category) => category.id !== id)
  saveCategories(updated)
  return updated
}
