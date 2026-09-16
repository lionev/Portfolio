import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'
import CvDownload from './CvDownload'

export default function Nav() {
  const { pathname } = useLocation()
  const { t } = useLang()
  const home = pathname === '/'
  const links = [
    { href: '/#work', label: t.nav.work },
    { href: '/#experience', label: t.nav.experience },
    { href: '/#stack', label: t.nav.stack },
    { href: '/#about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-line/80 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight">JJ</span>
          <span className="text-mute hidden text-[11px] tracking-[0.22em] uppercase sm:inline">
            {profile.handle}
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase sm:gap-4 sm:text-[12px] sm:tracking-[0.18em] md:gap-6">
          {links.map((item) => (
            <a
              key={item.href}
              href={home ? item.href.slice(1) : item.href}
              className="text-mute hover:text-paper hidden transition-colors md:inline"
            >
              {item.label}
            </a>
          ))}
          <LangSwitch />
          <CvDownload variant="nav" />
        </nav>
      </div>
    </header>
  )
}
