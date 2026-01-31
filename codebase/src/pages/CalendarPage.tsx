import { useMemo, useState } from 'react'
import { Calendar } from '../components/Calendar'
import { TaskCard } from '../components/TaskCard'
import { TaskFormModal } from '../components/TaskFormModal'
import { useCategories } from '../hooks/useCategories'
import { useSearch } from '../hooks/useSearch'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/task'
import { formatFullDate, toDateKey } from '../utils/date'

export const CalendarPage = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const { categories } = useCategories()
  const { term } = useSearch()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category])), [categories])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase())
      return matchesSearch
    })
  }, [tasks, term])

  const tasksForSelectedDate = useMemo(() => {
    const key = toDateKey(selectedDate)
    return filteredTasks.filter((task) => task.dueDate === key)
  }, [filteredTasks, selectedDate])

  const monthLabel = useMemo(() => {
    return new Date(currentMonth.year, currentMonth.month).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    })
  }, [currentMonth])

  const shiftMonth = (direction: number) => {
    const next = new Date(currentMonth.year, currentMonth.month + direction, 1)
    setCurrentMonth({ month: next.getMonth(), year: next.getFullYear() })
  }

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
    <div className="page calendar-page">
      <div className="page-header">
        <div>
          <h2>Calendar</h2>
          <p>Zoom into any day to schedule tasks with intention.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setSelectedTask(null)
            setIsModalOpen(true)
          }}
        >
          Add task
        </button>
      </div>

      <div className="calendar-layout">
        <div className="panel">
          <div className="calendar-toolbar">
            <button className="ghost-button" onClick={() => shiftMonth(-1)}>
              Prev
            </button>
            <span className="calendar-title">{monthLabel}</span>
            <button className="ghost-button" onClick={() => shiftMonth(1)}>
              Next
            </button>
          </div>
          <Calendar
            tasks={filteredTasks}
            month={currentMonth.month}
            year={currentMonth.year}
            selectedDate={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date)
              setCurrentMonth({ month: date.getMonth(), year: date.getFullYear() })
            }}
          />
        </div>
        <div className="panel">
          <div className="panel-header">
            <h3>{formatFullDate(toDateKey(selectedDate))}</h3>
            <p>{tasksForSelectedDate.length} tasks scheduled</p>
          </div>
          <div className="panel-body">
            {tasksForSelectedDate.length === 0 ? (
              <p className="empty-state">No tasks scheduled for this day.</p>
            ) : (
              tasksForSelectedDate.map((task) => (
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
        </div>
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        categories={categories}
        initialTask={selectedTask}
        defaultDueDate={toDateKey(selectedDate)}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
