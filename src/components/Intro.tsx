import { animate, stagger } from 'animejs'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { introTechs, techColor } from '../data/introTechs'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'

const floaters = [
  { i: 0, className: 'top-[11%] left-[3%]', size: 52 },
  { i: 1, className: 'top-[9%] right-[5%]', size: 46 },
  { i: 2, className: 'top-[7%] left-[20%]', size: 34 },
  { i: 3, className: 'top-[8%] right-[20%]', size: 36 },
  { i: 4, className: 'top-[22%] left-[2%]', size: 42 },
  { i: 5, className: 'top-[24%] right-[3%]', size: 44 },
  { i: 6, className: 'top-[26%] left-[13%]', size: 30 },
  { i: 7, className: 'top-[28%] right-[14%]', size: 32 },
  { i: 8, className: 'top-[40%] left-[4%]', size: 40 },
  { i: 9, className: 'top-[42%] right-[5%]', size: 48 },
  { i: 10, className: 'top-[54%] left-[2%]', size: 38 },
  { i: 11, className: 'top-[56%] right-[3%]', size: 36 },
  { i: 12, className: 'top-[66%] left-[10%]', size: 34 },
  { i: 13, className: 'top-[68%] right-[11%]', size: 40 },
  { i: 14, className: 'bottom-[16%] left-[4%]', size: 44 },
  { i: 15, className: 'bottom-[14%] right-[6%]', size: 42 },
  { i: 16, className: 'bottom-[20%] left-[22%]', size: 30 },
  { i: 17, className: 'bottom-[18%] right-[22%]', size: 32 },
  { i: 18, className: 'top-[18%] left-[28%]', size: 28 },
  { i: 0, className: 'top-[16%] right-[28%]', size: 28 },
]

const words = {
  en: ['Full Stack', 'Salesforce', 'juliojorge.dev'],
  pt: ['Full Stack', 'Salesforce', 'juliojorge.dev'],
}

export default function Intro() {
  const reduce = useReducedMotion()
  const { lang, t } = useLang()
  const [open, setOpen] = useState(() => !reduce)
  const [word, setWord] = useState(0)
  const closing = useRef(false)
  const touchY = useRef<number | null>(null)
  const techRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || reduce) return
    let chipAnim: ReturnType<typeof animate> | null = null
    let floatAnim: ReturnType<typeof animate> | null = null
    const timer = window.setTimeout(() => {
      const chips = techRowRef.current?.querySelectorAll('[data-intro-tech]')
      const floats = document.querySelectorAll('[data-intro-float]')
      if (chips?.length) {
        chipAnim = animate(chips, {
          opacity: [0, 1],
          scale: [0.4, 1],
          y: [24, 0],
          delay: stagger(55),
          duration: 720,
          ease: 'out(3)',
        })
      }
      if (floats.length) {
        floatAnim = animate(floats, {
          opacity: [0, 0.45],
          scale: [0.5, 1],
          delay: stagger(40),
          duration: 900,
          ease: 'out(3)',
        })
      }
    }, 120)
    return () => {
      window.clearTimeout(timer)
      chipAnim?.revert()
      floatAnim?.revert()
    }
  }, [open, reduce])

  const close = () => {
    if (closing.current) return
    closing.current = true
    window.scrollTo(0, 0)
    setOpen(false)
  }

  useEffect(() => {
    if (reduce) return

    document.body.style.overflow = 'hidden'
    const pin = () => window.scrollTo(0, 0)
    const block = (event: Event) => {
      event.preventDefault()
      pin()
    }

    if (open) {
      const onWheel = (event: WheelEvent) => {
        event.preventDefault()
        if (event.deltaY > 8) close()
      }

      const onTouchStart = (event: TouchEvent) => {
        touchY.current = event.touches[0]?.clientY ?? null
      }

      const onTouchMove = (event: TouchEvent) => {
        event.preventDefault()
        const start = touchY.current
        const now = event.touches[0]?.clientY
        if (start == null || now == null) return
        if (start - now > 24) close()
      }

      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
          event.preventDefault()
          close()
        }
      }

      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('keydown', onKey)

      return () => {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('keydown', onKey)
      }
    }

    pin()
    window.addEventListener('wheel', block, { passive: false })
    window.addEventListener('touchmove', block, { passive: false })
    window.addEventListener('scroll', pin, { passive: false })
    const unlock = window.setTimeout(() => {
      document.body.style.overflow = ''
      window.removeEventListener('wheel', block)
      window.removeEventListener('touchmove', block)
      window.removeEventListener('scroll', pin)
      pin()
    }, 1100)

    return () => {
      window.clearTimeout(unlock)
      window.removeEventListener('wheel', block)
      window.removeEventListener('touchmove', block)
      window.removeEventListener('scroll', pin)
      document.body.style.overflow = ''
    }
  }, [open, reduce])

  useEffect(() => {
    if (!open) return
    const id = window.setInterval(() => {
      setWord((i) => (i + 1) % words[lang].length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [open, lang])

  if (reduce) return null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] overflow-hidden bg-ink"
          exit={{
            y: '-110%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="cover-grid pointer-events-none absolute inset-0 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,255,63,0.16), transparent 58%)',
            }}
          />

          <motion.div
            className="bg-acid absolute top-0 left-0 h-full w-1 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {floaters.map(({ i, className, size }, spot) => {
              const tech = introTechs[i % introTechs.length]
              return (
                <motion.div
                  key={`float-${spot}-${tech.title}`}
                  data-intro-float
                  className={`absolute opacity-0 ${className}`}
                  animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
                  transition={{
                    y: { duration: 3.2 + (spot % 4) * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 5 + (spot % 3), repeat: Infinity, ease: 'easeInOut' },
                  }}
                  style={{ color: techColor(tech.hex) }}
                >
                  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
                    <path fill="currentColor" d={tech.path} />
                  </svg>
                </motion.div>
              )
            })}
          </div>

          <div className="relative flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10">
            <div className="flex items-start justify-between gap-4 text-[11px] tracking-[0.32em] uppercase">
              <motion.span
                className="text-acid"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                JJ
              </motion.span>
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-mute hidden sm:inline">{t.hero.role}</span>
                <LangSwitch />
              </motion.div>
            </div>

            <div>
              <div className="mb-4 h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${lang}-${word}`}
                    className="text-acid text-[11px] tracking-[0.36em] uppercase"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.55 }}
                  >
                    {words[lang][word]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="overflow-hidden pb-[0.22em]">
                <motion.h1
                  className="font-serif flex flex-row flex-nowrap items-end gap-[0.28em] text-5xl leading-none tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[8rem]"
                  initial={{ y: '120%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="pb-[0.06em]">Julio</span>
                  <span className="text-mute/75 pb-[0.06em] italic">Jorge</span>
                </motion.h1>
              </div>
              <motion.div
                className="bg-acid mt-8 h-[2px] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                ref={techRowRef}
                className="mt-7 flex max-w-3xl flex-wrap items-center gap-2 md:gap-2.5"
              >
                {introTechs.map((tech, i) => (
                  <div
                    key={tech.title}
                    data-intro-tech
                    title={tech.title}
                    className="border-line/80 grid size-9 place-items-center rounded-full border bg-ink-2/70 opacity-0 md:size-11"
                    style={{ color: techColor(tech.hex) }}
                  >
                    <motion.span
                      className="grid place-items-center"
                      animate={{ y: [0, -5, 0], rotate: [0, -8, 8, 0] }}
                      transition={{
                        duration: 2.1 + (i % 5) * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="size-4 md:size-5" aria-hidden>
                        <path fill="currentColor" d={tech.path} />
                      </svg>
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={close}
              className="text-mute hover:text-paper flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="text-acid size-3.5" />
              </motion.span>
              {t.intro.scroll}
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
