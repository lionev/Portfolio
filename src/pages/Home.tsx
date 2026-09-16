import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Work from '../components/Work'
import MoreWork from '../components/MoreWork'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div className="relative z-10">
      <Nav />
      <Hero />
      <Work />
      <MoreWork />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
