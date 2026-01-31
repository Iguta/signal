export type GoalType = 'yearly' | 'monthly' | 'daily'

export interface Goal {
  id: string
  title: string
  type: GoalType
  targetDate: string
  categoryId?: string
  completed: boolean
  createdAt: string
}
