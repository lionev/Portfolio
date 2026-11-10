import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'
import CvDownload from './CvDownload'
import GithubLink from './GithubLink'
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          to="/#home"
          onClick={() => setActive('home')}
          className="font-serif text-2xl leading-none tracking-tight"
          aria-label="JJ"
        >
          JJ
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <nav className="hidden items-center gap-5 text-[11px] tracking-[0.16em] uppercase md:flex md:text-[12px] md:tracking-[0.18em]">
            {links.map((item) => {
              const on = active === item.id
              return (
                <a
                  key={item.href}
                  href={home ? item.href.slice(1) : item.href}
                  onClick={() => setActive(item.id)}
                  className={`relative inline-flex h-8 items-center transition-colors ${
                    on ? 'text-paper' : 'text-mute hover:text-paper'
                  }`}
                >
                  {item.label}
                  <span
                    className={`bg-acid absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ${
                      on ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </nav>
          <div className="flex h-8 items-center gap-2">
            <LangSwitch />
            <TrailheadLink variant="nav" />
            <GithubLink variant="nav" />
            <CvDownload variant="nav" />
          </div>
        </div>
      </div>
    </header>
  )
}
