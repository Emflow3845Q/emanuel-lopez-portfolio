import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Mail } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaLinkedinIn } from 'react-icons/fa6'
import { SiInstagram, SiWhatsapp } from 'react-icons/si'
import { ContactForm } from '@/components/contact/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { site } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

interface ContactLink {
  id: string
  label: string
  value: string
  url: string
  icon: IconType | LucideIcon
}

const links: ContactLink[] = [
  { id: 'email', label: 'Email', value: site.email, url: `mailto:${site.email}`, icon: Mail },
  { id: 'linkedin', label: 'LinkedIn', ...site.socials.linkedin, icon: FaLinkedinIn },
  { id: 'whatsapp', label: 'WhatsApp', ...site.socials.whatsapp, icon: SiWhatsapp },
  { id: 'instagram', label: 'Instagram', ...site.socials.instagram, icon: SiInstagram },
]

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contact">
      <SectionHeading label={t.contact.label} title={t.contact.title} />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 font-display text-[clamp(1.5rem,8vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.035em] text-ink md:text-[clamp(1.7rem,3vw,2.4rem)]">
            {t.contact.tagline}
          </p>
          <p className="mb-8 text-body-sm leading-[1.7] text-ink-2 min-[481px]:text-base">{t.contact.sub}</p>

          <div className="flex flex-col gap-3">
            {links.map(({ id, label, value, url, icon: Icon }) => (
              <a
                key={id}
                href={url}
                {...(id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="group flex items-start gap-3 rounded-xl border border-line bg-surface px-3.5 py-3.5 no-underline transition-[border-color,transform,background] duration-300 ease-out-expo hover:translate-x-1.5 hover:border-accent hover:bg-accent-dim min-[481px]:px-5 min-[481px]:py-4 md:items-center md:gap-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-night">
                  <Icon aria-hidden className="size-[18px] text-ink" />
                </div>
                <div>
                  <div className="mb-0.5 text-[0.72rem] uppercase tracking-[0.06em] text-ink-3 min-[481px]:tracking-[0.1em]">
                    {label}
                  </div>
                  <div className="text-[0.9rem] font-medium text-ink [word-break:break-word]">{value}</div>
                </div>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="ml-auto self-center text-ink-3 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
