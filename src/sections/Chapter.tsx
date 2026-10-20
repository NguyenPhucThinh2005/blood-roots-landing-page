import { useEffect, useRef, useState } from 'react'
import { chapterImages, posters, videos } from '../assets/media'
import { LoopVideo } from '../components/LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

type Media = { img: string } | { video: string; poster: string }

// One picture or loop per moment, in the order they happen in chapter 1.
const MEDIA: Media[] = [
  { img: chapterImages.corridor },
  { img: chapterImages.pieces },
  { video: videos.flashlight, poster: posters.flashlight },
  { video: videos.jigsaw, poster: posters.jigsaw },
  { img: chapterImages.classroom },
  { img: chapterImages.count },
]
// Empty space above each picture varies so their top edges rise and fall along the row.
const GAPS = ['md:h-[96px]', 'md:h-[140px]', 'md:h-[80px]', 'md:h-[124px]', 'md:h-[88px]', 'md:h-[132px]']
const GAPS_PHONE = ['h-10', 'h-16', 'h-8', 'h-14', 'h-9', 'h-12']

// "Drag row of moments": chapter 1 told left to right.
export function Chapter() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  const row = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)
  useReveal(root)

  useEffect(() => {
    const el = row.current
    if (!el) return
    const update = () => setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth))
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    // Mouse drag to scroll (touch already scrolls natively).
    let startX = 0
    let startLeft = 0
    let dragging = false
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dragging = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.style.scrollSnapType = 'none'
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      el.scrollLeft = startLeft - (e.clientX - startX)
    }
    const up = () => {
      if (!dragging) return
      dragging = false
      el.style.scrollSnapType = ''
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const el = row.current
    const col = el?.querySelector('li')
    if (!el || !col) return
    el.scrollBy({ left: dir * (col.getBoundingClientRect().width + 32), behavior: 'smooth' })
  }

  return (
    <section ref={root} id="chapter" aria-labelledby="chapter-title" className="bg-soot py-24 md:py-[160px]">
      <div className="page-x flex items-end justify-between gap-6">
        <h2 id="chapter-title" data-reveal className="text-step-title">
          {t.chapter.title}
        </h2>
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir < 0 ? t.chapter.prev : t.chapter.next}
              className="grid size-12 place-items-center bg-bone text-void transition-[background-color,transform] duration-200 hover:bg-blood-300 active:scale-95"
            >
              <svg aria-hidden viewBox="0 0 24 24" className={cn('size-5', dir < 0 && 'rotate-180')}>
                <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="page-x mt-5" aria-hidden>
        <div className="h-1.5 bg-bone/20">
          <div
            className="h-full origin-left bg-bone"
            style={{ transform: `scaleX(${0.18 + progress * 0.82})` }}
          />
        </div>
      </div>

      <ol
        ref={row}
        className="mt-10 flex snap-x snap-mandatory scroll-px-(--margin) [scrollbar-width:none] gap-4 overflow-x-auto px-(--margin) pb-4 md:cursor-grab md:gap-8 md:active:cursor-grabbing"
      >
        {t.chapter.moments.map((m, i) => {
          const media = MEDIA[i]
          return (
            <li key={m.name} data-reveal className="flex w-[72vw] shrink-0 snap-start flex-col md:w-[280px]">
              <h3 className="font-display text-step-body leading-tight font-bold tracking-[-0.01em]">
                {m.name}
              </h3>
              <p className="mt-2 text-step-small leading-[1.5] text-bone/80">{m.text}</p>
              <div className={cn('shrink-0', GAPS_PHONE[i], GAPS[i])} />
              <div className="mt-auto aspect-[4/5] w-full overflow-hidden bg-void">
                {'img' in media ? (
                  <img
                    src={media.img}
                    alt={m.alt}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <LoopVideo
                    src={media.video}
                    poster={media.poster}
                    label={m.alt}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
