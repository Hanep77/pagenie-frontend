function TextAreaField({ label, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-[var(--text)]">{label}</span>
      <textarea
        {...props}
        className={`min-h-32 w-full rounded-lg border bg-white px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-4 focus:ring-[color:var(--accent-soft)] ${
          error ? 'border-rose-300' : 'border-[var(--border)]'
        }`}
      />
      {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
    </label>
  )
}

export default TextAreaField
