import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'

type Variant = 'nav' | 'hero'

export default function GithubLink({ variant }: { variant: Variant }) {
  const { t } = useLang()
  if (!profile.github) return null

  const nav = variant === 'nav'

  return (
    <a
      href={profile.github}
      target="_blank"
      rel="noreferrer"
      title={t.cv.githubTitle}
      className={
        nav
          ? 'border-line hover:border-paper relative z-50 inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-[11px] font-semibold tracking-[0.14em]'
          : 'border-line hover:border-paper inline-flex items-center rounded-full border px-5 py-2.5 text-sm'
      }
    >
      {nav ? t.cv.githubShort : t.cv.github}
    </a>
  )
}
