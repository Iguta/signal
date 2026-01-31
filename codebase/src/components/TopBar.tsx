import { useMemo } from 'react'
import { useSearch } from '../hooks/useSearch'

export const TopBar = () => {
  const { term, setTerm } = useSearch()
  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-title">Hello, stay aligned.</h1>
        <p className="topbar-subtitle">{todayLabel}</p>
      </div>
      <div className="topbar-search">
        <input
          type="search"
          placeholder="Search tasks across Signal"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          aria-label="Search tasks"
        />
      </div>
      <div className="topbar-profile">
        <div className="profile-dot" />
        <span>Local Workspace</span>
      </div>
    </header>
  )
}
