import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'
import Magnetic from './Magnetic'

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.contact.kicker}</p>
          <h2 className="font-serif text-5xl tracking-tight md:text-7xl">{t.contact.title}</h2>
          <p className="text-mute mt-5 max-w-lg text-lg">{t.contact.body}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Magnetic
              href={`mailto:${profile.email}`}
              className="btn-acid rounded-full px-6 py-3 text-sm font-semibold"
            >
              {profile.email}
              <ArrowUpRight className="ml-2 size-4" />
            </Magnetic>
            <Magnetic
              href={profile.linkedin}
              className="border-line hover:border-paper rounded-full border px-6 py-3 text-sm"
            >
              LinkedIn
            </Magnetic>
            <Magnetic
              href={profile.github}
              className="border-line hover:border-paper rounded-full border px-6 py-3 text-sm"
            >
              GitHub
            </Magnetic>
            {profile.trailhead ? (
              <Magnetic
                href={profile.trailhead}
                className="border-line hover:border-paper rounded-full border px-6 py-3 text-sm"
              >
                {t.contact.trailhead}
              </Magnetic>
            ) : null}
            <Magnetic
              href={profile.phoneHref}
              className="border-line hover:border-paper rounded-full border px-6 py-3 text-sm"
            >
              {profile.phone}
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
