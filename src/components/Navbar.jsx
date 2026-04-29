import { LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '../stores/useAuthStore'

function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/generate', label: 'Generate' },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] font-bold text-white shadow-lg shadow-[rgba(var(--shadow-color),0.35)]">
            P
          </div>
          <div>
            <p className="text-base font-semibold text-[var(--text)]">Pagenie</p>
            <p className="text-xs text-[var(--text-muted)]">AI Sales Page Generator</p>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to)

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-[var(--text)]">{user?.name || 'Guest'}</p>
            <p className="text-xs text-[var(--text-muted)]">{user?.email || 'No email'}</p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await logout()
              toast.success('Logged out successfully')
              navigate('/login', { replace: true })
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
