import { motion } from 'motion/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { featured } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Cover from '../components/Cover'
import ShotCarousel from '../components/ShotCarousel'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ProjectPage() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const project = featured.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const text = project.text[lang]
  const gallery = 'gallery' in project ? project.gallery : undefined

  return (
    <div className="relative z-10">
      <Nav />
      <article className="mx-auto max-w-6xl px-5 pt-28 pb-20 md:px-8 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/#work"
            className="text-mute hover:text-paper mb-10 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="size-4" />
            {t.project.back}
          </Link>
          <p className="text-acid text-[11px] tracking-[0.32em] uppercase">
            {project.number} · {text.kicker}
          </p>
          <h1 className="font-serif mt-3 text-6xl tracking-tight md:text-8xl">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#d8d3c6]">{text.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-acid inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                {t.project.live}
                <ArrowUpRight className="ml-1.5 size-4" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="border-line hover:border-paper inline-flex items-center rounded-full border px-5 py-2.5 text-sm"
              >
                {t.project.repo}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {gallery ? (
            <ShotCarousel shots={gallery} accent={project.accent} />
          ) : (
            <Cover slug={project.slug} accent={project.accent} tall />
          )}
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            className="space-y-5 text-[16px] leading-relaxed text-[#d4cfc2]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
          >
            {text.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
          >
            <div>
              <p className="text-mute mb-4 text-[11px] tracking-[0.28em] uppercase">{t.project.highlights}</p>
              <ul className="space-y-3">
                {text.highlights.map((item) => (
                  <li key={item} className="border-line flex gap-3 border-b py-3 text-sm">
                    <span className="text-acid">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-mute mt-8 text-[11px] tracking-[0.28em] uppercase">{t.project.stack}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="border-line rounded-full border px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </div>
  )
}
