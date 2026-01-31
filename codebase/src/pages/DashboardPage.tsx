import { useMemo } from 'react'
import { StatCard } from '../components/StatCard'
import { useGoals } from '../hooks/useGoals'
import { useTasks } from '../hooks/useTasks'
import { endOfMonth, endOfWeek, endOfYear, isWithinRange, startOfMonth, startOfWeek, startOfYear } from '../utils/date'

export const DashboardPage = () => {
  const { tasks } = useTasks()
  const { goals } = useGoals()

  const today = new Date()
  const todayKey = today.toISOString().split('T')[0]

  const progress = useMemo(() => {
    const todayTasks = tasks.filter((task) => task.dueDate === todayKey)
    const weekTasks = tasks.filter((task) =>
      isWithinRange(new Date(task.dueDate), startOfWeek(today), endOfWeek(today)),
    )
    const monthTasks = tasks.filter((task) =>
      isWithinRange(new Date(task.dueDate), startOfMonth(today), endOfMonth(today)),
    )
    const yearTasks = tasks.filter((task) =>
      isWithinRange(new Date(task.dueDate), startOfYear(today), endOfYear(today)),
    )

    return {
      today: {
        completed: todayTasks.filter((task) => task.completed).length,
        total: todayTasks.length,
      },
      week: {
        completed: weekTasks.filter((task) => task.completed).length,
        total: weekTasks.length,
      },
      month: {
        completed: monthTasks.filter((task) => task.completed).length,
        total: monthTasks.length,
      },
      year: {
        completed: yearTasks.filter((task) => task.completed).length,
        total: yearTasks.length,
      },
    }
  }, [tasks, todayKey])

  const upcomingTasks = useMemo(
    () =>
      tasks
        .filter((task) => !task.completed)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 5),
    [tasks],
  )

  const goalSummary = useMemo(() => {
    const summary = {
      yearly: goals.filter((goal) => goal.type === 'yearly').length,
      monthly: goals.filter((goal) => goal.type === 'monthly').length,
      daily: goals.filter((goal) => goal.type === 'daily').length,
    }
    return summary
  }, [goals])

  return (
    <div className="page dashboard-page">
      <section className="stats-grid">
        <StatCard
          title="Today"
          value={progress.today.completed}
          total={progress.today.total}
          helper="Tasks completed today"
        />
        <StatCard
          title="This Week"
          value={progress.week.completed}
          total={progress.week.total}
          helper="Weekly momentum"
        />
        <StatCard
          title="This Month"
          value={progress.month.completed}
          total={progress.month.total}
          helper="Monthly progress"
        />
        <StatCard
          title="This Year"
          value={progress.year.completed}
          total={progress.year.total}
          helper="Yearly completion"
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Upcoming tasks</h2>
            <p>Keep these in motion to stay on track.</p>
          </div>
          <div className="panel-body">
            {upcomingTasks.length === 0 ? (
              <p className="empty-state">No upcoming tasks. Add one to keep momentum.</p>
            ) : (
              <ul className="simple-list">
                {upcomingTasks.map((task) => (
                  <li key={task.id}>
                    <span>{task.title}</span>
                    <span className="muted">{task.dueDate}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Goal overview</h2>
            <p>Balance the big picture with daily wins.</p>
          </div>
          <div className="panel-body">
            <div className="goal-summary">
              <div>
                <span className="summary-label">Yearly</span>
                <p className="summary-value">{goalSummary.yearly}</p>
              </div>
              <div>
                <span className="summary-label">Monthly</span>
                <p className="summary-value">{goalSummary.monthly}</p>
              </div>
              <div>
                <span className="summary-label">Daily</span>
                <p className="summary-value">{goalSummary.daily}</p>
              </div>
            </div>
            <p className="muted">Create goals that map to your calendar and tasks.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
