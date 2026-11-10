import { animate, stagger } from 'animejs'
import { ArrowDownRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import CvDownload from './CvDownload'
import GithubLink from './GithubLink'
import Magnetic from './Magnetic'
import TrailheadLink from './TrailheadLink'

export default function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduce || !rootRef.current) return
    const root = rootRef.current
    const letters = root.querySelectorAll('[data-hero-letter]')
    const lines = root.querySelectorAll('[data-hero-line]')
    const ctas = root.querySelectorAll('[data-hero-cta]')

    const letterAnim = animate(letters, {
      opacity: [0, 1],
      y: [48, 0],
      rotate: [8, 0],
      delay: stagger(45, { start: 120 }),
      duration: 900,
      ease: 'out(3)',
    })
    const lineAnim = animate(lines, {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(120, { start: 520 }),
      duration: 780,
      ease: 'out(3)',
    })
    const ctaAnim = animate(ctas, {
      opacity: [0, 1],
      scale: [0.88, 1],
      y: [16, 0],
      delay: stagger(90, { start: 780 }),
      duration: 650,
      ease: 'out(3)',
    })

    return () => {
      letterAnim.revert()
      lineAnim.revert()
      ctaAnim.revert()
    }
  }, [reduce, t.hero.selected, t.hero.lead, t.hero.body])

  const julio = 'Julio'.split('')
  const jorge = 'Jorge'.split('')

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <div
          data-hero-line
          className={`mb-10 flex items-center justify-end gap-4 text-[11px] tracking-[0.28em] uppercase ${reduce ? '' : 'opacity-0'}`}
        >
          <span className="flex items-center gap-2">
            <span className="bg-acid size-1.5 animate-pulse rounded-full" />
            <span>{t.hero.open}</span>
          </span>
        </div>

        <h1 className="font-serif flex flex-row flex-nowrap items-end gap-[0.28em] text-5xl leading-none tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <span className="inline-flex pb-[0.06em]">
            {julio.map((ch, i) => (
              <span
                key={`j-${i}`}
                data-hero-letter
                className={`inline-block ${reduce ? '' : 'opacity-0'}`}
              >
                {ch}
              </span>
            ))}
          </span>
          <span className="text-mute/80 inline-flex pb-[0.06em] italic">
            {jorge.map((ch, i) => (
              <span
                key={`g-${i}`}
                data-hero-letter
                className={`inline-block ${reduce ? '' : 'opacity-0'}`}
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div data-hero-line className={reduce ? undefined : 'opacity-0'}>
            <p className="text-acid mb-3 text-[11px] tracking-[0.2em] uppercase sm:tracking-[0.32em]">
              {t.hero.role}
            </p>
            <p className="max-w-xl text-lg leading-relaxed font-light md:text-3xl">{t.hero.lead}</p>
          </div>
          <div
            data-hero-line
            className={`max-w-md md:justify-self-end ${reduce ? '' : 'opacity-0'}`}
          >
            <p className="text-mute text-[15px] leading-relaxed">{t.hero.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span data-hero-cta className={reduce ? undefined : 'opacity-0'}>
                <Magnetic
                  href="#work"
                  className="bg-paper text-ink hover:bg-acid rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  {t.hero.selected}
                  <ArrowDownRight className="ml-1.5 size-4" />
                </Magnetic>
              </span>
              <span data-hero-cta className={reduce ? undefined : 'opacity-0'}>
                <TrailheadLink variant="hero" />
              </span>
              <span data-hero-cta className={reduce ? undefined : 'opacity-0'}>
                <GithubLink variant="hero" />
              </span>
              <span data-hero-cta className={reduce ? undefined : 'opacity-0'}>
                <CvDownload variant="hero" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
