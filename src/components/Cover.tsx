type Props = {
  slug: string
  accent: string
  tall?: boolean
}

const shots: Record<string, { src: string; alt: string; fit: string }> = {
  xohub: {
    src: '/shots/xohub.png',
    alt: 'XoHub — hub de módulos para Path of Exile',
    fit: 'object-cover object-[center_18%]',
  },
  xomacro: {
    src: '/shots/xomacro.png',
    alt: 'XoMacro v62 — gravador de teclado e mouse',
    fit: 'object-cover object-[center_12%]',
  },
}

export default function Cover({ slug, accent, tall }: Props) {
  const height = tall ? 'h-[42vh] min-h-64 md:h-[28rem]' : 'h-52 md:h-64'
  const shot = shots[slug]

  if (shot) {
    return (
      <div className={`relative overflow-hidden bg-[#0c0e14] ${height}`}>
        <img
          src={shot.src}
          alt={shot.alt}
          className={`h-full w-full ${shot.fit}`}
          loading="lazy"
          decoding="async"
        />
        <div className="from-ink-2/90 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }}
        />
      </div>
    )
  }

  return (
    <div
      className={`scanlines cover-grid relative overflow-hidden ${height}`}
      style={{ background: `radial-gradient(120% 90% at 80% 10%, ${accent}22, transparent 50%), #0c0e14` }}
    >
      {slug === 'pkmdbot' && <BotArt accent={accent} />}
      {slug === 'poeredux' && <PatchArt accent={accent} />}
      <div className="from-ink-2 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent" />
    </div>
  )
}

function BotArt({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="size-36 rounded-full border opacity-80 md:size-44"
        style={{ borderColor: accent, boxShadow: `0 0 80px ${accent}33` }}
      />
      <div className="border-paper/20 absolute size-24 rounded-full border md:size-28" />
      <div className="bg-paper/90 absolute size-2 rounded-full" />
      <div
        className="absolute h-px w-1/2 origin-left animate-pulse"
        style={{ background: accent, top: '42%', left: '50%' }}
      />
    </div>
  )
}

function PatchArt({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-6 space-y-2">
      {['Fog', 'Minimap', 'Color Mods', 'Camera 2.1×', 'Black Screen'].map((row, i) => (
        <div
          key={row}
          className="flex items-center justify-between rounded-lg border px-3 py-2 text-[11px] tracking-wide uppercase"
          style={{
            borderColor: `${accent}33`,
            color: i === 0 || i === 3 ? accent : '#9a9588',
            background: i === 0 || i === 3 ? `${accent}14` : 'transparent',
          }}
        >
          <span>{row}</span>
          <span>{i === 0 || i === 3 ? 'ON' : '—'}</span>
        </div>
      ))}
    </div>
  )
}
