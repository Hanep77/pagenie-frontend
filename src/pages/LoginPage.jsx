import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import useAuthStore from '../stores/useAuthStore'
import FormField from '../components/FormField'
import LoadingSpinner from '../components/LoadingSpinner'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = useAuthStore((state) => state.token)
  const setAuth = useAuthStore((state) => state.setAuth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password.trim()) nextErrors.password = 'Password is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const response = await api.post('/login', form)
      const payload = response.data.data

      setAuth({
        user: payload.user,
        token: payload.access_token,
      })

      toast.success(`Welcome back, ${payload.user.name}!`)
      navigate(location.state?.from || '/dashboard', { replace: true })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Unable to log in. Please check your details.'

      toast.error(message)

      if (error.response?.data?.errors) {
        setErrors(
          Object.fromEntries(
            Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]]),
          ),
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-muted)] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_30px_80px_-40px_rgba(var(--shadow-color),0.45)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-xl font-bold text-white">
            P
          </div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">PageCraft AI</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Sign in to generate high-converting AI sales pages.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            placeholder="you@example.com"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <FormField
            label="Password"
            type="password"
            value={form.password}
            error={errors.password}
            placeholder="Enter your password"
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoadingSpinner className="h-5 w-5" light /> : null}
            {isSubmitting ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[var(--accent)] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
