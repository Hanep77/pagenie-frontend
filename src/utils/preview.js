export const PREVIEW_STYLES = {
  modern: {
    label: 'Modern',
    selectorActive: 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm',
    selectorIdle: 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/60',
    wrapper:
      'overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-900 shadow-[0_30px_90px_-44px_rgba(15,23,42,0.35)]',
    section:
      'rounded-[30px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.2)] backdrop-blur md:p-8',
    hero:
      'relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.18),transparent_32%),linear-gradient(135deg,#faf5ff_0%,#ffffff_52%,#eef2ff_100%)]',
    accentText: 'text-violet-700',
    accentBg:
      'bg-violet-600 text-white shadow-[0_18px_40px_-20px_rgba(124,58,237,0.65)] hover:-translate-y-0.5 hover:bg-violet-700',
    muted: 'text-slate-600',
    featureCard: 'border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]',
    banner:
      'rounded-[30px] border border-violet-200 bg-[linear-gradient(135deg,#7c3aed_0%,#8b5cf6_45%,#c4b5fd_100%)] text-white shadow-[0_28px_60px_-34px_rgba(124,58,237,0.55)]',
    statCard: 'border border-violet-100 bg-white/80 backdrop-blur',
    eyebrow: 'bg-white/80 text-violet-700 ring-1 ring-violet-100',
    quoteMark: 'text-violet-200',
    proseBlock: 'border-y border-slate-200/80 py-10 md:py-14',
    benefitItem: 'border-t border-slate-200 pt-6',
    featureItem: 'border-t border-slate-200 pt-6',
    splitPanel: 'rounded-[30px] border border-slate-200/80 bg-white/92 p-8 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.2)]',
    sectionIcon:
      'border border-violet-100/50 bg-violet-50/50 text-violet-700 shadow-[0_12px_30px_-24px_rgba(124,58,237,0.45)]',
    numberBadge: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
    fontClass: 'font-sans',
  },
  glass: {
    label: 'Glassmorphism',
    selectorActive: 'border-sky-300/50 bg-sky-400/15 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.2)]',
    selectorIdle: 'border-white/10 bg-slate-950 text-slate-300 hover:border-sky-400/30 hover:bg-sky-400/10',
    wrapper:
      'overflow-hidden rounded-[34px] border border-white/10 bg-[#050816] text-white shadow-[0_35px_100px_-48px_rgba(56,189,248,0.5)]',
    section:
      'rounded-[30px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_60px_-38px_rgba(56,189,248,0.4)] backdrop-blur-2xl md:p-8',
    hero:
      'relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_25%),linear-gradient(135deg,#0b1120_0%,#0d1117_65%,#030712_100%)]',
    accentText: 'text-sky-300',
    accentBg:
      'bg-sky-400 text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:bg-sky-300',
    muted: 'text-slate-200',
    featureCard: 'border border-white/10 bg-white/[0.04]',
    banner:
      'rounded-[30px] border border-sky-300/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(15,23,42,0.4))] text-white shadow-[0_0_40px_rgba(56,189,248,0.18)] backdrop-blur-2xl',
    statCard: 'border border-white/10 bg-white/[0.05] backdrop-blur-xl',
    eyebrow: 'bg-white/10 text-sky-200 ring-1 ring-white/10',
    quoteMark: 'text-sky-300/25',
    proseBlock: 'border-y border-white/10 py-10 md:py-14',
    benefitItem: 'border-t border-white/10 pt-6',
    featureItem: 'border-t border-white/10 pt-6',
    splitPanel: 'rounded-[30px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_60px_-38px_rgba(56,189,248,0.4)] backdrop-blur-2xl',
    sectionIcon:
      'border border-white/10 bg-white/[0.06] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]',
    numberBadge: 'bg-sky-400/10 text-sky-200 ring-1 ring-sky-300/20',
    fontClass: 'font-sans',
  },
  neo: {
    label: 'Neobrutalism',
    selectorActive: 'border-black bg-[#fde047] text-black shadow-[4px_4px_0_#000]',
    selectorIdle: 'border-black bg-white text-black hover:bg-[#fff7cc]',
    wrapper: 'overflow-hidden bg-[#fffbeb] text-black border-[3px] border-black shadow-[10px_10px_0_#000]',
    section: 'border-[3px] border-black bg-[#fffdf3] p-6 shadow-[6px_6px_0_#000] md:p-8',
    hero: 'relative overflow-hidden bg-[linear-gradient(135deg,#fde68a_0%,#fca5a5_52%,#93c5fd_100%)]',
    accentText: 'text-black',
    accentBg:
      'border-[3px] border-black bg-[#7C3AED] text-white shadow-[4px_4px_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
    muted: 'text-stone-700',
    featureCard: 'border-[3px] border-black bg-white',
    banner: 'rounded-none border-[3px] border-black bg-[#93C5FD] text-black shadow-[6px_6px_0_#000]',
    statCard: 'border-[3px] border-black bg-white',
    eyebrow: 'bg-white text-black border-[3px] border-black shadow-[4px_4px_0_#000]',
    quoteMark: 'text-black/15',
    proseBlock: 'border-y-[3px] border-black py-10 md:py-14',
    benefitItem: 'border-t-[3px] border-black pt-6',
    featureItem: 'border-t-[3px] border-black pt-6',
    splitPanel: 'border-[3px] border-black bg-[#fffdf3] p-8 shadow-[6px_6px_0_#000]',
    sectionIcon: 'border-[3px] border-black bg-[#fde047] text-black shadow-[4px_4px_0_#000]',
    numberBadge: 'bg-white text-black border-[3px] border-black shadow-[4px_4px_0_#000]',
    fontClass: 'font-["Space_Grotesk",sans-serif]',
  },
}

export const normalizeGeneratedOutput = (output = {}) => {
  const fallbackFeatures = Array.isArray(output.features) ? output.features : []
  const fallbackBenefits = Array.isArray(output.benefits) ? output.benefits : []

  return {
    headline: output.headline || 'Transform your offer into a page that sells.',
    subheadline:
      output.subheadline || 'A polished sales page tailored to your product in seconds.',
    product_description:
      output.product_description || 'No product description was generated yet.',
    benefits: fallbackBenefits.length ? fallbackBenefits : ['Clear value proposition', 'Fast setup', 'Conversion-focused messaging'],
    features: fallbackFeatures.length
      ? fallbackFeatures
      : [
          { title: 'Fast launch', detail: 'Get a polished page draft without starting from a blank screen.' },
          { title: 'Structured messaging', detail: 'Organize benefits, features, and CTA in a proven layout.' },
        ],
    social_proof:
      output.social_proof || '“This sales page made our offer easier to understand and easier to buy.”',
    pricing: output.pricing || 'Starting at a price your audience can say yes to.',
    call_to_action: output.call_to_action || 'Start building your page today',
  }
}

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

export const buildPreviewHtml = ({ productName, output, style }) => {
  const content = normalizeGeneratedOutput(output)
  const palette = {
    modern: {
      bg: '#ffffff',
      text: '#0f172a',
      card: '#f8fafc',
      border: '#e2e8f0',
      accent: '#7C3AED',
      shadow: '0 18px 45px rgba(15,23,42,0.10)',
      radius: '24px',
      buttonRadius: '999px',
      headingFont: 'Inter, sans-serif',
      hero:
        'radial-gradient(circle at top right, rgba(124,58,237,0.18), transparent 32%), linear-gradient(135deg, #faf5ff 0%, #ffffff 52%, #eef2ff 100%)',
      banner: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 45%, #c4b5fd 100%)',
      secondary: '#eef2ff',
    },
    glass: {
      bg: '#050816',
      text: '#f8fafc',
      card: 'rgba(255,255,255,0.05)',
      border: 'rgba(255,255,255,0.1)',
      accent: '#38bdf8',
      shadow: '0 0 30px rgba(56,189,248,0.25)',
      radius: '24px',
      buttonRadius: '999px',
      headingFont: 'Inter, sans-serif',
      hero:
        'radial-gradient(circle at top left, rgba(56,189,248,0.24), transparent 28%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.22), transparent 25%), linear-gradient(135deg, #0b1120 0%, #0d1117 65%, #030712 100%)',
      banner: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(15,23,42,0.4))',
      secondary: 'rgba(255,255,255,0.04)',
    },
    neo: {
      bg: '#fffbeb',
      text: '#000000',
      card: '#fffdf3',
      border: '#000000',
      accent: '#7C3AED',
      shadow: '6px 6px 0 #000',
      radius: '0px',
      buttonRadius: '0px',
      headingFont: '"Space Grotesk", Inter, sans-serif',
      hero: 'linear-gradient(135deg, #fde68a 0%, #fca5a5 52%, #93c5fd 100%)',
      banner: '#93C5FD',
      secondary: '#ffffff',
    },
  }[style]

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(productName)} Sales Page</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: ${palette.headingFont};
        background: ${palette.bg};
        color: ${palette.text};
      }
      .page { max-width: 1180px; margin: 0 auto; padding: 36px 20px 96px; }
      .hero, .card, .banner, .stat {
        background: ${palette.card};
        border: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
        border-radius: ${palette.radius};
        box-shadow: ${palette.shadow};
      }
      .hero { padding: 64px 36px; margin-bottom: 32px; background: ${palette.hero}; position: relative; overflow: hidden; }
      .card { padding: 32px; margin-bottom: 32px; }
      .stat { padding: 18px 20px; background: ${palette.secondary}; }
      .banner { padding: 40px 32px; text-align: center; margin-top: 56px; }
      .grid-3, .grid-2 { display: grid; gap: 24px; }
      .stats { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 56px; }
      .grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 640px) {
        .grid-2 { grid-template-columns: 1fr; }
      }
      .section-block { margin-top: 80px; }
      .section-block.tight { margin-top: 64px; }
      .split { display: grid; gap: 48px; grid-template-columns: minmax(0, 1.1fr) 420px; align-items: start; }
      .prose-block {
        padding: 40px 0;
        border-top: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
        border-bottom: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
      }
      .section-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 22px;
      }
      .section-icon {
        width: 48px;
        height: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: ${style === 'neo' ? '0px' : '16px'};
        background: ${style === 'glass' ? 'rgba(255,255,255,0.06)' : style === 'modern' ? '#f5f3ff' : '#fde047'};
        border: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
        color: ${palette.accent};
      }
      .benefit-item,
      .feature-item {
        padding-top: 24px;
        border-top: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
      }
      .feature-meta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        height: 44px;
        margin-bottom: 18px;
        border-radius: ${style === 'neo' ? '0px' : '999px'};
        background: ${style === 'glass' ? 'rgba(56,189,248,0.1)' : style === 'modern' ? '#f5f3ff' : '#ffffff'};
        border: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
        font-weight: 700;
      }
      .offer-panel {
        padding: 32px;
        background: ${palette.card};
        border: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
        border-radius: ${palette.radius};
        box-shadow: ${palette.shadow};
      }
      h1 { font-size: clamp(2.2rem, 5vw, 4rem); margin: 0 0 12px; letter-spacing: -0.03em; }
      h2 { font-size: 1.6rem; margin: 0 0 14px; letter-spacing: -0.02em; }
      h3 { font-size: 1.45rem; margin: 0 0 12px; line-height: 1.3; letter-spacing: -0.01em; }
      p { line-height: 1.7; margin: 0; }
      .muted { opacity: 0.85; }
      .button {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-top: 24px;
        padding: 14px 22px;
        color: ${style === 'glass' ? '#020617' : '#ffffff'};
        background: ${palette.accent};
        border-radius: ${palette.buttonRadius};
        border: ${style === 'neo' ? '3px solid #000' : 'none'};
        box-shadow: ${style === 'glass' ? '0 0 30px rgba(56,189,248,0.45)' : style === 'neo' ? '4px 4px 0 #000' : 'none'};
        text-decoration: none;
        font-weight: 700;
      }
      blockquote { margin: 0; font-size: 1.1rem; font-weight: 600; }
      .price { font-size: 2rem; font-weight: 800; margin-bottom: 10px; line-height: 1.2; }
      .price.long { font-size: 1.5rem; }
      ul { margin: 0; padding-left: 22px; }
      .eyebrow {
        display: inline-block;
        padding: 8px 14px;
        margin-bottom: 16px;
        border-radius: ${style === 'neo' ? '0px' : '999px'};
        font-size: 0.78rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-weight: 700;
        background: ${style === 'glass' ? 'rgba(255,255,255,0.08)' : style === 'modern' ? 'rgba(255,255,255,0.85)' : '#ffffff'};
        border: ${style === 'neo' ? '3px solid #000' : '1px solid ' + palette.border};
      }
      .quote {
        font-size: clamp(2.2rem, 4vw, 3.4rem);
        line-height: 1;
        opacity: ${style === 'glass' ? '0.22' : style === 'modern' ? '0.15' : '0.18'};
      }
      @media (max-width: 768px) {
        .page { padding: 20px 16px 56px; }
        .hero, .card, .banner, .offer-panel { padding: 24px; }
        .stats { margin-bottom: 40px; }
        .section-block { margin-top: 48px; }
        .section-block.tight { margin-top: 36px; }
      }
      @media (max-width: 980px) {
        .split { grid-template-columns: 1fr; }
      }
      i { width: 20px; height: 20px; }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <span class="eyebrow">${escapeHtml(style === 'modern' ? 'Editorial Landing Page' : style === 'glass' ? 'Immersive Product Experience' : 'Bold Conversion Poster')}</span>
        <p class="muted">${escapeHtml(productName)}</p>
        <h1>${escapeHtml(content.headline)}</h1>
        <p class="muted">${escapeHtml(content.subheadline)}</p>
        <a class="button" href="#cta"><i data-lucide="sparkles"></i> ${escapeHtml(content.call_to_action)}</a>
      </section>
      <section class="stats">
        <div class="stat"><strong>Offer</strong><p class="muted">${escapeHtml(productName)}</p></div>
        <div class="stat"><strong>Audience</strong><p class="muted">${escapeHtml(content.benefits[0] || 'Outcome-driven buyers')}</p></div>
        <div class="stat"><strong>Hook</strong><p class="muted">${escapeHtml(content.call_to_action)}</p></div>
      </section>
      <section class="section-block tight">
        <div class="prose-block">
          <div class="section-head"><span class="section-icon"><i data-lucide="file-badge-2"></i></span><h2>Product Description</h2></div>
          <p>${escapeHtml(content.product_description)}</p>
        </div>
      </section>
      <section class="section-block">
        <div class="section-head"><span class="section-icon"><i data-lucide="gem"></i></span><h2>Key Benefits</h2></div>
        <div class="${content.benefits.length % 3 === 0 ? 'grid-3' : content.benefits.length % 2 === 0 ? 'grid-2' : 'grid-3'}">${content.benefits
          .map((benefit, index) => {
            const icons = ['gem', 'sparkles', 'badge-check']
            const icon = icons[index % icons.length]
            if (benefit.includes(':')) {
              const [title, ...descParts] = benefit.split(':')
              const description = descParts.join(':').trim()
              return `<div class="benefit-item"><div class="section-icon" style="width:42px;height:42px;margin-bottom:18px;"><i data-lucide="${icon}"></i></div><h3>${escapeHtml(title)}</h3><p class="muted">${escapeHtml(description)}</p></div>`
            }
            return `<div class="benefit-item"><div class="section-icon" style="width:42px;height:42px;margin-bottom:18px;"><i data-lucide="${icon}"></i></div><h3>${escapeHtml(benefit)}</h3></div>`
          })
          .join('')}</div>
      </section>
      <section class="section-block">
        <div class="section-head"><span class="section-icon"><i data-lucide="layers-3"></i></span><h2>Product Features</h2></div>
        <div class="grid-2">${content.features
          .map(
            (feature, index) => `<div class="feature-item"><div class="feature-meta">${index + 1}</div><h3>${escapeHtml(feature.title || 'Feature')}</h3><p class="muted">${escapeHtml(feature.detail || '')}</p></div>`,
          )
          .join('')}</div>
      </section>
      <section class="section-block split">
        <div>
          <div class="prose-block"><div class="section-head"><span class="section-icon"><i data-lucide="message-square-quote"></i></span><h2>Social Proof</h2></div><div class="quote">“</div><blockquote>${escapeHtml(content.social_proof)}</blockquote></div>
        </div>
        <div>
          <div class="offer-panel">
            <div class="section-head"><span class="section-icon"><i data-lucide="zap"></i></span><h2>Pricing</h2></div>
            <div class="price ${content.pricing.length > 40 ? 'long' : ''}">${escapeHtml(content.pricing)}</div>
            <p class="muted">Simple positioning that keeps the focus on value.</p>
            <a class="button" href="#cta">Get Started</a>
          </div>
        </div>
      </section>
      <section class="banner" id="cta" style="background:${palette.banner};">
        <h2>${escapeHtml(content.call_to_action)}</h2>
        <p class="muted">Move from idea to launch-ready sales messaging with Pagenie.</p>
      </section>
    </main>
    <script>
      lucide.createIcons();
    </script>
  </body>
</html>`
}

export const buildPreviewText = ({ productName, output }) => {
  const content = normalizeGeneratedOutput(output)

  return `${productName}

Headline:
${content.headline}

Subheadline:
${content.subheadline}

Product Description:
${content.product_description}

Benefits:
${content.benefits.map((benefit, index) => `${index + 1}. ${benefit}`).join('\n')}

Features:
${content.features.map((feature, index) => `${index + 1}. ${feature.title}: ${feature.detail}`).join('\n')}

Social Proof:
${content.social_proof}

Pricing:
${content.pricing}

Call to Action:
${content.call_to_action}
`
}
