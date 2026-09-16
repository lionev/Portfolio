import { skillGroups } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

const marquee = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Python',
  'C#',
  'Tailwind',
  'Prisma',
  'LDAP',
  'BGP',
  'OpenCV',
  'WPF',
]

export default function Skills() {
  const { t } = useLang()

  return (
    <section id="stack" className="py-16">
      <div className="border-line border-y py-5 overflow-hidden">
        <div className="marquee-track flex w-max gap-10 pr-10 text-[11px] tracking-[0.32em] uppercase">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`} className="text-mute flex items-center gap-10">
              {item}
              <span className="text-acid">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.stack.kicker}</p>
          <h2 className="font-serif mb-12 text-5xl tracking-tight md:text-6xl">{t.stack.title}</h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.key} delay={i * 0.08}>
              <div className="border-line rounded-2xl border p-6">
                <h3 className="font-serif mb-5 text-2xl italic">{t.stack.groups[group.key]}</h3>
                <ul className="space-y-2 text-sm text-[#d0cbbd]">
                  {group.items.map((item) => (
                    <li key={item} className="border-line/70 flex items-center gap-3 border-b py-1.5 last:border-0">
                      <span className="bg-acid size-1 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
