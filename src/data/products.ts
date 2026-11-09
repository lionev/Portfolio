export type ProductId = 'xoc' | 'pokedeck'

export type ProductCopy = {
  eyebrow: string
  headline: string[]
  accentWord: string
  lede: string
  download: string
  secondary: string
  live: string
  windows: string
  size: string
  back: string
  stepsTitle: string
  steps: { n: string; title: string; text: string }[]
  featuresTitle: string
  features: { k: string; title: string; text: string }[]
  closeTitle: string
  closeBody: string
}

export type Product = {
  id: ProductId
  name: string
  version: string
  route: string
  mark: string
  downloadUrl: string
  downloadName: string
  accent: string
  accentSoft: string
  glow: string
  ticker: string[]
  stack: string[]
  text: { en: ProductCopy; pt: ProductCopy }
}

export const products: Record<ProductId, Product> = {
  xoc: {
    id: 'xoc',
    name: 'XoC',
    version: '0.1.91',
    route: '/xoc',
    mark: '/products/xoc-mark.png',
    downloadUrl: 'https://xoc-bd.web.app/XoC.bin',
    downloadName: 'XoC.exe',
    accent: '#a78bfa',
    accentSoft: 'rgba(167, 139, 250, 0.16)',
    glow: 'rgba(124, 77, 255, 0.35)',
    ticker: [
      'Voz ao vivo',
      'Câmera',
      'Tela inteira',
      'Áudio do PC',
      'Canais',
      'Servidores',
      'Convite',
      'WebRTC',
      'Windows',
      'Portátil',
    ],
    stack: ['Electron', 'React', 'WebRTC', 'WebSocket', 'Windows'],
    text: {
      pt: {
        eyebrow: 'Call entre amigos · peer-to-peer',
        headline: ['A call', 'fica no', 'primeiro', 'PC.'],
        accentWord: 'primeiro',
        lede:
          'Voz, câmera e tela entre amigos. Quem entra primeiro no canal segura a sala no próprio computador — e é por essa máquina que o som e a imagem passam.',
        download: 'Baixar XoC para Windows',
        secondary: 'Ver o caminho',
        live: 'Portátil · sem instalador · atualização automática',
        windows: 'Windows x64',
        size: '~71 MB',
        back: 'Portfólio',
        stepsTitle: 'Três passos e a sala está de pé.',
        steps: [
          {
            n: '01',
            title: 'Alguém abre a sala',
            text: 'O primeiro a entrar no canal de voz segura a call na própria máquina.',
          },
          {
            n: '02',
            title: 'Os amigos acham o caminho',
            text: 'Na mesma rede, os PCs se anunciam. Longe de casa, um sinal curto combina o encontro.',
          },
          {
            n: '03',
            title: 'A mídia passa por esse PC',
            text: 'Voz, câmera e tela vão de cada amigo até o anfitrião. A conversa fica entre vocês.',
          },
        ],
        featuresTitle: 'O que cabe numa call.',
        features: [
          {
            k: 'Voz',
            title: 'O ruído fica no chão',
            text: 'Um worklet escuta o ambiente e abaixa o que não é fala. Cada pessoa tem volume, mudo e fone.',
          },
          {
            k: 'Câmera',
            title: 'O rosto, quando quiser',
            text: 'Liga e desliga no meio da call, sem sair da sala.',
          },
          {
            k: 'Tela',
            title: 'A tela e o som do PC',
            text: 'Monitor inteiro ou uma janela. O áudio do sistema pode ir junto.',
          },
          {
            k: 'Salas',
            title: 'Servidores e canais',
            text: 'Texto de um lado, voz do outro. Cada grupo tem a própria casa.',
          },
        ],
        closeTitle: 'Baixa. Abre. Entra na call.',
        closeBody:
          'O XoC é um app portátil para Windows. Sem instalador: baixa o .exe, abre e cria a sala com os amigos.',
      },
      en: {
        eyebrow: 'Friends call · peer-to-peer',
        headline: ['The call', 'lives on', 'the first', 'PC.'],
        accentWord: 'the first',
        lede:
          'Voice, camera and screen between friends. Whoever joins the voice channel first hosts the room on their own machine — and media routes through that PC.',
        download: 'Download XoC for Windows',
        secondary: 'How it routes',
        live: 'Portable · no installer · auto-update',
        windows: 'Windows x64',
        size: '~71 MB',
        back: 'Portfolio',
        stepsTitle: 'Three steps and the room is up.',
        steps: [
          {
            n: '01',
            title: 'Someone opens the room',
            text: 'The first person in the voice channel hosts the call on their own machine.',
          },
          {
            n: '02',
            title: 'Friends find the path',
            text: 'On the same network, PCs announce themselves. Away from home, a short signal sets the meetup.',
          },
          {
            n: '03',
            title: 'Media goes through that PC',
            text: 'Voice, camera and screen travel from each friend to the host. The talk stays between you.',
          },
        ],
        featuresTitle: 'What fits in a call.',
        features: [
          {
            k: 'Voice',
            title: 'Noise stays on the floor',
            text: 'A worklet listens to the room and ducks what is not speech. Per-person volume, mute and headset.',
          },
          {
            k: 'Camera',
            title: 'Face when you want it',
            text: 'Toggle mid-call without leaving the room.',
          },
          {
            k: 'Screen',
            title: 'Screen and PC audio',
            text: 'Full monitor or a single window. System audio can ride along.',
          },
          {
            k: 'Rooms',
            title: 'Servers and channels',
            text: 'Text on one side, voice on the other. Each group gets its own house.',
          },
        ],
        closeTitle: 'Download. Open. Join the call.',
        closeBody:
          'XoC is a portable Windows app. No installer: grab the .exe, open it and start a room with friends.',
      },
    },
  },
  pokedeck: {
    id: 'pokedeck',
    name: 'Pokedeck',
    version: '0.1.0',
    route: '/pokedeck',
    mark: '/products/pokedeck-mark.png',
    downloadUrl: 'https://xoc-bd.web.app/Pokedeck.bin',
    downloadName: 'Pokedeck.exe',
    accent: '#3ec8de',
    accentSoft: 'rgba(62, 200, 222, 0.14)',
    glow: 'rgba(62, 200, 222, 0.32)',
    ticker: [
      'Multi-conta',
      'Sessão própria',
      'Grade',
      'Foco',
      'Browser games',
      'Electron',
      'Windows',
      'Portátil',
      'Zoom por conta',
      'Tray',
    ],
    stack: ['Electron', 'Chromium', 'Multi-session', 'Windows'],
    text: {
      pt: {
        eyebrow: 'Browser games · várias contas',
        headline: ['Várias', 'contas.', 'Uma', 'janela.'],
        accentWord: 'janela.',
        lede:
          'O Pokedeck junta várias contas de jogos de navegador numa só janela. Cada conta tem a própria sessão, a própria aba e continua rodando enquanto você foca em outra.',
        download: 'Baixar Pokedeck para Windows',
        secondary: 'Como funciona',
        live: 'Portátil · sem instalador · sessões isoladas',
        windows: 'Windows x64',
        size: '~77 MB',
        back: 'Portfólio',
        stepsTitle: 'Do zero à grade em três movimentos.',
        steps: [
          {
            n: '01',
            title: 'Adiciona o jogo',
            text: 'Cola o endereço do jogo de navegador e dá um nome ao grupo de contas.',
          },
          {
            n: '02',
            title: 'Abre as contas',
            text: 'Cada conta vive numa sessão Chromium isolada — login, cookies e storage não se misturam.',
          },
          {
            n: '03',
            title: 'Escolhe a visão',
            text: 'Foco numa conta, grade, ou uma em destaque com as outras ao lado. Tudo segue vivo.',
          },
        ],
        featuresTitle: 'Feito para quem joga em paralelo.',
        features: [
          {
            k: 'Sessões',
            title: 'Uma partição por conta',
            text: 'Cookies, storage e login ficam isolados. Trocar de conta não derruba a outra.',
          },
          {
            k: 'Layout',
            title: 'Foco, grade ou destaque',
            text: 'Uma conta em tela cheia, grade automática, ou uma principal com miniaturas.',
          },
          {
            k: 'Zoom',
            title: 'Escala por conta',
            text: 'Ajusta o zoom de cada sessão para caber mais contas na mesma tela.',
          },
          {
            k: 'Tray',
            title: 'Fecha sem matar',
            text: 'Manda para o tray e as contas continuam. Ou fecha de verdade quando quiser.',
          },
        ],
        closeTitle: 'Baixa. Abre. Empilha as contas.',
        closeBody:
          'O Pokedeck é um app portátil para Windows. Sem instalador: baixa o .exe, abre e monta a sua grade de contas.',
      },
      en: {
        eyebrow: 'Browser games · multi-account',
        headline: ['Many', 'accounts.', 'One', 'window.'],
        accentWord: 'window.',
        lede:
          'Pokedeck runs several browser-game accounts in a single window. Each account keeps its own session and tab, and keeps running while you focus on another.',
        download: 'Download Pokedeck for Windows',
        secondary: 'How it works',
        live: 'Portable · no installer · isolated sessions',
        windows: 'Windows x64',
        size: '~77 MB',
        back: 'Portfolio',
        stepsTitle: 'From zero to grid in three moves.',
        steps: [
          {
            n: '01',
            title: 'Add the game',
            text: 'Paste the browser-game URL and name the account group.',
          },
          {
            n: '02',
            title: 'Open the accounts',
            text: 'Each account lives in an isolated Chromium session — login, cookies and storage never mix.',
          },
          {
            n: '03',
            title: 'Pick the view',
            text: 'Focus one account, use a grid, or pin one with the others beside it. Everything stays alive.',
          },
        ],
        featuresTitle: 'Built for parallel play.',
        features: [
          {
            k: 'Sessions',
            title: 'One partition per account',
            text: 'Cookies, storage and login stay isolated. Switching accounts does not drop the others.',
          },
          {
            k: 'Layout',
            title: 'Focus, grid or spotlight',
            text: 'One full account, an auto grid, or a main pane with side miniatures.',
          },
          {
            k: 'Zoom',
            title: 'Per-account scale',
            text: 'Tune each session zoom so more accounts fit on the same screen.',
          },
          {
            k: 'Tray',
            title: 'Close without killing',
            text: 'Send it to the tray and accounts keep running. Or quit for real when you want.',
          },
        ],
        closeTitle: 'Download. Open. Stack the accounts.',
        closeBody:
          'Pokedeck is a portable Windows app. No installer: grab the .exe, open it and build your account grid.',
      },
    },
  },
}
