import { useCallback, useEffect, useState } from 'react'
import { Eye, FilePlus2, RefreshCw, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import useAuthStore from '../stores/useAuthStore'
import useSalesPageStore from '../stores/useSalesPageStore'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'

function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { pages, pagination, setPages, setCurrentPage, removePage } = useSalesPageStore()
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState(null)

  const fetchPages = useCallback(
    async (page = 1) => {
      setLoading(true)

      try {
        const response = await api.get(`/sales-pages?page=${page}`)
        const payload = response.data.data

        setPages({
          pages: payload.data,
          pagination: {
            current_page: payload.current_page,
            last_page: payload.last_page,
            per_page: payload.per_page,
            total: payload.total,
          },
        })
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load sales pages.')
      } finally {
        setLoading(false)
      }
    },
    [setPages],
  )

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      fetchPages()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [fetchPages])

  const handleDelete = async (pageId) => {
    if (!window.confirm('Delete this sales page permanently?')) {
      return
    }

    setActionId(`delete-${pageId}`)

    try {
      await api.delete(`/sales-pages/${pageId}`)
      removePage(pageId)
      toast.success('Sales page deleted.')
      fetchPages(pagination?.current_page || 1)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete this page.')
    } finally {
      setActionId(null)
    }
  }

  const handleRegenerate = async (pageId) => {
    setActionId(`regenerate-${pageId}`)

    try {
      const response = await api.post(`/sales-pages/${pageId}/regenerate`)
      setCurrentPage(response.data.data)
      toast.success('Sales page regenerated.')
      navigate(`/preview/${pageId}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to regenerate this page.')
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_-36px_rgba(var(--shadow-color),0.32)] md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--text)] md:text-4xl">
              Welcome back, {user?.name || 'Creator'} 👋
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
              Manage your saved sales pages, refine messaging, and jump back into your next launch.
            </p>
          </div>

          <Link
            to="/generate"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          >
            <FilePlus2 className="h-4 w-4" />
            Generate New Sales Page
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="flex min-h-72 items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)]">
          <LoadingSpinner />
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <FilePlus2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--text)]">No pages yet. Generate your first one!</h2>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Start with a product idea and PageCraft AI will draft the structure for you.
          </p>
        </div>
      ) : (
        <>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <article
                key={page.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_45px_-35px_rgba(var(--shadow-color),0.35)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text)]">{page.product_name}</h2>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {new Date(page.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">
                  {page.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    to={`/preview/${page.id}`}
                    onClick={() => setCurrentPage(page)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>

                  <button
                    type="button"
                    disabled={actionId === `regenerate-${page.id}`}
                    onClick={() => handleRegenerate(page.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {actionId === `regenerate-${page.id}` ? (
                      <LoadingSpinner className="h-4 w-4" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Regenerate
                  </button>

                  <button
                    type="button"
                    disabled={actionId === `delete-${page.id}`}
                    onClick={() => handleDelete(page.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {actionId === `delete-${page.id}` ? (
                      <LoadingSpinner className="h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>

          <Pagination pagination={pagination} loading={loading} onPageChange={fetchPages} />
        </>
      )}
    </div>
  )
}

export default DashboardPage
