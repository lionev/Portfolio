import { useEffect, useRef } from 'react'

type Props = {
  accent?: string
  className?: string
}

function hexAlpha(hex: string, alpha: number) {
  const raw = hex.replace('#', '')
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  const n = Number.parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function Constellation({ accent = '#d4ff3f', className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = window.innerWidth < 720 ? 24 : 46
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random() * 0.78,
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
      r: Math.random() * 1.3 + 0.5,
    }))
    const pointer = { x: 0.72, y: 0.28 }
    let frame = 0

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      const reach = w < 720 ? 110 : 152
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = (a.x - b.x) * w
          const dy = (a.y - b.y) * h
          const dist = Math.hypot(dx, dy)
          if (dist < reach) {
            ctx.strokeStyle = hexAlpha(accent, (1 - dist / reach) * 0.34)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((node, index) => {
        ctx.fillStyle = index === 0 ? accent : 'rgba(239, 234, 224, 0.72)'
        ctx.beginPath()
        ctx.arc(node.x * w, node.y * h, index === 0 ? 2.4 : node.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth
      pointer.y = event.clientY / window.innerHeight
    }

    const tick = () => {
      nodes.forEach((node, index) => {
        if (!reduce) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > 1) node.vx *= -1
          if (node.y < 0 || node.y > 0.78) node.vy *= -1
        }
        if (index === 0) {
          node.x += (pointer.x - node.x) * 0.03
          node.y += (pointer.y * 0.55 - node.y) * 0.03
        }
      })
      draw()
      frame = window.requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [accent])

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
      style={{
        maskImage: 'linear-gradient(#000 0%, #000 38%, transparent 78%)',
        WebkitMaskImage: 'linear-gradient(#000 0%, #000 38%, transparent 78%)',
      }}
      aria-hidden
    />
  )
}
