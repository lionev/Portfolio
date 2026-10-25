import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
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

const HOLD_MS = 5000
const words = {
  en: ['Recife', 'Full Stack', 'Salesforce', 'juliojorge.dev'],
  pt: ['Recife', 'Full Stack', 'Salesforce', 'juliojorge.dev'],
}

export default function Intro() {
  const reduce = useReducedMotion()
  const { lang, t } = useLang()
  const [open, setOpen] = useState(() => !reduce)
  const [count, setCount] = useState(0)
  const [word, setWord] = useState(0)

  const close = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    if (reduce || !open) return
    document.body.style.overflow = 'hidden'
    const done = window.setTimeout(close, HOLD_MS)
    return () => {
      window.clearTimeout(done)
      document.body.style.overflow = ''
    }
  }, [open, reduce])

  useEffect(() => {
    if (!open) return
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / 4200)
      setCount(Math.round(p * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [open])

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
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
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
              <div className="overflow-hidden">
                <motion.h1
                  className="font-serif text-7xl leading-[0.82] tracking-[-0.05em] sm:text-8xl md:text-[10rem]"
                  initial={{ y: '120%', rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Julio
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="text-mute/75 font-serif text-7xl leading-[0.82] tracking-[-0.05em] italic sm:text-8xl md:text-[10rem]"
                  initial={{ y: '120%', rotate: -3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  Jorge
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

            <div className="flex items-end justify-between gap-6">
              <motion.p
                className="font-serif text-5xl tracking-tight tabular-nums md:text-7xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {String(count).padStart(3, '0')}
              </motion.p>
              <motion.p
                className="text-mute max-w-[10rem] text-right text-[11px] leading-relaxed tracking-[0.18em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Recife · PE
              </motion.p>
            </div>
          </div>

          <motion.div
            className="bg-acid absolute right-0 bottom-0 left-0 h-[3px] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: 'linear' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
