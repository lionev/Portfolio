import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'

type Variant = 'nav' | 'hero'

export default function TrailheadLink({ variant }: { variant: Variant }) {
  const { t } = useLang()
  if (!profile.trailhead) return null

  const nav = variant === 'nav'

  return (
    <a
      href={profile.trailhead}
      target="_blank"
      rel="noreferrer"
      title={t.cv.trailheadTitle}
      className={
        nav
          ? 'border-line hover:border-paper relative z-50 inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 font-semibold tracking-[0.14em]'
          : 'border-line hover:border-paper inline-flex items-center rounded-full border px-5 py-2.5 text-sm'
      }
    >
      {nav ? t.cv.trailheadShort : t.cv.trailhead}
    </a>
  )
}
