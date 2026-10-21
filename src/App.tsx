import { LazyMotion, MotionConfig } from 'motion/react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { NotFound } from '@/components/pages/NotFound'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { isNotFoundPath } from '@/lib/notFound'
import { ThemeProvider } from '@/theme/ThemeContext'

/** Carga diferida de las funciones de animación de Motion (reduce el JS inicial). */
const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)

function Portfolio() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>{isNotFoundPath(window.location.pathname) ? <NotFound /> : <Portfolio />}</LanguageProvider>
    </ThemeProvider>
  )
}
