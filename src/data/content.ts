export type Lang = 'en' | 'pt'

export const profile = {
  name: 'Julio Jorge',
  handle: 'lionev',
  location: 'Recife, PE',
  email: 'julionev10@gmail.com',
  phone: '+55 81 98627-3135',
  phoneHref: 'tel:+5581986273135',
  linkedin: 'https://linkedin.com/in/julionev10',
  github: 'https://github.com/lionev',
  cv: {
    pt: '/Julio_Jorge.pdf',
    en: '/Julio_Jorge_Resume.pdf',
  },
  english: 'A2',
}

export const copy = {
  en: {
    metaDescription:
      'Julio Jorge — Full Stack Developer. Internal systems, desktop apps, and products for gaming communities.',
    nav: {
      work: 'Work',
      experience: 'Experience',
      stack: 'Stack',
      about: 'About',
      contact: 'Contact',
    },
    langLabel: 'Language',
    cv: {
      short: 'CV',
      download: 'Download CV',
      choose: 'Choose a language',
      portuguese: 'Português',
      english: 'English',
    },
    hero: {
      open: 'Open to work',
      role: 'Full Stack Developer',
      lead: 'I build tools people actually use — internal systems, desktop overlays, and live products.',
      body: 'I work end to end: React and Node in public service, Python and C# in desktop tools, and live products with real payments for gaming communities.',
      selected: 'Selected work',
    },
    work: {
      kicker: 'Selected work',
      title: 'What I ship',
      aside: 'Four real products — overlay, bot, macro, and a published fork.',
    },
    more: 'Also shipped',
    experience: {
      kicker: 'Experience',
      title: 'Real',
      titleItalic: 'path',
    },
    stack: {
      kicker: 'Stack',
      title: 'Tools I keep close',
      groups: {
        Product: 'Product',
        Desktop: 'Desktop',
        Networks: 'Networks',
      },
    },
    about: {
      kicker: 'About',
      title: 'From help desk to',
      titleItalic: 'product',
      p1: 'I started fixing machines at a city hall and a transit consortium. Then came N1–N3 support, ERP, and Active Directory. Today I ship internal systems at IASSEPE — and, in parallel, I build tools that a gaming community actually opens every day.',
      p2: 'That mix matters: I know what breaks in production, what a non-technical user needs to see on screen, and how an overlay or a payment webhook behaves when nobody is watching.',
      education: 'Education',
    },
    contact: {
      kicker: 'Contact',
      title: 'Let’s talk',
      body: 'Open to product, internal systems, and desktop tools. Send an email — I’ll reply.',
    },
    project: {
      back: 'Back to work',
      live: 'Live site',
      repo: 'Upstream repo',
      highlights: 'Highlights',
      stack: 'Stack',
    },
    footer: 'Built with React · Tailwind · Motion',
  },
  pt: {
    metaDescription:
      'Julio Jorge — Desenvolvedor Full Stack. Sistemas internos, apps desktop e produtos para comunidades de jogos.',
    nav: {
      work: 'Projetos',
      experience: 'Experiência',
      stack: 'Stack',
      about: 'Sobre',
      contact: 'Contato',
    },
    langLabel: 'Idioma',
    cv: {
      short: 'CV',
      download: 'Baixar CV',
      choose: 'Escolha o idioma',
      portuguese: 'Português',
      english: 'English',
    },
    hero: {
      open: 'Aberto a oportunidades',
      role: 'Desenvolvedor Full Stack',
      lead: 'Eu construo ferramentas que as pessoas realmente usam — sistemas internos, overlays desktop e produtos no ar.',
      body: 'Atuo de ponta a ponta: React e Node no serviço público, Python e C# em ferramentas desktop, e produtos com pagamento real para comunidades de jogos.',
      selected: 'Ver projetos',
    },
    work: {
      kicker: 'Projetos',
      title: 'O que eu entrego',
      aside: 'Quatro produtos reais — overlay, bot, macro e um fork publicado.',
    },
    more: 'Também publiquei',
    experience: {
      kicker: 'Experiência',
      title: 'Trajetória',
      titleItalic: 'real',
    },
    stack: {
      kicker: 'Stack',
      title: 'Ferramentas que eu uso',
      groups: {
        Product: 'Produto',
        Desktop: 'Desktop',
        Networks: 'Redes',
      },
    },
    about: {
      kicker: 'Sobre',
      title: 'Do help desk ao',
      titleItalic: 'produto',
      p1: 'Comecei consertando máquina em prefeitura e consórcio de transporte. Passei por suporte N1–N3, ERP e Active Directory. Hoje entrego sistemas internos no IASSEPE — e, em paralelo, construo ferramentas que a comunidade de jogos realmente abre todo dia.',
      p2: 'Essa mistura importa: sei o que quebra em produção, o que um usuário leigo precisa ver na tela, e como um overlay ou um webhook de pagamento se comporta quando não tem ninguém olhando.',
      education: 'Formação',
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos conversar',
      body: 'Aberto a produto, sistemas internos e ferramentas desktop. Manda um e-mail — respondo.',
    },
    project: {
      back: 'Voltar aos projetos',
      live: 'Site ao vivo',
      repo: 'Repositório original',
      highlights: 'Destaques',
      stack: 'Stack',
    },
    footer: 'Feito com React · Tailwind · Motion',
  },
} as const

type ProjectText = {
  kicker: string
  summary: string
  body: string[]
  highlights: string[]
}

export const featured = [
  {
    slug: 'xohub',
    number: '01',
    name: 'XoHub',
    year: '2025–26',
    stack: ['Python', 'PySide6', 'React', 'Node', 'Prisma', 'PostgreSQL'],
    live: null as string | null,
    repo: null as string | null,
    accent: '#d4ff3f',
    text: {
      en: {
        kicker: 'Path of Exile · Desktop + Web',
        summary:
          'A module hub for Path of Exile 1 and 2: trade, regex, farms, timeless jewels and price check in a single overlay.',
        body: [
          'It started as a Cluster Jewels tool and became a full hub. The local folder is XoD; the product is XoHub — a Python/PySide6 desktop HUD and a React web panel to unlock modules by subscription.',
          'On the client: Cluster Jewels (Large, Medium, Small, Megalomaniac), vendor/stash regex, PoB Trade Links, Blight, Farms with Atlas, Timeless Jewels, Fast Leveling and Auto Flask on PoE 2. Price check reads the item on screen, queries official trade and poe.ninja, and opens search with real filters.',
          'On the web (XoHuB): React + Vite + Tailwind, Node/Express API, Prisma and PostgreSQL. Each HUD tile — Cluster, Regex, PoB, Blight, Farms, Timeless — can be purchased on its own, on a 1 to 3 month cycle.',
        ],
        highlights: [
          'PoE 1 / PoE 2 selector in the hub, with modules locked when they do not apply',
          'Price check with trade2 IDs, rate-limit and search cache',
          'Farms catalog on Drive, notes, tags and embedded atlas',
          'Automatic update via version.json and a 24h local session',
        ],
      } satisfies ProjectText,
      pt: {
        kicker: 'Path of Exile · Desktop + Web',
        summary:
          'Hub de módulos para Path of Exile 1 e 2: trade, regex, farms, timeless jewels e price check em um só overlay.',
        body: [
          'Nasceu como ferramenta de Cluster Jewels e virou um hub completo. A pasta local chama XoD; o produto é o XoHub — um HUD desktop em Python/PySide6 e um painel web em React para liberar módulos por assinatura.',
          'No cliente: Cluster Jewels (Large, Medium, Small, Megalomaniac), regex de vendor/stash, PoB Trade Links, Blight, Farms com Atlas, Timeless Jewels, Fast Leveling e Auto Flask no PoE 2. Price check lê o item na tela, consulta trade oficial e poe.ninja, e abre o search com filtros reais.',
          'No web (XoHuB): React + Vite + Tailwind, API Node/Express, Prisma e PostgreSQL. Cada tile da HUD — Cluster, Regex, PoB, Blight, Farms, Timeless — pode ser comprado isolado, com ciclo de 1 a 3 meses.',
        ],
        highlights: [
          'Seletor PoE 1 / PoE 2 no hub, com módulos bloqueados quando não se aplicam',
          'Price check com IDs de trade2, rate-limit e cache de busca',
          'Catálogo de farms no Drive, notes, tags e atlas embutido',
          'Update automático via version.json e sessão local de 24h',
        ],
      } satisfies ProjectText,
    },
  },
  {
    slug: 'pkmdbot',
    number: '02',
    name: 'PKMDBOT',
    year: '2024–26',
    stack: ['React', 'TypeScript', 'Node', 'Mercado Pago', 'Python', 'OpenCV'],
    live: 'https://xod.vercel.app',
    repo: null as string | null,
    accent: '#7dd3fc',
    text: {
      en: {
        kicker: 'Product · xod.vercel.app',
        summary:
          'A product with a site, plans, launcher and desktop bot. Real payments, referrals, and screen-vision automation.',
        body: [
          'PKMDBOT lives in two layers. The site at xod.vercel.app sells plans, tutorials, the launcher download and release notes. The backend uses Mercado Pago’s Preference API, a payment webhook and Google Sheets as the store — with referrals validated on the front and the server.',
          'Plan selection changes with character status: new, active trial, expired trial or subscriber. The public page already announces new features, such as Auto Medicine.',
          'The desktop client (XoD-Bot) automates from pixels: it watches color and icons, Auto Attack, bind spam and background input to the game window, with a native Mini HUD. Stack: Python, CustomTkinter, OpenCV, MSS, NumPy, Pillow and PyInstaller.',
        ],
        highlights: [
          'Live site at xod.vercel.app — plans, tutorials and launcher',
          'Mercado Pago + webhook + referral system',
          'Desktop bot with screen vision and background input',
          'Windows distribution via PyInstaller',
        ],
      } satisfies ProjectText,
      pt: {
        kicker: 'Produto · xod.vercel.app',
        summary:
          'Produto com site, planos, launcher e bot desktop. Pagamento real, indicação e automação por visão de tela.',
        body: [
          'O PKMDBOT vive em duas camadas. O site em xod.vercel.app vende planos, tutoriais, download do launcher e notas de atualização. O back-end usa Preference API do Mercado Pago, webhook de pagamento e Google Sheets como base — com indicação validada no front e no servidor.',
          'A seleção de plano muda com o status do personagem: novo, teste ativo, teste expirado ou assinante. A página pública já comunica features novas, como Auto Medicine.',
          'O cliente desktop (XoD-Bot) faz automação por pixel: monitora cor e ícone, Auto Attack, spam de binds e envio de input para a janela em segundo plano, com Mini HUD nativo. Stack: Python, CustomTkinter, OpenCV, MSS, NumPy, Pillow e PyInstaller.',
        ],
        highlights: [
          'Site ao vivo em xod.vercel.app — planos, tutoriais e launcher',
          'Mercado Pago + webhook + sistema de referral',
          'Bot desktop com visão de tela e INPUTBG',
          'Distribuição Windows via PyInstaller',
        ],
      } satisfies ProjectText,
    },
  },
  {
    slug: 'xomacro',
    number: '03',
    name: 'XoMacro',
    year: '2026',
    stack: ['C#', '.NET 8', 'WinForms', 'Hotkeys', 'Input simulation'],
    live: null as string | null,
    repo: null as string | null,
    accent: '#fbbf24',
    text: {
      en: {
        kicker: 'Windows · C# / WinForms',
        summary:
          'A keyboard and mouse recorder/player for daily tasks — hotkeys, cycles, on-screen watermark and a dark theme.',
        body: [
          'XoMacro is a Windows app I built and iterated to build 62. It is not a loose script: it is a player with a macro library, triggers from a key or mouse button, focus on a specific process, and repeat by count, hold or infinite loop.',
          'Each macro mixes steps (combo, text, wait, click) or a timeline of recorded events. You can resume from a stage, control speed, delay between cycles and keep the app in the tray. A watermark on screen shows status without stealing the game.',
          'Portuguese UI, per-monitor DPI, dark/light and a self-contained net8.0-windows publish.',
        ],
        highlights: [
          'Global hotkeys, hold-to-repeat and resume by stage',
          'Process targeting + status watermark',
          'Speed 0.25×–3×, cycles and infinite loop',
          'Versioned build (v62) with its own theme',
        ],
      } satisfies ProjectText,
      pt: {
        kicker: 'Windows · C# / WinForms',
        summary:
          'Gravador e repetidor de teclado e mouse para o dia a dia — hotkeys, ciclos, watermark e tema escuro.',
        body: [
          'XoMacro é um app Windows que gravei e evoluí até a build 62. Não é um script solto: é um player com biblioteca de macros, disparo por tecla ou botão do mouse, foco em processo específico e repetição por contagem, hold ou loop infinito.',
          'Cada macro combina passos (combo, texto, espera, clique) ou uma timeline de eventos gravados. Dá para retomar do estágio, controlar velocidade, atrasar entre ciclos e manter o app no tray. Uma watermark na tela mostra o status sem roubar o jogo.',
          'Interface em português, DPI por monitor, dark/light e publish self-contained em net8.0-windows.',
        ],
        highlights: [
          'Hotkeys globais, hold-to-repeat e resume por estágio',
          'Alvo por processo + watermark de status',
          'Velocidade 0.25×–3×, ciclos e loop infinito',
          'Build versionada (v62) com tema próprio',
        ],
      } satisfies ProjectText,
    },
  },
  {
    slug: 'poeredux',
    number: '04',
    name: 'PoeRedux',
    year: '2026',
    stack: ['C#', 'WPF', '.NET', 'LibGGPK3', 'JSON patches'],
    live: 'https://github.com/Gineticus/PoeRedux',
    repo: 'https://github.com/Gineticus/PoeRedux',
    accent: '#c4b5fd',
    text: {
      en: {
        kicker: 'Fork · WPF / C#',
        summary:
          'A fork of a visual Path of Exile patcher. I turned a loose set of patches into a safer flow, in Portuguese, with presets and a real log.',
        body: [
          'PoeRedux (upstream: Gineticus) edits the Content.ggpk / Steam index of PoE 1 and PoE 2. The fork is not an overlay: it opens the client file, applies patches and writes a local backup before saving.',
          'What I shipped in this fork: automatic Steam/GGG folder detection, refuse while the game is open, PoE 1 × PoE 2 validation, presets (Safe, Performance, Clarity, Zoom only), a single save at the end, Color Mods in JSON imported from statdescriptions, split extreme patches and a Portuguese UI.',
          'I also extracted parsers (ColorMods, Camera, AoClient) with tests, remembered game/path/zoom under %LOCALAPPDATA%, and split Black Screen from one nuclear button into toggles for environment, particles, materials, shaders and attachments.',
        ],
        highlights: [
          'Presets + persistent settings + PT-BR UI',
          'Single index save and a log of what each patch changed',
          'Color Mods versioned in JSON, importable from the game',
          'Corpse on PoE 2 and Black Screen split into subtoggles',
        ],
      } satisfies ProjectText,
      pt: {
        kicker: 'Fork · WPF / C#',
        summary:
          'Fork de um patcher visual para Path of Exile. Transformei um app de patches soltos num fluxo seguro, em português, com presets e log real.',
        body: [
          'PoeRedux (upstream: Gineticus) altera o Content.ggpk / índice Steam de PoE 1 e PoE 2. O fork não é um overlay: abre o arquivo do cliente, aplica patches e grava backup local antes de escrever.',
          'O que eu implementei neste fork: detecção automática da pasta Steam/GGG, recusa com o jogo aberto, validação PoE 1 × PoE 2, presets (Seguro, Performance, Clareza, Só zoom), um único save no final, Color Mods em JSON com importação do statdescriptions, patches extremos separados e UI em português.',
          'Também extraí parsers (ColorMods, Camera, AoClient) com testes, lembrei jogo/caminho/zoom na %LOCALAPPDATA%, e passei o Black Screen de um botão nuclear para toggles de ambiente, partículas, materiais, shaders e anexos.',
        ],
        highlights: [
          'Presets + settings persistentes + UI em PT-BR',
          'Save único no índice e log do que cada patch alterou',
          'Color Mods versionados em JSON, importáveis do jogo',
          'Corpse no PoE 2 e Black Screen fatiado em subtoggles',
        ],
      } satisfies ProjectText,
    },
  },
] as const

export const moreWork = [
  {
    name: 'XoBot',
    stack: 'Python · Tkinter · Twitch API',
    href: 'https://github.com/lionev/XoBot',
    blurb: {
      en: 'Twitch bot manager with OAuth, Helix, IRC and automatic token refresh.',
      pt: 'Gerenciador de bots Twitch com OAuth, Helix, IRC e renovação automática de token.',
    },
  },
  {
    name: 'sCocktail',
    stack: 'TypeScript · React · Tailwind',
    href: 'https://github.com/lionev/sCocktail',
    blurb: {
      en: 'A catalog of 100+ drinks via API, with a lean React interface.',
      pt: 'Catálogo de mais de 100 drinques via API, interface enxuta em React.',
    },
  },
  {
    name: 'Timer',
    stack: 'React · Styled Components · Immer',
    href: 'https://github.com/lionev/Timer',
    blurb: {
      en: 'Pomodoro timer with Reducer and Context navigation to stay focused.',
      pt: 'Pomodoro com navegação via Reducer e Context para manter o foco.',
    },
  },
  {
    name: 'To-Do',
    stack: 'TypeScript · React',
    href: 'https://github.com/lionev/To-Do',
    blurb: {
      en: 'Task manager with 9 standardized components published via Tsup.',
      pt: 'Gestão de tarefas com 9 componentes padronizados via Tsup.',
    },
  },
] as const

export const experience = [
  {
    org: 'IASSEPE',
    tags: ['React 19', 'TypeScript', 'Node.js', 'Prisma', 'LDAP'],
    en: {
      role: 'Full Stack Developer',
      period: 'Present',
      location: 'Pernambuco',
      detail:
        'Internal systems for public service, end to end: SPAs with React 19, TypeScript, Vite and Tailwind; REST APIs with Node.js, Express, JWT, LDAP and PostgreSQL + Prisma.',
    },
    pt: {
      role: 'Desenvolvedor Full Stack',
      period: 'Atual',
      location: 'Pernambuco',
      detail:
        'Sistemas internos para o serviço público, de ponta a ponta: SPAs com React 19, TypeScript, Vite e Tailwind; APIs REST com Node.js, Express, JWT, LDAP e PostgreSQL + Prisma.',
    },
  },
  {
    org: 'IASSEPE',
    tags: ['BGP', 'SD-WAN', 'ZTNA', 'Leadership'],
    en: {
      role: 'Network Manager',
      period: 'Jun 2025 — Mar 2026',
      location: 'Pernambuco',
      detail:
        'Corporate infrastructure with a focus on availability. Led the IT team through expansion and modernization. TCP/IP, BGP, OSPF, MPLS, SD-WAN, firewalls, IDS/IPS and ZTNA.',
    },
    pt: {
      role: 'Gerente de Redes',
      period: 'Jun 2025 — Mar 2026',
      location: 'Pernambuco',
      detail:
        'Gestão de infraestrutura corporativa com foco em disponibilidade. Liderança de equipe de TI, expansão e modernização. TCP/IP, BGP, OSPF, MPLS, SD-WAN, firewalls, IDS/IPS e ZTNA.',
    },
  },
  {
    org: 'XoHub',
    tags: ['Python', 'PySide6', 'React', 'Prisma', 'PostgreSQL'],
    en: {
      role: 'Full Stack Developer',
      period: '2025 — 2026',
      location: 'Independent product',
      detail:
        'Module hub for Path of Exile 1 and 2: a Python/PySide6 desktop overlay and a React web panel to unlock modules by subscription. Price check, trade regex, farms, timeless jewels, and a Node/Prisma/PostgreSQL API with 1–3 month billing cycles.',
    },
    pt: {
      role: 'Desenvolvedor Full Stack',
      period: '2025 — 2026',
      location: 'Produto próprio',
      detail:
        'Hub de módulos para Path of Exile 1 e 2: overlay desktop em Python/PySide6 e painel web em React para liberar módulos por assinatura. Price check, regex de trade, farms, timeless jewels e API Node/Prisma/PostgreSQL com ciclo de 1 a 3 meses.',
    },
  },
  {
    org: 'XoMacro',
    tags: ['C#', '.NET 8', 'WinForms'],
    en: {
      role: 'Desktop Developer',
      period: '2026',
      location: 'Independent product',
      detail:
        'Windows keyboard and mouse recorder/player in C# / .NET 8. Macro library, global hotkeys, process targeting, speed control, on-screen watermark and a self-contained publish through build 62.',
    },
    pt: {
      role: 'Desenvolvedor Desktop',
      period: '2026',
      location: 'Produto próprio',
      detail:
        'Gravador e repetidor de teclado e mouse para Windows em C# / .NET 8. Biblioteca de macros, hotkeys globais, alvo por processo, controle de velocidade, watermark na tela e publicação autocontida até a build 62.',
    },
  },
  {
    org: 'Diário de Pernambuco',
    tags: ['Help Desk', 'ERP', 'Active Directory'],
    en: {
      role: 'Junior Support Analyst',
      period: 'Jul 2024 — Mar 2025',
      location: 'Recife',
      detail:
        'N1, N2 and N3 support through Help Desk. Commercial and industrial ERP rollout, technical reports and Active Directory support.',
    },
    pt: {
      role: 'Analista de Suporte Júnior',
      period: 'Jul 2024 — Mar 2025',
      location: 'Recife',
      detail:
        'Suporte N1, N2 e N3 via Help Desk. Implantação de ERP comercial e industrial, pareceres técnicos e suporte a Active Directory.',
    },
  },
  {
    org: 'Conceitto Industrial',
    tags: ['Tickets', 'ERP', 'Remote access'],
    en: {
      role: 'IT Support Analyst',
      period: 'Feb 2022 — Jun 2023',
      location: 'Contractor',
      detail:
        'N1–N3 support by phone, email, tickets and remote access. ERP rollout and failure identification with technical reports.',
    },
    pt: {
      role: 'Analista de Suporte de TI',
      period: 'Fev 2022 — Jun 2023',
      location: 'Terceirizado',
      detail:
        'Suporte N1–N3 por telefone, e-mail, tickets e acesso remoto. Implantação de ERP e identificação de falhas com parecer técnico.',
    },
  },
  {
    org: 'Grande Recife Consórcio de Transporte',
    tags: ['Hardware', 'Networks', 'AD'],
    en: {
      role: 'IT Intern',
      period: 'Mar 2020 — Feb 2022',
      location: 'Recife',
      detail:
        'Desktop maintenance, network support and the corporate domain. Install and support third-party systems.',
    },
    pt: {
      role: 'Estagiário de TI',
      period: 'Mar 2020 — Fev 2022',
      location: 'Recife',
      detail:
        'Manutenção de desktops, suporte à rede e ao domínio corporativo. Instalação e suporte de sistemas de terceiros.',
    },
  },
  {
    org: 'Prefeitura da Cidade do Paulista',
    tags: ['Hardware', 'Public sector'],
    en: {
      role: 'IT Intern',
      period: 'Mar 2018 — Feb 2020',
      location: 'Paulista, PE',
      detail:
        'Computer maintenance in a municipal public environment. Install and support systems for city hall departments.',
    },
    pt: {
      role: 'Estagiário de TI',
      period: 'Mar 2018 — Fev 2020',
      location: 'Paulista, PE',
      detail:
        'Manutenção de computadores no ambiente público municipal. Instalação e suporte de sistemas para os departamentos da prefeitura.',
    },
  },
] as const

export const education = [
  {
    place: 'UNINASSAU',
    en: {
      title: 'Bachelor’s in Information Systems',
      period: '2024 · Completed',
    },
    pt: {
      title: 'Bacharelado em Sistemas da Informação',
      period: '2024 · Concluída',
    },
  },
  {
    place: 'Udemy',
    en: {
      title: 'QA & Automated Testing',
      period: '2024 · Cypress beginner and intermediate',
    },
    pt: {
      title: 'QA & Testes Automatizados',
      period: '2024 · Cypress básico e intermediário',
    },
  },
  {
    place: 'Rocketseat',
    en: {
      title: 'Front-End Developer',
      period: '2024 · React, Java, NLWs',
    },
    pt: {
      title: 'Desenvolvedor Front-End',
      period: '2024 · React, Java, NLWs',
    },
  },
] as const

export const skillGroups = [
  {
    key: 'Product' as const,
    items: [
      'React 19',
      'TypeScript',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'JWT',
      'LDAP',
    ],
  },
  {
    key: 'Desktop' as const,
    items: ['C# / .NET 8', 'Python 3', 'PySide6', 'WinForms', 'OpenCV', 'PyInstaller', 'WPF'],
  },
  {
    key: 'Networks' as const,
    items: [
      'TCP/IP',
      'BGP',
      'OSPF',
      'MPLS',
      'SD-WAN',
      'Firewall',
      'ZTNA',
      'Active Directory',
      'Windows Server',
      'Linux',
    ],
  },
] as const
