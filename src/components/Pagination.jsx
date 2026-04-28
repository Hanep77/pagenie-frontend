function Pagination({ pagination, onPageChange, loading = false }) {
  if (!pagination || pagination.last_page <= 1) {
    return null
  }

  const pages = Array.from({ length: pagination.last_page }, (_, index) => index + 1)

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {pages.map((page) => {
        const isActive = page === pagination.current_page

        return (
          <button
            key={page}
            type="button"
            disabled={loading}
            onClick={() => onPageChange(page)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-[var(--accent)] text-white shadow-lg'
                : 'border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--accent)]'
            } ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
