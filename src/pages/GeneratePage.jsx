import { useEffect, useMemo, useState } from 'react'
import { Lightbulb, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import useSalesPageStore from '../stores/useSalesPageStore'
import FormField from '../components/FormField'
import TextAreaField from '../components/TextAreaField'
import TagInput from '../components/TagInput'
import LoadingSpinner from '../components/LoadingSpinner'

const LOADING_MESSAGES = [
  'Crafting your headline...',
  'Writing benefits...',
  'Structuring the feature grid...',
  'Polishing your call to action...',
  'Almost done...',
]

function GeneratePage() {
  const navigate = useNavigate()
  const setCurrentPage = useSalesPageStore((state) => state.setCurrentPage)
  const [form, setForm] = useState({
    product_name: '',
    description: '',
    target_audience: '',
    price: '',
    unique_selling_points: '',
  })
  const [features, setFeatures] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(0)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (!isSubmitting) return undefined

    const interval = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % LOADING_MESSAGES.length)
    }, 1800)

    return () => window.clearInterval(interval)
  }, [isSubmitting])

  const validate = () => {
    const nextErrors = {}

    if (!form.product_name.trim()) nextErrors.product_name = 'Product name is required.'
    if (!form.description.trim()) nextErrors.description = 'Description is required.'
    if (features.length === 0) nextErrors.features = 'Add at least one key feature.'
    if (!form.target_audience.trim()) nextErrors.target_audience = 'Target audience is required.'
    if (!form.price.trim()) nextErrors.price = 'Price is required.'
    if (!form.unique_selling_points.trim()) {
      nextErrors.unique_selling_points = 'Unique selling points are required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const progressWidth = useMemo(() => `${((loadingIndex + 1) / LOADING_MESSAGES.length) * 100}%`, [loadingIndex])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const payload = { ...form, features }
      const response = await api.post('/sales-pages', payload)
      const salesPage = response.data.data

      setCurrentPage(salesPage)
      toast.success('Sales page generated successfully.')
      navigate(`/preview/${salesPage.id}`)
    } catch (error) {
      const message =
        error.response?.data?.message || 'Unable to generate the sales page right now.'

      setServerError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const tips = [
    'Describe the product outcome, not just the feature list.',
    'Mention who the product is for and the problem it solves.',
    'Use concrete numbers or promises when possible.',
    'List features as short punchy tags for better generation quality.',
  ]

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_380px]">
      <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_-36px_rgba(var(--shadow-color),0.32)] md:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[var(--accent)]">Generate</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--text)]">Create your next sales page</h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Fill in the product details and let PageCraft AI shape the structure, messaging, and CTA.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField
            label="Product Name"
            value={form.product_name}
            error={errors.product_name}
            placeholder="Acme AI CRM"
            onChange={(event) => setForm((current) => ({ ...current, product_name: event.target.value }))}
          />

          <TextAreaField
            label="Description"
            value={form.description}
            error={errors.description}
            placeholder="What does your product do and why should people care?"
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          />

          <TagInput label="Key Features" tags={features} setTags={setFeatures} error={errors.features} />

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Target Audience"
              value={form.target_audience}
              error={errors.target_audience}
              placeholder="Founders, agencies, course creators..."
              onChange={(event) =>
                setForm((current) => ({ ...current, target_audience: event.target.value }))
              }
            />
            <FormField
              label="Price"
              value={form.price}
              error={errors.price}
              placeholder="$49/month"
              onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
            />
          </div>

          <TextAreaField
            label="Unique Selling Points"
            value={form.unique_selling_points}
            error={errors.unique_selling_points}
            placeholder="What makes this different from alternatives?"
            onChange={(event) =>
              setForm((current) => ({ ...current, unique_selling_points: event.target.value }))
            }
          />

          {serverError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {serverError}
            </div>
          ) : null}

          {isSubmitting ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                  style={{ width: progressWidth }}
                />
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-[var(--text)]">
                <LoadingSpinner className="h-5 w-5" />
                <span>{LOADING_MESSAGES[loadingIndex]}</span>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4" />
            {isSubmitting ? 'Generating...' : '✨ Generate Sales Page'}
          </button>
        </form>
      </section>

      <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_-36px_rgba(var(--shadow-color),0.25)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">Helpful tips</h2>
            <p className="text-sm text-[var(--text-muted)]">Better prompts lead to sharper copy.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {tips.map((tip) => (
            <div key={tip} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm leading-6 text-[var(--text-muted)]">{tip}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

export default GeneratePage
