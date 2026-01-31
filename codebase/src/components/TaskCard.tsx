import type { Task } from '../types/task'
import type { Category } from '../types/category'
import { formatShortDate } from '../utils/date'

interface TaskCardProps {
  task: Task
  category?: Category
  onToggle: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export const TaskCard = ({ task, category, onToggle, onEdit, onDelete }: TaskCardProps) => (
  <div className={`task-card ${task.completed ? 'completed' : ''}`}>
    <button
      className="task-check"
      onClick={() => onToggle({ ...task, completed: !task.completed })}
      aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
    >
      {task.completed ? '✓' : ''}
    </button>
    <div className="task-content">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>{formatShortDate(task.dueDate)}</span>
        {category && (
          <span className="category-pill" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
            {category.name}
          </span>
        )}
      </div>
    </div>
    <div className="task-actions">
      <button className="ghost-button" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button className="ghost-button danger" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  </div>
)
