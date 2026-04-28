import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import useAuthStore from '../stores/useAuthStore'
import FormField from '../components/FormField'
import LoadingSpinner from '../components/LoadingSpinner'

function RegisterPage() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const setAuth = useAuthStore((state) => state.setAuth)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password.trim()) nextErrors.password = 'Password is required.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.password_confirmation !== form.password) {
      nextErrors.password_confirmation = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const response = await api.post('/register', form)
      const payload = response.data.data

      setAuth({
        user: payload.user,
        token: payload.access_token,
      })

      toast.success(`Welcome to PageCraft AI, ${payload.user.name}!`)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Unable to register right now. Please try again.'

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
            Create your account and start generating polished sales pages.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField
            label="Name"
            type="text"
            value={form.name}
            error={errors.name}
            placeholder="Your full name"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
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
            placeholder="Choose a secure password"
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
          <FormField
            label="Confirm Password"
            type="password"
            value={form.password_confirmation}
            error={errors.password_confirmation}
            placeholder="Confirm your password"
            onChange={(event) =>
              setForm((current) => ({ ...current, password_confirmation: event.target.value }))
            }
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoadingSpinner className="h-5 w-5" light /> : null}
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[var(--accent)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
