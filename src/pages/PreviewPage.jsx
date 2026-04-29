import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  FileBadge2,
  FileText,
  Gem,
  Layers3,
  MessageSquareQuote,
  RefreshCw,
  Sparkles,
  Stars,
  Zap,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import useSalesPageStore from '../stores/useSalesPageStore'
import LoadingSpinner from '../components/LoadingSpinner'
import PageLoader from '../components/PageLoader'
import { buildExportFileName, downloadFile } from '../utils/download'
import {
  buildPreviewHtml,
  buildPreviewText,
  normalizeGeneratedOutput,
  PREVIEW_STYLES,
} from '../utils/preview'

function PreviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentPage = useSalesPageStore((state) => state.currentPage)
  const setCurrentPage = useSalesPageStore((state) => state.setCurrentPage)
  const [style, setStyle] = useState('modern')
  const [loading, setLoading] = useState(!currentPage || String(currentPage.id) !== id)
  const [action, setAction] = useState('')

  useEffect(() => {
    const fetchPage = async () => {
      if (currentPage && String(currentPage.id) === id) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const response = await api.get(`/sales-pages/${id}`)
        setCurrentPage(response.data.data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load this sales page.')
        navigate('/dashboard', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [currentPage, id, navigate, setCurrentPage])

  const content = useMemo(
    () => normalizeGeneratedOutput(currentPage?.generated_output),
    [currentPage?.generated_output],
  )

  if (loading) {
    return <PageLoader message="Loading your generated sales page..." />
  }

  if (!currentPage) {
    return null
  }

  const selectedStyle = PREVIEW_STYLES[style]
  const heroBadge =
    style === 'modern'
      ? 'Editorial Layout'
      : style === 'glass'
        ? 'Immersive Experience'
        : 'High-Impact Poster'
  const statItems = [
    { label: 'Primary Promise', value: content.benefits[0] || 'Stronger positioning', icon: Sparkles },
    { label: 'Offer Snapshot', value: currentPage.pricing || currentPage.price || 'Offer details ready', icon: Layers3 },
    { label: 'CTA Focus', value: content.call_to_action, icon: style === 'neo' ? Zap : Stars },
  ]
  const benefitIcons = [Gem, Sparkles, BadgeCheck]
  const sectionIcons = {
    description: FileBadge2,
    social: MessageSquareQuote,
    pricing: Zap,
  }
  const DescriptionIcon = sectionIcons.description
  const SocialIcon = sectionIcons.social
  const PricingIcon = sectionIcons.pricing

  const handleRegenerate = async () => {
    setAction('regenerate')

    try {
      const response = await api.post(`/sales-pages/${id}/regenerate`)
      setCurrentPage(response.data.data)
      toast.success('Sales page regenerated.')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to regenerate this page.')
    } finally {
      setAction('')
    }
  }

  const exportHtml = () => {
    const html = buildPreviewHtml({
      productName: currentPage.product_name,
      output: currentPage.generated_output,
      style,
    })

    downloadFile({
      content: html,
      filename: buildExportFileName(currentPage.product_name, 'sales-page', 'html'),
      type: 'text/html;charset=utf-8',
    })

    toast.success('HTML export downloaded.')
  }

  const exportText = () => {
    const text = buildPreviewText({
      productName: currentPage.product_name,
      output: currentPage.generated_output,
    })

    downloadFile({
      content: text,
      filename: buildExportFileName(currentPage.product_name, 'script', 'txt'),
      type: 'text/plain;charset=utf-8',
    })

    toast.success('Text export downloaded.')
  }

  return (
    <div className="relative pb-24">
      <section className="mb-6 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_-36px_rgba(var(--shadow-color),0.32)]">
        <p className="text-sm font-medium text-[var(--accent)]">Preview</p>
        <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--text)]">{currentPage.product_name}</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Choose your sales page style:
            </p>
          </div>

          <div className={`flex flex-wrap gap-3 ${style === 'glass' ? 'rounded-3xl bg-slate-950 p-2' : ''}`}>
            {Object.entries(PREVIEW_STYLES).map(([key, previewStyle]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStyle(key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${style === key ? previewStyle.selectorActive : previewStyle.selectorIdle}`}
              >
                {previewStyle.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`p-5 md:p-8 xl:p-10 ${selectedStyle.wrapper} ${selectedStyle.fontClass}`}>
        <div className={`p-8 md:p-12 ${selectedStyle.section} ${selectedStyle.hero}`}>
          <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_320px] xl:items-end">
            <div>
              <span className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] ${selectedStyle.eyebrow}`}>
                {heroBadge}
              </span>
              <p className={`mt-5 text-sm font-semibold uppercase tracking-[0.24em] ${selectedStyle.accentText}`}>
                {currentPage.product_name}
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {content.headline}
              </h2>
              <p className={`mt-4 max-w-3xl text-base leading-7 md:text-lg ${selectedStyle.muted}`}>
                {content.subheadline}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition ${selectedStyle.accentBg}`}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {content.call_to_action}
                </button>
                <p className={`text-sm ${selectedStyle.muted}`}>
                  Built for {currentPage.target_audience}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {statItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className={`p-5 ${selectedStyle.statCard}`}>
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${selectedStyle.accentBg}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${selectedStyle.muted}`}>
                        {item.label}
                      </p>
                    </div>
                    <p className="text-base font-semibold leading-7">{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="mx-auto max-w-5xl">
            <div className={selectedStyle.proseBlock}>
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
                  <DescriptionIcon className="h-5 w-5" />
                </div>
                <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  Product Description
                </h3>
              </div>
              <p className={`mt-6 max-w-3xl leading-8 md:text-xl ${selectedStyle.muted}`}>
                {content.product_description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="mb-10 flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
              <Gem className="h-5 w-5" />
            </div>
            <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Key Benefits
            </h3>
          </div>
          <div className={`grid gap-10 ${content.benefits.length % 3 === 0 ? 'xl:grid-cols-3' : content.benefits.length % 2 === 0 ? 'xl:grid-cols-2' : 'xl:grid-cols-3'}`}>
            {content.benefits.map((benefit, index) => (
              <div key={`${benefit}-${index}`} className={selectedStyle.benefitItem}>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
                  {(() => {
                    const Icon = benefitIcons[index % benefitIcons.length]
                    return <Icon className="h-5 w-5" />
                  })()}
                </div>
                {benefit.includes(':') ? (
                  <>
                    <h3 className="max-w-md text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                      {benefit.split(':')[0]}
                    </h3>
                    <p className={`mt-4 max-w-sm text-sm leading-7 md:text-base ${selectedStyle.muted}`}>
                      {benefit.split(':').slice(1).join(':').trim()}
                    </p>
                  </>
                ) : (
                  <h3 className="max-w-md text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                    {benefit}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="mb-10 flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
              <Layers3 className="h-5 w-5" />
            </div>
            <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Product Features
            </h3>
          </div>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2 xl:gap-x-16">
            {content.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className={selectedStyle.featureItem}>
                <div className={`mb-4 inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold ${selectedStyle.numberBadge}`}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{feature.title}</h3>
                <p className={`mt-4 max-w-xl text-sm leading-7 md:text-base ${selectedStyle.muted}`}>
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
            <div>
              <div className={selectedStyle.proseBlock}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
                    <SocialIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold">Social Proof</h3>
                </div>
                <div className="relative overflow-hidden">
                  <span className={`pointer-events-none absolute -top-6 left-0 text-8xl font-bold leading-none ${selectedStyle.quoteMark}`}>
                    "
                  </span>
                  <p className={`relative pt-8 text-lg leading-8 md:text-[1.15rem] ${selectedStyle.muted}`}>{content.social_proof}</p>
                </div>
              </div>
            </div>

            <div>
              <div className={selectedStyle.splitPanel}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${selectedStyle.sectionIcon}`}>
                    <PricingIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold">Pricing</h3>
                </div>
                <div className="mt-5">
                  <p className={`font-bold leading-tight ${content.pricing.length > 40 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'} ${selectedStyle.accentText}`}>{content.pricing}</p>
                  <p className={`mt-4 max-w-2xl text-sm leading-7 md:text-base ${selectedStyle.muted}`}>
                    Present the offer clearly and keep the next action obvious.
                  </p>
                </div>
                <button
                  type="button"
                  className={`mt-8 inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold ${selectedStyle.accentBg}`}
                >
                  Claim This Offer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className={`p-10 md:p-16 text-center ${selectedStyle.banner}`}>
            <h3 className="text-3xl font-semibold md:text-5xl">{content.call_to_action}</h3>
            <p className={`mx-auto mt-6 max-w-2xl text-base leading-7 md:text-lg ${style === 'modern' ? 'text-violet-100' : selectedStyle.muted}`}>
              Turn your idea into a polished, conversion-focused sales page with Pagenie.            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-20 flex flex-col gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          disabled={action === 'regenerate'}
          onClick={handleRegenerate}
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {action === 'regenerate' ? <LoadingSpinner className="h-4 w-4" light /> : <RefreshCw className="h-4 w-4" />}
          Regenerate
        </button>
        <button
          type="button"
          onClick={exportHtml}
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-lg transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Download className="h-4 w-4" />
          Export as HTML
        </button>
        <button
          type="button"
          onClick={exportText}
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-lg transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <FileText className="h-4 w-4" />
          Export Script as .txt
        </button>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-lg transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default PreviewPage
