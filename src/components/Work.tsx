import { Link } from 'react-router-dom'
import { featured } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'
import Cover from './Cover'

export default function Work() {
  const { lang, t } = useLang()

  return (
    <section id="work" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.work.kicker}</p>
              <h2 className="font-serif text-5xl tracking-tight md:text-7xl">{t.work.title}</h2>
            </div>
            <p className="text-mute hidden max-w-xs text-right text-sm md:block">{t.work.aside}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project, index) => {
            const text = project.text[lang]
            return (
              <Reveal key={project.slug} delay={index * 0.08}>
                <Link
                  to={`/work/${project.slug}`}
                  className="group border-line/80 hover:border-paper/25 bg-ink-2/60 block overflow-hidden rounded-2xl border"
                >
                  <Cover slug={project.slug} accent={project.accent} />
                  <div className="p-6 md:p-7">
                    <div className="text-mute mb-3 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase">
                      <span>{project.number}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-serif group-hover:text-acid text-3xl tracking-tight transition-colors md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="text-mute mt-1 text-xs tracking-[0.16em] uppercase">{text.kicker}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#d8d3c6]">{text.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border-line text-mute rounded-full border px-2.5 py-1 text-[10px] tracking-wide uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
