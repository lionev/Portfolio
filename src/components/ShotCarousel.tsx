import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

type Shot = {
  src: string
  en: string
  pt: string
}

type Props = {
  shots: readonly Shot[]
  accent: string
}

export default function ShotCarousel({ shots, accent }: Props) {
  const { lang, t } = useLang()
  const [index, setIndex] = useState(0)
  const current = shots[index]
  const caption = current[lang]

  const go = (dir: -1 | 1) => {
    setIndex((value) => (value + dir + shots.length) % shots.length)
  }

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="relative bg-[#0c0e14]">
        <img
          key={current.src}
          src={current.src}
          alt={caption}
          className="h-[42vh] min-h-64 w-full object-cover object-top md:h-[28rem]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }}
        />
        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.project.prevShot}
              className="border-line/80 bg-ink/70 hover:bg-ink absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-sm"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.project.nextShot}
              className="border-line/80 bg-ink/70 hover:bg-ink absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-sm"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
      <div className="border-line bg-ink-2/80 flex items-center justify-between gap-4 border-x border-b px-4 py-3">
        <p className="text-mute text-sm">{caption}</p>
        <div className="flex gap-1.5">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              aria-label={shot[lang]}
              aria-current={i === index ? true : undefined}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'bg-acid w-6' : 'bg-mute/40 hover:bg-mute w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
