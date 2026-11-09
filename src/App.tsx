import { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import ProductLaunch from './pages/ProductLaunch'
import Grain from './components/Grain'
import Spotlight from './components/Spotlight'
import Intro from './components/Intro'
import { LanguageProvider } from './i18n/LanguageContext'

const PRODUCT_ROUTES = ['/xoc', '/pokedeck']

export default function App() {
  const { pathname } = useLocation()
  const isProduct = PRODUCT_ROUTES.includes(pathname.toLowerCase())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <LanguageProvider>
      {!isProduct && <Spotlight />}
      {!isProduct && <Grain />}
      {!isProduct && <Intro />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/dailymacro" element={<Navigate to="/work/xomacro" replace />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/xoc" element={<ProductLaunch />} />
        <Route path="/XoC" element={<Navigate to="/xoc" replace />} />
        <Route path="/pokedeck" element={<ProductLaunch />} />
        <Route path="/Pokedeck" element={<Navigate to="/pokedeck" replace />} />
      </Routes>
    </LanguageProvider>
  )
}
