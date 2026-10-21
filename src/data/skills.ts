import {
  ArrowRightLeft,
  Bug,
  DatabaseBackup,
  Globe,
  Headphones,
  type LucideIcon,
  Mail,
  Network,
  Repeat,
  Server,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Workflow,
  Wrench,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa6'
import {
  SiAngular,
  SiBigcommerce,
  SiCpanel,
  SiCss,
  SiElementor,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJoomla,
  SiLaravel,
  SiLinux,
  SiLua,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPrestashop,
  SiPython,
  SiReact,
  SiShopify,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVite,
  SiWordpress,
} from 'react-icons/si'
import type { Lang } from '@/i18n/translations'

export type SkillGroupId = 'frontend' | 'backend' | 'cms' | 'infra' | 'tools'

export interface Skill {
  /** Nombre por defecto (marcas y términos que no se traducen). */
  name: string
  /** Traducciones opcionales cuando el nombre no es una marca. */
  label?: Partial<Record<Lang, string>>
  icon: IconType | LucideIcon
  /** Tecnologías principales: se destacan visualmente. */
  core?: boolean
}

export interface SkillGroup {
  id: SkillGroupId
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    skills: [
      { name: 'React', icon: SiReact, core: true },
      { name: 'JavaScript', icon: SiJavascript, core: true },
      { name: 'TypeScript', icon: SiTypescript, core: true },
      { name: 'Tailwind CSS', icon: SiTailwindcss, core: true },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'Angular', icon: SiAngular },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, core: true },
      { name: 'Express', icon: SiExpress },
      { name: 'Python', icon: SiPython, core: true },
      { name: 'PHP', icon: SiPhp },
      { name: 'Java', icon: SiOpenjdk },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'Lua', icon: SiLua },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MariaDB', icon: SiMariadb },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Power Platform', icon: Workflow },
    ],
  },
  {
    id: 'cms',
    skills: [
      { name: 'WordPress', icon: SiWordpress, core: true },
      { name: 'Elementor', icon: SiElementor },
      { name: 'Joomla', icon: SiJoomla },
      { name: 'Shopify', icon: SiShopify },
      { name: 'BigCommerce', icon: SiBigcommerce },
      { name: 'PrestaShop', icon: SiPrestashop },
      { name: 'Tiendanube', icon: ShoppingBag },
    ],
  },
  {
    id: 'infra',
    skills: [
      { name: 'cPanel', icon: SiCpanel, core: true },
      { name: 'WHM', icon: SiCpanel },
      { name: 'Linux', icon: SiLinux },
      { name: 'AWS', icon: FaAws },
      { name: 'DNS', icon: Globe },
      { name: 'SSL', icon: ShieldCheck },
      { name: 'Apache / Nginx', icon: Network },
      { name: 'Administración de hosting', label: { en: 'Hosting administration' }, icon: Server },
      { name: 'Servidores web', label: { en: 'Web servers' }, icon: ServerCog },
      { name: 'Correo corporativo', label: { en: 'Corporate email' }, icon: Mail },
      { name: 'Migración de sitios', label: { en: 'Site migration' }, icon: ArrowRightLeft },
      { name: 'Respaldos y recuperación', label: { en: 'Backup & recovery' }, icon: DatabaseBackup },
    ],
  },
  {
    id: 'tools',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Trello', icon: SiTrello },
      { name: 'Scrum', icon: Repeat },
      { name: 'Mantenimiento web', label: { en: 'Web maintenance' }, icon: Wrench },
      { name: 'Soporte técnico', label: { en: 'Technical support' }, icon: Headphones },
      { name: 'Diagnóstico de errores', label: { en: 'Error diagnosis' }, icon: Bug },
    ],
  },
]

export const skillLabel = (skill: Skill, lang: Lang): string => skill.label?.[lang] ?? skill.name
