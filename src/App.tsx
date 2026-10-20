import { Suspense, useEffect, useState } from 'react'
import { useSectionAmbience } from './audio/useSectionAmbience'
import { SoundToggle } from './components/Controls'
import { ScrollTrigger } from './lib/gsap'
import { Chapter } from './sections/Chapter'
import { Entity } from './sections/Entity'
import { EvidenceWall } from './sections/EvidenceWall'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Letter } from './sections/Letter'
import { Making } from './sections/Making'
import { Premise } from './sections/Premise'
import { Puzzle } from './sections/Puzzle'
import { Stats } from './sections/Stats'
import { Studio } from './sections/Studio'
import { hasWebGL, Stage } from './webgl/lazy'

// The page in the order of its argument (docs/art-direction.md). No preloader and no gate:
// the first screen is plain HTML; the shared 3D canvas mounts after first paint.
export default function App() {
  const [webgl] = useState(hasWebGL)
  useSectionAmbience()

  // Fonts change line breaks and section heights; re-measure scroll triggers once they are in.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <div className="grain">
      <Hero />
      <main>
        <Premise />
        <Letter />
        <EvidenceWall />
        <Entity />
        <Chapter />
        <Puzzle />
        <Making />
        <Stats />
        <Studio />
      </main>
      <Footer />
      <SoundToggle />
      {webgl && (
        <Suspense fallback={null}>
          <Stage />
        </Suspense>
      )}
    </div>
  )
}
