import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
