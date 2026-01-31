import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface SearchContextValue {
  term: string
  setTerm: (value: string) => void
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [term, setTerm] = useState('')
  const value = useMemo(() => ({ term, setTerm }), [term])
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}
