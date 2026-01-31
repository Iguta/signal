import type { Goal } from '../types/goal'
import type { Category } from '../types/category'
import { formatShortDate } from '../utils/date'

interface GoalCardProps {
  goal: Goal
  category?: Category
  onToggle: (goal: Goal) => void
  onEdit: (goal: Goal) => void
  onDelete: (id: string) => void
}

export const GoalCard = ({ goal, category, onToggle, onEdit, onDelete }: GoalCardProps) => (
  <div className={`goal-card ${goal.completed ? 'completed' : ''}`}>
    <div className="goal-main">
      <div>
        <h4>{goal.title}</h4>
        <p>{goal.type} · {formatShortDate(goal.targetDate)}</p>
      </div>
      {category && (
        <span className="category-pill" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
          {category.name}
        </span>
      )}
    </div>
    <div className="goal-actions">
      <button className="ghost-button" onClick={() => onToggle({ ...goal, completed: !goal.completed })}>
        {goal.completed ? 'Reopen' : 'Complete'}
      </button>
      <button className="ghost-button" onClick={() => onEdit(goal)}>
        Edit
      </button>
      <button className="ghost-button danger" onClick={() => onDelete(goal.id)}>
        Delete
      </button>
    </div>
  </div>
)
