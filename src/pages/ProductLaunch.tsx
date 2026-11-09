import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowDownToLine, ArrowLeft } from 'lucide-react'
import { products, type ProductId } from '../data/products'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from '../components/LangSwitch'
import './ProductLaunch.css'

const IDS = new Set<ProductId>(['xoc', 'pokedeck'])

function Field({ accent }: { accent: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = window.innerWidth < 720 ? 22 : 42
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random() * 0.72,
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
      r: Math.random() * 1.3 + 0.5,
    }))
    const pointer = { x: 0.72, y: 0.28 }
    let frame = 0

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      const reach = w < 720 ? 110 : 148
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = (a.x - b.x) * w
          const dy = (a.y - b.y) * h
          const dist = Math.hypot(dx, dy)
          if (dist < reach) {
            ctx.strokeStyle = accent.replace(')', `, ${(1 - dist / reach) * 0.38})`).replace(
              'rgb',
              'rgba',
            )
            if (accent.startsWith('#')) {
              const alpha = ((1 - dist / reach) * 0.38).toFixed(3)
              ctx.strokeStyle = hexAlpha(accent, Number(alpha))
            }
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((node, index) => {
        ctx.fillStyle = index === 0 ? accent : 'rgba(239, 234, 224, 0.75)'
        ctx.beginPath()
        ctx.arc(node.x * w, node.y * h, index === 0 ? 2.4 : node.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX / window.innerWidth
      pointer.y = event.clientY / window.innerHeight
    }

    const tick = () => {
      nodes.forEach((node, index) => {
        if (!reduce) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > 1) node.vx *= -1
          if (node.y < 0 || node.y > 0.72) node.vy *= -1
        }
        if (index === 0) {
          node.x += (pointer.x - node.x) * 0.03
          node.y += (pointer.y * 0.55 - node.y) * 0.03
        }
      })
      draw()
      frame = window.requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [accent])

  return <canvas ref={ref} className="launch-field" aria-hidden="true" />
}

function hexAlpha(hex: string, alpha: number) {
  const raw = hex.replace('#', '')
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  const n = Number.parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function PreviewPanel({
  productId,
  accent,
  label,
}: {
  productId: ProductId
  accent: string
  label: string
}) {
  if (productId === 'xoc') {
    const cast = [
      { name: 'Você', tag: '2048', host: true },
      { name: 'Luna', tag: '4812', host: false },
      { name: 'Nico', tag: '1190', host: false },
      { name: 'Iara', tag: '7731', host: false },
    ]
    return (
      <div className="launch-panel">
        <div className="launch-panel-top">
          <strong>Sala ao vivo</strong>
          <span className="launch-pulse">
            <i />
            {label}
          </span>
        </div>
        <div className="launch-nodes">
          {cast.map((person) => (
            <div key={person.tag} className={`launch-node${person.host ? ' is-host' : ''}`}>
              <div className="launch-avatar" style={{ background: person.host ? accent : '#d8d3c6' }}>
                {person.name.slice(0, 1)}
              </div>
              <div>
                <strong>{person.name}</strong>
                <small>{person.host ? 'anfitrião · roteando' : 'conectado'}</small>
              </div>
              <span className="launch-tag">#{person.tag}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const accounts = [
    { name: 'Main', status: 'em foco', host: true },
    { name: 'Farm A', status: 'rodando', host: false },
    { name: 'Farm B', status: 'rodando', host: false },
    { name: 'Alt', status: 'em espera', host: false },
  ]

  return (
    <div className="launch-panel">
      <div className="launch-panel-top">
        <strong>Grade viva</strong>
        <span className="launch-pulse">
          <i />
          {label}
        </span>
      </div>
      <div className="launch-nodes">
        {accounts.map((account) => (
          <div key={account.name} className={`launch-node${account.host ? ' is-host' : ''}`}>
            <div className="launch-avatar" style={{ background: account.host ? accent : '#d8d3c6' }}>
              {account.name.slice(0, 1)}
            </div>
            <div>
              <strong>{account.name}</strong>
              <small>{account.status}</small>
            </div>
            <span className="launch-tag">session</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductLaunch() {
  const { pathname } = useLocation()
  const normalized = pathname.replace(/^\//, '').toLowerCase() as ProductId
  const { lang } = useLang()
  const [here, setHere] = useState('produto')

  const product = IDS.has(normalized) ? products[normalized] : null

  const text = product?.text[lang]
  const links = useMemo(
    () =>
      text
        ? [
            ['produto', lang === 'pt' ? 'Produto' : 'Product'],
            ['caminho', lang === 'pt' ? 'Caminho' : 'Path'],
            ['recursos', lang === 'pt' ? 'Recursos' : 'Features'],
            ['baixar', lang === 'pt' ? 'Baixar' : 'Download'],
          ]
        : [],
    [lang, text],
  )

  useEffect(() => {
    if (!text) return undefined
    const nodes = links
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    const watcher = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setHere(visible.target.id)
      },
      { threshold: [0.25, 0.45], rootMargin: '-18% 0px -42% 0px' },
    )
    nodes.forEach((node) => watcher.observe(node))
    return () => watcher.disconnect()
  }, [links, text])

  if (!product || !text) {
    return <Navigate to="/" replace />
  }

  const style = {
    ['--launch-accent' as string]: product.accent,
    ['--launch-soft' as string]: product.accentSoft,
    ['--launch-glow' as string]: product.glow,
  }

  return (
    <div className="launch" style={style}>
      <Field accent={product.accent} />
      <div className="launch-shell">
        <header className="launch-nav">
          <Link className="launch-brand" to={product.route}>
            <img src={product.mark} alt="" />
            {product.name}
          </Link>
          <nav className="launch-nav-links" aria-label={lang === 'pt' ? 'Seções' : 'Sections'}>
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={here === id ? 'is-on' : ''}
                aria-current={here === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <LangSwitch />
            <span className="launch-chip">Windows</span>
          </div>
        </header>

        <section className="launch-hero launch-wrap" id="produto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/#work"
              className="mb-8 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] text-[#9a9588] uppercase hover:text-[#efeae0]"
            >
              <ArrowLeft className="size-4" />
              {text.back}
            </Link>
            <p className="launch-eyebrow">
              <i />
              {text.eyebrow} · v{product.version}
            </p>
            <h1>
              {text.headline.map((line) => (
                <span key={line} className="block">
                  {line === text.accentWord ? <span className="accent">{line}</span> : line}
                </span>
              ))}
            </h1>
            <p className="launch-lede">{text.lede}</p>
            <div className="launch-actions">
              <a className="launch-btn primary" href={product.downloadUrl} download={product.downloadName}>
                <ArrowDownToLine className="size-4" />
                {text.download}
              </a>
              <a className="launch-btn ghost" href="#caminho">
                {text.secondary}
              </a>
            </div>
            <div className="launch-meta">
              <span>
                <b>{text.windows}</b>
              </span>
              <span>
                <b>{text.size}</b>
              </span>
              <span>{text.live}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PreviewPanel
              productId={product.id}
              accent={product.accent}
              label={lang === 'pt' ? 'simulação' : 'simulation'}
            />
          </motion.div>
        </section>

        <div className="launch-marquee" aria-hidden="true">
          <div className="launch-marquee-track">
            {[...product.ticker, ...product.ticker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="launch-block launch-wrap" id="caminho">
          <p className="launch-kicker">{lang === 'pt' ? 'O caminho' : 'The path'}</p>
          <h2>{text.stepsTitle}</h2>
          <div className="launch-steps">
            {text.steps.map((step) => (
              <article className="launch-step" key={step.n}>
                <b>{step.n}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="launch-block launch-wrap" id="recursos">
          <p className="launch-kicker">{lang === 'pt' ? 'A sala' : 'Inside'}</p>
          <h2>{text.featuresTitle}</h2>
          <div className="launch-bento">
            {text.features.map((feature) => (
              <article className="launch-card" key={feature.k}>
                <p className="k">{feature.k}</p>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="launch-close launch-wrap" id="baixar">
          <p className="launch-kicker">{lang === 'pt' ? 'Download' : 'Download'}</p>
          <h2>{text.closeTitle}</h2>
          <p>{text.closeBody}</p>
          <div className="launch-actions">
            <a className="launch-btn primary" href={product.downloadUrl} download={product.downloadName}>
              <ArrowDownToLine className="size-4" />
              {text.download}
            </a>
          </div>
          <div className="launch-meta" style={{ justifyContent: 'center' }}>
            {product.stack.map((tag) => (
              <span key={tag}>
                <b>{tag}</b>
              </span>
            ))}
          </div>
        </section>

        <footer className="launch-foot">
          <div className="launch-wrap launch-foot-in">
            <Link className="launch-brand" to={product.route}>
              <img src={product.mark} alt="" />
              {product.name}
            </Link>
            <span>
              {product.name} · v{product.version} · juliojorge.dev
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
