import { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Grain from './components/Grain'
import Spotlight from './components/Spotlight'
import Intro from './components/Intro'
import { LanguageProvider } from './i18n/LanguageContext'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <LanguageProvider>
      <Spotlight />
      <Grain />
      <Intro />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/dailymacro" element={<Navigate to="/work/xomacro" replace />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </LanguageProvider>
  )
}
