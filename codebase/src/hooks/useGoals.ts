import { useData } from './useData'

export const useGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useData()

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  }
}
