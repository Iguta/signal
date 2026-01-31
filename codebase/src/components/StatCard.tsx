import type { ReactNode } from 'react'
import { ProgressRing } from './ProgressRing'

interface StatCardProps {
  title: string
  value: number
  total: number
  helper: string
  children?: ReactNode
}

export const StatCard = ({ title, value, total, helper, children }: StatCardProps) => {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100)

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-helper">{helper}</p>
        </div>
        <div className="stat-ring">
          <ProgressRing value={percentage} size={70} />
          <span className="stat-percentage">{percentage}%</span>
        </div>
      </div>
      <div className="stat-card-body">
        <p className="stat-value">
          {value} <span>/ {total}</span>
        </p>
        {children}
      </div>
    </div>
  )
}
