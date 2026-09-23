import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'

type Variant = 'nav' | 'hero'

export default function CvDownload({ variant }: { variant: Variant }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const nav = variant === 'nav'
  const options = [
    { href: profile.cv.pt, file: 'JulioJorge.pdf', label: t.cv.portuguese },
    { href: profile.cv.en, file: 'JulioJorgeResume.pdf', label: t.cv.english },
  ]

  return (
    <div ref={rootRef} className={`relative ${nav ? 'shrink-0' : 'inline-flex'}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={
          nav
            ? 'btn-acid relative z-50 inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 font-semibold tracking-[0.14em]'
            : 'border-line hover:border-paper inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm'
        }
      >
        {nav ? t.cv.short : t.cv.download}
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={t.cv.choose}
          className={`border-line absolute z-50 mt-2 min-w-48 overflow-hidden rounded-2xl border bg-ink-2/95 p-1 shadow-xl backdrop-blur-md ${
            nav ? 'right-0' : 'left-0'
          }`}
        >
          <p className="text-mute px-3 pt-2 pb-1 text-[10px] tracking-[0.18em] uppercase">{t.cv.choose}</p>
          {options.map((option) => (
            <a
              key={option.href}
              role="menuitem"
              href={option.href}
              download={option.file}
              onClick={() => setOpen(false)}
              className="hover:bg-paper/10 hover:text-acid block rounded-xl px-3 py-2 text-sm tracking-wide"
            >
              {option.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}
