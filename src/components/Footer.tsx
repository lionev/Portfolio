import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-line text-mute mx-auto flex max-w-6xl items-center justify-between border-t px-5 py-8 text-[11px] tracking-[0.18em] uppercase md:px-8">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>{t.footer}</span>
    </footer>
  )
}
