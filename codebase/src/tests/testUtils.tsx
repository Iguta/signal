import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DataProvider } from '../hooks/useData'
import { SearchProvider } from '../hooks/useSearch'
import App from '../App'

export const renderApp = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SearchProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SearchProvider>
    </MemoryRouter>,
  )
}
