import { useData } from './useData'

export const useTasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useData()

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
