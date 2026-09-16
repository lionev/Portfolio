import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { copy, type Lang } from '../data/content'

const STORAGE_KEY = 'jj-lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof copy)[Lang]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') return saved
  } catch {
    /* ignore */
  }
  const locale = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase()
  return locale.startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title =
      lang === 'pt' ? 'Julio Jorge — Desenvolvedor Full Stack' : 'Julio Jorge — Full Stack Developer'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', copy[lang].metaDescription)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: copy[lang],
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
