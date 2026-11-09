import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { products, type ProductId } from '../data/products'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from '../components/LangSwitch'
import Constellation from '../components/Constellation'
import './ProductLaunch.css'

const IDS = new Set<ProductId>(['xoc', 'pokedeck'])

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
            ['projeto', lang === 'pt' ? 'Projeto' : 'Project'],
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
      <Constellation accent={product.accent} className="launch-field" />
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
              <a className="launch-btn primary" href="#caminho">
                {text.secondary}
              </a>
              <a className="launch-btn ghost" href="#projeto">
                {lang === 'pt' ? 'Ver o projeto' : 'See the project'}
              </a>
            </div>
            <div className="launch-meta">
              <span>
                <b>{text.windows}</b>
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

        <section className="launch-close launch-wrap" id="projeto">
          <p className="launch-kicker">{lang === 'pt' ? 'Projeto' : 'Project'}</p>
          <h2>{text.closeTitle}</h2>
          <p>{text.closeBody}</p>
          <div className="launch-actions">
            <Link className="launch-btn primary" to="/#work">
              {lang === 'pt' ? 'Voltar aos projetos' : 'Back to work'}
            </Link>
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
