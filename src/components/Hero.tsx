import { motion } from 'motion/react'
import { ArrowDownRight } from 'lucide-react'
import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Magnetic from './Magnetic'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-4 text-[11px] tracking-[0.28em] uppercase">
          <span className="text-mute">{profile.location}</span>
          <span className="flex items-center gap-2">
            <span className="bg-acid size-1.5 animate-pulse rounded-full" />
            <span className="hidden sm:inline">{t.hero.open}</span>
          </span>
        </div>

        <motion.h1
          className="font-serif text-6xl leading-[0.9] tracking-[-0.04em] sm:text-8xl md:text-[9.5rem]"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Julio</span>
          <span className="text-mute/80 block italic">Jorge</span>
        </motion.h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="text-acid mb-3 text-[11px] tracking-[0.2em] uppercase sm:tracking-[0.32em]">
              {t.hero.role}
            </p>
            <p className="max-w-xl text-lg leading-relaxed font-light md:text-3xl">{t.hero.lead}</p>
          </motion.div>
          <motion.div
            className="max-w-md md:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
          >
            <p className="text-mute text-[15px] leading-relaxed">{t.hero.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic
                href="#work"
                className="bg-paper text-ink hover:bg-acid rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                {t.hero.selected}
                <ArrowDownRight className="ml-1.5 size-4" />
              </Magnetic>
              <a
                href={profile.cv}
                download
                className="border-line hover:border-paper inline-flex rounded-full border px-5 py-2.5 text-sm"
              >
                {t.hero.download}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
