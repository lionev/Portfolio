import { useLang } from '../i18n/LanguageContext'
import type { Lang } from '../data/content'

const options: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'pt', label: 'PT' },
]

export default function LangSwitch() {
  const { lang, setLang, t } = useLang()

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="border-line flex h-8 shrink-0 items-center rounded-full border p-0.5"
    >
      {options.map((option) => {
        const active = lang === option.id
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(option.id)}
            className={`inline-flex h-full min-w-9 items-center justify-center rounded-full px-2.5 text-[11px] tracking-[0.16em] transition-colors ${
              active ? 'bg-paper text-ink' : 'text-mute hover:text-paper bg-transparent'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
