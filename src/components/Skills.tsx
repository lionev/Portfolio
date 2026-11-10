import { useAutoAnimate } from '@formkit/auto-animate/react'
import { animate, stagger } from 'animejs'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { skillGroups } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

const marquee = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'Electron',
  'WebRTC',
  'Python',
  'C#',
  'OpenCV',
  'Salesforce',
  'Apex',
  'Mercado Pago',
]

function SkillList({ items }: { items: readonly string[] }) {
  const [parent] = useAutoAnimate({ duration: 280, easing: 'ease-out' })
  return (
    <ul ref={parent} className="space-y-2 text-sm text-[#d0cbbd]">
      {items.map((item) => (
        <li key={item} className="border-line/70 flex items-center gap-3 border-b py-1.5 last:border-0">
          <span className="bg-acid size-1 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Skills() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-skill-card]')
    const anim = animate(cards, {
      opacity: [0, 1],
      y: [48, 0],
      rotate: [4, 0],
      scale: [0.9, 1],
      delay: stagger(140),
      duration: 900,
      ease: 'out(3)',
      autoplay: false,
    })

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          anim.play()
          io.disconnect()
        }
      },
      { threshold: 0.18 },
    )
    io.observe(gridRef.current)
    return () => {
      io.disconnect()
      anim.revert()
    }
  }, [reduce, t.stack.title])

  return (
    <section id="stack" className="py-16">
      <div className="border-line overflow-hidden border-y py-5">
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
        <div ref={gridRef} className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              data-skill-card
              className={`border-line rounded-2xl border p-6 ${reduce ? '' : 'opacity-0'}`}
            >
              <h3 className="font-serif mb-5 text-2xl italic">{t.stack.groups[group.key]}</h3>
              <SkillList items={group.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
