import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SearchProvider } from './hooks/useSearch'
import { DataProvider } from './hooks/useData'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>,
)
