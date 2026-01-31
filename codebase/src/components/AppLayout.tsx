import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="app-shell">
    <Sidebar />
    <div className="app-main">
      <TopBar />
      <main className="app-content">{children}</main>
    </div>
  </div>
)
