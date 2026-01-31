import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/goals', label: 'Goals', icon: '🎯' },
  { to: '/calendar', label: 'Calendar', icon: '🗓️' },
]

export const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <span className="brand-mark">Signal</span>
      <span className="brand-subtitle">Focus & Momentum</span>
    </div>
    <nav className="sidebar-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
    <div className="sidebar-footer">
      <div className="status-card">
        <p className="status-title">Daily Intent</p>
        <p className="status-subtitle">Focus on what moves you forward.</p>
      </div>
    </div>
  </aside>
)
