import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 56, rotateX: 8, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, reduce])

  return (
    <div
      ref={ref}
      className={className}
      style={reduce ? undefined : { opacity: 0, perspective: 900 }}
    >
      {children}
    </div>
  )
}
