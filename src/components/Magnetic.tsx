import { useRef, type MouseEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  href?: string
}

export default function Magnetic({ children, className, href }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const x = event.clientX - box.left - box.width / 2
    const y = event.clientY - box.top - box.height / 2
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  const inner = (
    <div
      ref={ref}
      className={`inline-flex items-center justify-center transition-transform duration-150 will-change-transform ${className ?? ''}`}
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
