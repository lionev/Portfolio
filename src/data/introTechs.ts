import type { SimpleIcon } from 'simple-icons'
import {
  siDotnet,
  siGoogleappsscript,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'

type TechMark = Pick<SimpleIcon, 'title' | 'path'> & { hex?: string }

const salesforce: TechMark = {
  title: 'Salesforce',
  hex: '00A1E0',
  path: 'M16.86 8.22c-.2-1.9-1.82-3.36-3.78-3.36-1.1 0-2.1.46-2.8 1.22A3.7 3.7 0 0 0 7.3 4.86c-1.92 0-3.5 1.44-3.74 3.3A3.66 3.66 0 0 0 1.08 11.5c0 2.02 1.64 3.66 3.66 3.66h12.24c1.9 0 3.42-1.54 3.42-3.42 0-1.74-1.3-3.2-3.02-3.4-.16-.04-.34-.08-.52-.12z',
}

export const introTechs: TechMark[] = [
  siReact,
  siTypescript,
  siNextdotjs,
  siVite,
  siTailwindcss,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siDotnet,
  salesforce,
  siGoogleappsscript,
  siLinux,
]

export function techColor(hex?: string) {
  if (!hex) return '#d4ff3f'
  const n = Number.parseInt(hex, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 46 ? '#efeae0' : `#${hex}`
}
