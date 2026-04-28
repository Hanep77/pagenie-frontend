function LoadingSpinner({ className = 'h-10 w-10', light = false }) {
  return (
    <div
      className={`${className} animate-spin rounded-full border-4 ${
        light ? 'border-white/20 border-t-white' : 'border-[var(--border)] border-t-[var(--accent)]'
      }`}
      aria-label="Loading"
    />
  )
}

export default LoadingSpinner
