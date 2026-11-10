import gsap from 'gsap'
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  href?: string
}

export default function Magnetic({ children, className, href }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    xTo.current = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

    return () => {
      gsap.killTweensOf(el)
      xTo.current = null
      yTo.current = null
    }
  }, [])

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !xTo.current || !yTo.current) return
    const box = el.getBoundingClientRect()
    const x = event.clientX - box.left - box.width / 2
    const y = event.clientY - box.top - box.height / 2
    xTo.current(x * 0.22)
    yTo.current(y * 0.22)
  }

  const onLeave = () => {
    xTo.current?.(0)
    yTo.current?.(0)
  }

  const inner = (
    <div
      ref={ref}
      className={`inline-flex items-center justify-center will-change-transform ${className ?? ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {inner}
      </a>
    )
  }

  return inner
}
