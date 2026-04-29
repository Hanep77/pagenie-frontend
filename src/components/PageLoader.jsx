import LoadingSpinner from './LoadingSpinner'

function PageLoader({ message = 'Preparing your workspace...' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[var(--surface-muted)] px-4 text-center">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-10 py-12 shadow-[0_24px_60px_-35px_rgba(var(--shadow-color),0.35)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-bold text-white">
          P
        </div>
        <LoadingSpinner className="mx-auto h-12 w-12" />
        <h1 className="mt-5 text-2xl font-semibold text-[var(--text)]">Pagenie</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{message}</p>
      </div>
    </div>
  )
}

export default PageLoader
