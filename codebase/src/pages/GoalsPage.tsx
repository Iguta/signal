import { useMemo, useState } from 'react'
import { CategoryManager } from '../components/CategoryManager'
import { GoalCard } from '../components/GoalCard'
import { GoalFormModal } from '../components/GoalFormModal'
import { useCategories } from '../hooks/useCategories'
import { useGoals } from '../hooks/useGoals'
import type { Goal, GoalType } from '../types/goal'

const goalOrder: GoalType[] = ['yearly', 'monthly', 'daily']

export const GoalsPage = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoals()
  const { categories, addCategory, removeCategory } = useCategories()
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category])), [categories])

  const handleSave = (goal: Omit<Goal, 'id' | 'createdAt'>, existingId?: string) => {
    if (existingId) {
      updateGoal({
        ...goal,
        id: existingId,
        createdAt: selectedGoal?.createdAt ?? new Date().toISOString(),
      })
    } else {
      addGoal(goal)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Goals</h2>
          <p>Set intentions for the year, month, and day.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setSelectedGoal(null)
            setIsModalOpen(true)
          }}
        >
          New goal
        </button>
      </div>

      <div className="goal-columns">
        {goalOrder.map((type) => (
          <div key={type} className="panel">
            <div className="panel-header">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)} goals</h3>
              <p>Keep this horizon aligned.</p>
            </div>
            <div className="panel-body">
              {goals.filter((goal) => goal.type === type).length === 0 ? (
                <p className="empty-state">No {type} goals yet.</p>
              ) : (
                goals
                  .filter((goal) => goal.type === type)
                  .map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      category={goal.categoryId ? categoryMap.get(goal.categoryId) : undefined}
                      onToggle={updateGoal}
                      onEdit={(selected) => {
                        setSelectedGoal(selected)
                        setIsModalOpen(true)
                      }}
                      onDelete={deleteGoal}
                    />
                  ))
              )}
            </div>
          </div>
        ))}
      </div>

      <CategoryManager categories={categories} onAdd={addCategory} onRemove={removeCategory} />

      <GoalFormModal
        isOpen={isModalOpen}
        categories={categories}
        initialGoal={selectedGoal}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
