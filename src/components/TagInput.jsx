import { X } from 'lucide-react'

function TagInput({ label, tags, setTags, error }) {
  const addTag = (value) => {
    const trimmed = value.trim()

    if (!trimmed || tags.includes(trimmed)) {
      return
    }

    setTags([...tags, trimmed])
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-[var(--text)]">{label}</span>
      <div
        className={`rounded-xl border bg-white px-3 py-3 transition focus-within:border-[var(--accent)] focus-within:ring-4 focus-within:ring-[color:var(--accent-soft)] ${
          error ? 'border-rose-300' : 'border-[var(--border)]'
        }`}
      >
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--accent)]"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((item) => item !== tag))}
                className="text-[var(--accent)] transition hover:opacity-70"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full border-0 p-0 text-sm text-[var(--text)] outline-none placeholder:text-slate-400"
          placeholder="Type a feature and press Enter"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addTag(event.currentTarget.value)
              event.currentTarget.value = ''
            }
          }}
        />
      </div>
      {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
    </div>
  )
}

export default TagInput
