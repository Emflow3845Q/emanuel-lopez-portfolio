import type { IconType } from 'react-icons'
import {
  SiCpanel,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si'

const items: { name: string; icon: IconType }[] = [
  { name: 'React', icon: SiReact },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'cPanel', icon: SiCpanel },
]

/** Cinta infinita decorativa con las tecnologías principales (el detalle está en la sección Habilidades). */
export function TechMarquee() {
  return (
    <div
      aria-hidden
      className="group relative overflow-hidden border-y border-line bg-night-2 py-3.5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] md:py-4"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="m-0 flex shrink-0 list-none items-center gap-9 p-0 pr-9 md:gap-12 md:pr-12">
            {items.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 font-mono text-label text-ink-3 transition-colors duration-300 hover:text-ink"
              >
                <Icon className="size-4 text-accent" />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
