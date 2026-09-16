import { moreWork } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'
import { ArrowUpRight } from 'lucide-react'

export default function MoreWork() {
  const { lang, t } = useLang()

  return (
    <section className="px-5 pb-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-mute mb-6 text-[11px] tracking-[0.28em] uppercase">{t.more}</p>
        </Reveal>
        <div className="border-line divide-line divide-y border-y">
          {moreWork.map((item) => (
            <Reveal key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group hover:bg-paper/[0.03] flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-serif group-hover:text-acid text-2xl tracking-tight transition-colors">
                    {item.name}
                  </h3>
                  <ArrowUpRight className="text-mute group-hover:text-acid size-4 opacity-0 transition group-hover:opacity-100" />
                </div>
                <p className="text-mute max-w-md text-sm md:text-right">{item.blurb[lang]}</p>
                <p className="text-[11px] tracking-[0.16em] text-[#6f6b60] uppercase md:w-56 md:text-right">
                  {item.stack}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
