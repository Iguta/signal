import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { GoalsPage } from './pages/GoalsPage'
import { TasksPage } from './pages/TasksPage'
import './App.css'

const App = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  </AppLayout>
)

export default App
