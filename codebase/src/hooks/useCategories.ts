import { useData } from './useData'

export const useCategories = () => {
  const { categories, addCategory, removeCategory } = useData()

  return {
    categories,
    addCategory,
    removeCategory,
  }
}
