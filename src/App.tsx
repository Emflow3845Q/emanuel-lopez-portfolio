import { LazyMotion, MotionConfig } from 'motion/react'
import { lazy } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { NotFound } from '@/components/pages/NotFound'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { DeferredSection } from '@/components/ui/DeferredSection'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { isNotFoundPath } from '@/lib/notFound'
import { ThemeProvider } from '@/theme/ThemeContext'

/** Carga diferida de las funciones de animación de Motion (reduce el JS inicial). */
const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)
const Projects = lazy(() => import('@/components/sections/Projects').then((mod) => ({ default: mod.Projects })))
const Contact = lazy(() => import('@/components/sections/Contact').then((mod) => ({ default: mod.Contact })))

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
          <DeferredSection
            id="projects"
            component={Projects}
            tone="alt"
            minHeight="100vh"
            eager={window.location.hash.startsWith('#/proyecto/')}
          />
          <DeferredSection id="contact" component={Contact} minHeight="80vh" />
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
