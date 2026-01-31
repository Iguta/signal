import { useMemo, useState } from 'react'
import { TaskCard } from '../components/TaskCard'
import { TaskFormModal } from '../components/TaskFormModal'
import { useCategories } from '../hooks/useCategories'
import { useSearch } from '../hooks/useSearch'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/task'

export const TasksPage = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const { categories } = useCategories()
  const { term } = useSearch()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase())
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesCategory =
        categoryFilter === 'all' || task.categoryId === categoryFilter
      return matchesSearch && matchesPriority && matchesCategory
    })
  }, [tasks, term, priorityFilter, categoryFilter])

  const categoryMap = useMemo(() => {
    return new Map(categories.map((category) => [category.id, category]))
  }, [categories])

  const handleSave = (task: Omit<Task, 'id' | 'createdAt'>, existingId?: string) => {
    if (existingId) {
      updateTask({
        ...task,
        id: existingId,
        createdAt: selectedTask?.createdAt ?? new Date().toISOString(),
      })
    } else {
      addTask(task)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Tasks</h2>
          <p>Capture every commitment and schedule it with clarity.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setSelectedTask(null)
            setIsModalOpen(true)
          }}
        >
          New task
        </button>
      </div>

      <div className="filters">
        <label>
          Priority
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          Category
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="task-grid">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">No tasks match your filters yet.</div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              category={task.categoryId ? categoryMap.get(task.categoryId) : undefined}
              onToggle={updateTask}
              onEdit={(selected) => {
                setSelectedTask(selected)
                setIsModalOpen(true)
              }}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        categories={categories}
        initialTask={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
