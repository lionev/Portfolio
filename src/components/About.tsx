import { education, profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

export default function About() {
  const { lang, t } = useLang()

  return (
    <section id="about" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.about.kicker}</p>
          <h2 className="font-serif text-5xl tracking-tight md:text-6xl">
            {t.about.title}
            <span className="italic"> {t.about.titleItalic}</span>
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[#d4cfc2]">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p className="text-mute text-sm tracking-wide">
              English {profile.english} · Recife · {profile.handle}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border-line bg-ink-2/50 rounded-2xl border p-7">
            <p className="text-mute mb-6 text-[11px] tracking-[0.28em] uppercase">{t.about.education}</p>
            <ul className="space-y-6">
              {education.map((item) => (
                <li key={item[lang].title}>
                  <h3 className="text-lg font-medium">{item[lang].title}</h3>
                  <p className="text-acid mt-1 text-sm">{item.place}</p>
                  <p className="text-mute mt-1 text-sm">{item[lang].period}</p>
                  {('href' in item && item.href) || (item.place === 'Salesforce Trailhead' && profile.trailhead) ? (
                    <a
                      href={('href' in item && item.href) || profile.trailhead}
                      target="_blank"
                      rel="noreferrer"
                      className="text-acid mt-2 inline-block text-sm underline-offset-4 hover:underline"
                    >
                      {item.place === 'Salesforce Trailhead' ? t.contact.trailhead : t.about.certificate}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
