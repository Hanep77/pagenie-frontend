import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './layouts/AppShell'
import DashboardPage from './pages/DashboardPage'
import GeneratePage from './pages/GeneratePage'
import LoginPage from './pages/LoginPage'
import PreviewPage from './pages/PreviewPage'
import RegisterPage from './pages/RegisterPage'
import useAuthStore from './stores/useAuthStore'

function HomeRedirect() {
  const token = useAuthStore((state) => state.token)

  return <Navigate to={token ? '/dashboard' : '/login'} replace />
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/preview/:id" element={<PreviewPage />} />
          </Route>
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
          },
        }}
      />
    </>
  )
}

export default App
