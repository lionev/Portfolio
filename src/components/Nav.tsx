import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'
import CvDownload from './CvDownload'
import TrailheadLink from './TrailheadLink'

const sectionIds = ['home', 'work', 'experience', 'stack', 'about', 'contact'] as const

export default function Nav() {
  const { pathname } = useLocation()
  const { t } = useLang()
  const home = pathname === '/'
  const [active, setActive] = useState('home')
  const links = [
    { id: 'home', href: '/#home', label: t.nav.home },
    { id: 'work', href: '/#work', label: t.nav.work },
    { id: 'experience', href: '/#experience', label: t.nav.experience },
    { id: 'stack', href: '/#stack', label: t.nav.stack },
    { id: 'about', href: '/#about', label: t.nav.about },
    { id: 'contact', href: '/#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    if (pathname.startsWith('/work/')) {
      setActive('work')
      return
    }
    if (!home) {
      setActive('')
      return
    }

    const update = () => {
      const marker = 120
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [home, pathname])

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-line/80 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link to="/#home" className="group flex items-baseline gap-2" onClick={() => setActive('home')}>
          <span className="font-serif text-2xl tracking-tight">JJ</span>
          <span className="text-mute hidden text-[11px] tracking-[0.22em] uppercase sm:inline">
            {profile.handle}
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase sm:gap-4 sm:text-[12px] sm:tracking-[0.18em] md:gap-6">
          {links.map((item) => {
            const on = active === item.id
            return (
              <a
                key={item.href}
                href={home ? item.href.slice(1) : item.href}
                onClick={() => setActive(item.id)}
                className={`relative hidden transition-colors md:inline ${
                  on ? 'text-paper' : 'text-mute hover:text-paper'
                }`}
              >
                {item.label}
                <span
                  className={`bg-acid absolute inset-x-0 -bottom-1 h-[2px] origin-left transition-transform duration-300 ${
                    on ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
          <LangSwitch />
          <CvDownload variant="nav" />
          <TrailheadLink variant="nav" />
        </nav>
      </div>
    </header>
  )
}
