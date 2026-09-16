import { experience } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

export default function Experience() {
  const { lang, t } = useLang()

  return (
    <section id="experience" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.experience.kicker}</p>
          <h2 className="font-serif mb-16 text-5xl tracking-tight md:text-7xl">
            {t.experience.title}
            <span className="text-mute/70 italic"> {t.experience.titleItalic}</span>
          </h2>
        </Reveal>

        <ol className="relative">
          {experience.map((job, index) => {
            const text = job[lang]
            return (
              <Reveal key={`${job.org}-${text.role}`} delay={index * 0.04}>
                <li className="border-line grid gap-3 border-t py-8 md:grid-cols-[180px_1fr_200px] md:gap-10">
                  <p className="text-mute text-[12px] tracking-[0.12em] uppercase">{text.period}</p>
                  <div>
                    <h3 className="text-xl font-medium">{text.role}</h3>
                    <p className="text-acid mt-1 text-sm tracking-wide">
                      {job.org}
                      <span className="text-mute"> · {text.location}</span>
                    </p>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#d0cbbd]">{text.detail}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-mute text-[11px] tracking-wide uppercase">
                          {tag}
                          {tag !== job.tags[job.tags.length - 1] ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-mute hidden text-right font-serif text-4xl md:block">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
