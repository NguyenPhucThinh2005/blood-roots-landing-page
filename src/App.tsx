import { useLenis } from 'lenis/react'
import { Component, Suspense, useEffect, useState, type ReactNode } from 'react'
import { useSectionAmbience } from './audio/useSectionAmbience'
import { SoundToggle } from './components/Controls'
import { SiteHeader } from './components/SiteHeader'
import { useLanguage } from './i18n/LanguageProvider'
import { ScrollTrigger } from './lib/gsap'
import { Entity } from './sections/Entity'
import { EvidenceWall } from './sections/EvidenceWall'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Letter } from './sections/Letter'
import { Making } from './sections/Making'
import { Premise } from './sections/Premise'
import { Puzzle } from './sections/Puzzle'
import { Team } from './sections/Team'
import { Why } from './sections/Why'
import { hasWebGL, Stage } from './webgl/lazy'

// A lost WebGL context or a model that fails to load must not take the page down with it.
class Quiet extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// The page in the order of its argument (docs/art-direction.md): product, story hook, problem and
// answer, the evidence, the features, a try-out, how it was made, the team, the sign-up.
// No preloader and no gate: the first screen is plain HTML; the shared 3D canvas mounts after first paint.
export default function App() {
  const [webgl] = useState(hasWebGL)
  const { lang } = useLanguage()
  const lenis = useLenis()
  useSectionAmbience()

  // A shared link with #section opens at that section once the layout has settled.
  useEffect(() => {
    if (!lenis || !location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    document.fonts.ready.then(() => {
      if (document.getElementById(id)) lenis.scrollTo(`#${id}`, { immediate: true })
    })
  }, [lenis])

  // Fonts and the two languages change line breaks and section heights; re-measure scroll triggers.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [lang])

  return (
    <div className="grain">
      <SiteHeader />
      <Hero />
      <main>
        <Premise />
        <Letter />
        <Why />
        <EvidenceWall />
        <Entity />
        <Features />
        <Puzzle />
        <Making />
        <Team />
      </main>
      <Footer />
      <SoundToggle />
      {webgl && (
        <Quiet>
          <Suspense fallback={null}>
            <Stage />
          </Suspense>
        </Quiet>
      )}
    </div>
  )
}
