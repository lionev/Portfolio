import './ProductDemo.css'

export type DemoId = 'xoc' | 'pokedeck' | 'navo' | 'xohub' | 'xomacro'

type Props = {
  id: DemoId
  accent: string
  tall?: boolean
  label?: string
}

const titles: Record<DemoId, string> = {
  xoc: 'XoC · sala',
  pokedeck: 'Pokedeck · grade',
  navo: 'NAVO · agenda',
  xohub: 'XoHub · módulos',
  xomacro: 'XoMacro · player',
}

export default function ProductDemo({ id, accent, tall, label = 'live' }: Props) {
  return (
    <div
      className={`pd${tall ? ' is-tall' : ''}`}
      style={{ ['--pd-accent' as string]: accent }}
      aria-hidden="true"
    >
      <div className="pd-stage">
        <div className="pd-window">
          <div className="pd-chrome">
            <div className="pd-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <strong>{titles[id]}</strong>
            <span className="pd-live">{label}</span>
          </div>
          <div className="pd-body">{renderBody(id)}</div>
        </div>
      </div>
    </div>
  )
}

function renderBody(id: DemoId) {
  switch (id) {
    case 'xoc':
      return <XocBody />
    case 'pokedeck':
      return <PokedeckBody />
    case 'navo':
      return <NavoBody />
    case 'xohub':
      return <XohubBody />
    case 'xomacro':
      return <XomacroBody />
  }
}

function XocBody() {
  const cast = [
    { name: 'Você', meta: 'anfitrião · roteando', host: true },
    { name: 'Luna', meta: 'conectado', host: false },
    { name: 'Nico', meta: 'conectado', host: false },
    { name: 'Iara', meta: 'entrando…', host: false },
  ]

  return (
    <>
      <div className="pd-xoc-grid">
        {cast.map((person) => (
          <div key={person.name} className={`pd-xoc-person${person.host ? ' is-host' : ''}`}>
            <div className="pd-avatar">{person.name.slice(0, 1)}</div>
            <div>
              <strong>{person.name}</strong>
              <small>{person.meta}</small>
            </div>
            <div className="pd-wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        ))}
      </div>
      <div className="pd-route" aria-hidden="true">
        <i />
      </div>
    </>
  )
}

function PokedeckBody() {
  const panes = [
    { cls: 'is-a', name: 'Main', meta: 'em foco' },
    { cls: 'is-b', name: 'Farm A', meta: 'rodando' },
    { cls: 'is-c', name: 'Farm B', meta: 'rodando' },
    { cls: 'is-d', name: 'Alt', meta: 'espera' },
  ]

  return (
    <div className="pd-poke-grid">
      {panes.map((pane) => (
        <div key={pane.name} className={`pd-pane ${pane.cls}`}>
          <strong>{pane.name}</strong>
          <small>{pane.meta}</small>
        </div>
      ))}
    </div>
  )
}

function NavoBody() {
  const slots = ['14:00', '14:30', '15:00', '15:30']

  return (
    <div className="pd-navo">
      <div className="pd-navo-search">
        <span>SP · Tatuagem</span>
        <b>hoje</b>
      </div>
      <div className="pd-slots">
        {slots.map((slot, index) => (
          <div key={slot} className={`pd-slot${index === 2 ? ' is-pick' : ''}`}>
            {slot}
          </div>
        ))}
      </div>
      <div className="pd-pix">
        <div>
          <strong>Horário travado</strong>
          <small>sinal PIX · R$ 25</small>
        </div>
        <span className="pd-pix-badge">pago</span>
      </div>
    </div>
  )
}

function XohubBody() {
  const tiles = [
    { name: 'Cluster', live: true },
    { name: 'Regex', live: false },
    { name: 'PoB', live: false },
    { name: 'Farms', live: false },
    { name: 'Price', live: true },
    { name: 'Timeless', live: false },
  ]

  return (
    <>
      <div className="pd-hub">
        {tiles.map((tile) => (
          <div key={tile.name} className={`pd-tile${tile.live ? ' is-live' : ''}`}>
            <span>{tile.live ? 'ativo' : 'módulo'}</span>
            <b>{tile.name}</b>
          </div>
        ))}
      </div>
      <div className="pd-price">
        <div>
          <strong>Mirror Shard</strong>
          <small>trade · poe.ninja</small>
        </div>
        <em>12.4d</em>
      </div>
    </>
  )
}

function XomacroBody() {
  return (
    <>
      <div className="pd-macro-top">
        <span>daily_farm</span>
        <b>playing · 1.0×</b>
      </div>
      <div className="pd-timeline">
        <div className="pd-timeline-bar" />
        <span className="pd-event" style={{ left: '18%' }}>
          F1
        </span>
        <span className="pd-event is-hot" style={{ left: '42%' }}>
          click
        </span>
        <span className="pd-event" style={{ left: '68%' }}>
          wait
        </span>
        <span className="pd-event" style={{ left: '86%' }}>
          loop
        </span>
      </div>
      <div className="pd-keys">
        <span className="pd-key">Ctrl</span>
        <span className="pd-key is-on">Q</span>
        <span className="pd-key">W</span>
        <span className="pd-key">E</span>
        <span className="pd-key">R</span>
      </div>
    </>
  )
}

export const demoIds = new Set<string>(['xoc', 'pokedeck', 'navo', 'xohub', 'xomacro'])
