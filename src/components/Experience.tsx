import { useAutoAnimate } from '@formkit/auto-animate/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { experience } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

gsap.registerPlugin(ScrollTrigger)

function JobTags({ tags }: { tags: readonly string[] }) {
  const [parent] = useAutoAnimate({ duration: 240, easing: 'ease-out' })
  return (
    <div ref={parent} className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="text-mute text-[11px] tracking-wide uppercase">
          {tag}
          {tag !== tags[tags.length - 1] ? ' ·' : ''}
        </span>
      ))}
    </div>
  )
}

export default function Experience() {
  const { lang, t } = useLang()
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (reduce || !listRef.current) return
    const nums = listRef.current.querySelectorAll('[data-exp-num]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nums,
        { opacity: 0.15, y: 24, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      )
    }, listRef)
    return () => ctx.revert()
  }, [reduce, lang])

  return (
    <section id="experience" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-acid mb-3 text-[11px] tracking-[0.32em] uppercase">{t.experience.kicker}</p>
          <h2 className="font-serif mb-16 text-5xl tracking-tight md:text-7xl">
            {t.experience.title}
            <span className="text-mute/70 italic"> {t.experience.titleItalic}</span>
          </h2>
        </Reveal>

        <ol ref={listRef} className="relative">
          {experience.map((job, index) => {
            const text = job[lang]
            return (
              <Reveal key={`${job.org}-${text.role}`} delay={index * 0.04}>
                <li className="border-line grid gap-3 border-t py-8 md:grid-cols-[180px_1fr_200px] md:gap-10">
                  <p className="text-mute text-[12px] tracking-[0.12em] uppercase">{text.period}</p>
                  <div>
                    <h3 className="text-xl font-medium">{text.role}</h3>
                    <p className="text-acid mt-1 text-sm tracking-wide">
                      {job.org}
                      <span className="text-mute"> · {text.location}</span>
                    </p>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#d0cbbd]">{text.detail}</p>
                    <JobTags tags={job.tags} />
                  </div>
                  <p data-exp-num className="text-mute hidden text-right font-serif text-4xl md:block">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
