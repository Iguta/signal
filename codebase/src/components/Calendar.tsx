import type { Task } from '../types/task'
import { getMonthMatrix, isSameDay, toDateKey } from '../utils/date'

interface CalendarProps {
  tasks: Task[]
  month: number
  year: number
  selectedDate: Date
  onSelect: (date: Date) => void
}

export const Calendar = ({ tasks, month, year, selectedDate, onSelect }: CalendarProps) => {
  const weeks = getMonthMatrix(month, year)

  const taskCountForDay = (date: Date) =>
    tasks.filter((task) => task.dueDate === toDateKey(date)).length

  const isCurrentMonth = (date: Date) => date.getMonth() === month

  return (
    <div className="calendar">
      <div className="calendar-header">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-body">
        {weeks.map((week, index) => (
          <div key={`week-${index}`} className="calendar-row">
            {week.map((date) => {
              const count = taskCountForDay(date)
              const isSelected = isSameDay(date, selectedDate)
              return (
                <button
                  key={date.toISOString()}
                  className={`calendar-cell ${isCurrentMonth(date) ? '' : 'muted'} ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => onSelect(date)}
                >
                  <span>{date.getDate()}</span>
                  {count > 0 && <span className="task-dot">{count}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
