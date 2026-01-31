import { useEffect, useState, type FormEvent } from 'react'
import type { Goal, GoalType } from '../types/goal'
import type { Category } from '../types/category'

interface GoalFormModalProps {
  isOpen: boolean
  categories: Category[]
  initialGoal?: Goal | null
  onClose: () => void
  onSave: (goal: Omit<Goal, 'id' | 'createdAt'>, existingId?: string) => void
}

const goalTypes: GoalType[] = ['yearly', 'monthly', 'daily']

export const GoalFormModal = ({
  isOpen,
  categories,
  initialGoal,
  onClose,
  onSave,
}: GoalFormModalProps) => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<GoalType>('monthly')
  const [targetDate, setTargetDate] = useState('')
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title)
      setType(initialGoal.type)
      setTargetDate(initialGoal.targetDate)
      setCategoryId(initialGoal.categoryId)
    } else {
      setTitle('')
      setType('monthly')
      setTargetDate(new Date().toISOString().split('T')[0])
      setCategoryId(undefined)
    }
  }, [initialGoal, isOpen])

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSave(
      {
        title,
        type,
        targetDate,
        categoryId,
        completed: initialGoal?.completed ?? false,
      },
      initialGoal?.id,
    )
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal">
        <div className="modal-header">
          <h2>{initialGoal ? 'Edit Goal' : 'New Goal'}</h2>
          <button className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Goal title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>
          <div className="modal-row">
            <label>
              Type
              <select value={type} onChange={(event) => setType(event.target.value as GoalType)}>
                {goalTypes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Target date
              <input
                type="date"
                value={targetDate}
                onChange={(event) => setTargetDate(event.target.value)}
                required
              />
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
              Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
