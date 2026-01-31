import { useEffect, useState, type FormEvent } from 'react'
import type { Task, TaskPriority } from '../types/task'
import type { Category } from '../types/category'

interface TaskFormModalProps {
  isOpen: boolean
  categories: Category[]
  initialTask?: Task | null
  defaultDueDate?: string
  onClose: () => void
  onSave: (task: Omit<Task, 'id' | 'createdAt'>, existingId?: string) => void
}

const priorities: TaskPriority[] = ['low', 'medium', 'high']

export const TaskFormModal = ({
  isOpen,
  categories,
  initialTask,
  defaultDueDate,
  onClose,
  onSave,
}: TaskFormModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description)
      setDueDate(initialTask.dueDate)
      setPriority(initialTask.priority)
      setCategoryId(initialTask.categoryId)
    } else {
      setTitle('')
      setDescription('')
      setDueDate(defaultDueDate ?? new Date().toISOString().split('T')[0])
      setPriority('medium')
      setCategoryId(undefined)
    }
  }, [initialTask, isOpen, defaultDueDate])

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSave(
      {
        title,
        description,
        dueDate,
        priority,
        categoryId,
        completed: initialTask?.completed ?? false,
      },
      initialTask?.id,
    )
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal">
        <div className="modal-header">
          <h2>{initialTask ? 'Edit Task' : 'New Task'}</h2>
          <button className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
          </label>
          <div className="modal-row">
            <label>
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                required
              />
            </label>
            <label>
              Priority
              <select value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>
                {priorities.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Category
            <select value={categoryId ?? ''} onChange={(event) => setCategoryId(event.target.value || undefined)}>
              <option value="">None</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="primary-button">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
