import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { introTechs, techColor } from '../data/introTechs'
import { useLang } from '../i18n/LanguageContext'

const floaters = [
  { i: 0, className: 'top-[16%] left-[3%]', size: 58 },
  { i: 1, className: 'top-[12%] right-[5%]', size: 50 },
  { i: 2, className: 'top-[40%] right-[4%]', size: 54 },
  { i: 4, className: 'bottom-[24%] left-[4%]', size: 46 },
  { i: 9, className: 'bottom-[26%] right-[7%]', size: 48 },
  { i: 10, className: 'top-[58%] left-[4%]', size: 52 },
]

const words = {
  en: ['Full Stack', 'Trailhead', 'juliojorge.dev'],
  pt: ['Full Stack', 'Trailhead', 'juliojorge.dev'],
}

export default function Intro() {
  const reduce = useReducedMotion()
  const { lang, t } = useLang()
  const [open, setOpen] = useState(() => !reduce)
  const [word, setWord] = useState(0)
  const closing = useRef(false)
  const touchY = useRef<number | null>(null)

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
    }, 900)
    return () => window.clearInterval(id)
  }, [open, lang])

  if (reduce) return null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="intro"
          role="presentation"
          aria-hidden
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

          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {floaters.map(({ i, className, size }) => {
              const tech = introTechs[i]
              return (
                <motion.div
                  key={`float-${tech.title}`}
                  className={`absolute ${className}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.22, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { delay: 0.35 + i * 0.08, duration: 0.6 },
                    scale: { delay: 0.35 + i * 0.08, duration: 0.6 },
                    y: { duration: 3.2 + (i % 4) * 0.3, repeat: Infinity, ease: 'easeInOut' },
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
            <div className="flex items-start justify-between text-[11px] tracking-[0.32em] uppercase">
              <motion.span
                className="text-acid"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                JJ
              </motion.span>
              <motion.span
                className="text-mute"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t.hero.role}
              </motion.span>
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
                    transition={{ duration: 0.35 }}
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
              <div className="mt-7 flex max-w-xl flex-wrap items-center gap-2 md:gap-2.5">
                {introTechs.map((tech, i) => (
                  <motion.div
                    key={tech.title}
                    title={tech.title}
                    className="border-line/80 grid size-9 place-items-center rounded-full border bg-ink-2/70 md:size-11"
                    initial={{ scale: 0, opacity: 0, y: 14 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.42 + i * 0.07,
                      type: 'spring',
                      stiffness: 280,
                      damping: 16,
                    }}
                    style={{ color: techColor(tech.hex) }}
                  >
                    <motion.span
                      className="grid place-items-center"
                      animate={{ y: [0, -4, 0] }}
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
                  </motion.div>
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
