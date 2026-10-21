import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { puzzleImage } from '../assets/media'
import { getSound } from '../audio/sounds'
import { useSound } from '../audio/SoundProvider'
import { Cta } from '../components/Cta'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'
import { Draggable, Flip, gsap } from '../lib/gsap'

const N = 3
const SOLVED = Array.from({ length: N * N }, (_, i) => i)

/** A random arrangement with at most two pieces already in place (any swap puzzle is solvable). */
function shuffle(): number[] {
  for (;;) {
    const a = [...SOLVED]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    if (a.filter((p, i) => p === i).length <= 2) return a
  }
}

// The live thing: the torn photo from chapter 1, put back together by swapping pieces.
// Drag a piece onto another, or tap/Enter two pieces in turn (native button clicks; Draggable swallows
// the click after a real drag). Arrow keys move between pieces.
export function Puzzle() {
  const t = useT()
  const sound = useSound()
  const root = useRef<HTMLElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)
  const flipTween = useRef<gsap.core.Timeline | null>(null)
  const [order, setOrder] = useState<number[]>(shuffle)
  const [selected, setSelected] = useState<number | null>(null)
  const [focusSlot, setFocusSlot] = useState(0)
  const [moves, setMoves] = useState(0)
  const [hint, setHint] = useState<{ slot: number; target: number } | null>(null)
  const solved = order.every((p, i) => p === i)
  useReveal(root)

  const swap = (a: number, b: number) => {
    if (a === b || solved) return
    // Finish a swap still in flight first, or two Flips fight over the same pieces.
    flipTween.current?.progress(1)
    flipState.current = Flip.getState(board.current!.querySelectorAll('[data-piece]'))
    setOrder((prev) => {
      const next = [...prev]
      ;[next[a], next[b]] = [next[b], next[a]]
      if (next.every((p, i) => p === i) && sound.enabled) getSound('heartbeat').play()
      return next
    })
    setMoves((m) => m + 1)
    setSelected(null)
    setHint(null)
  }

  // Like the game's hint: light the piece that belongs in the first wrong slot.
  const showHint = () => {
    const target = order.findIndex((p, i) => p !== i)
    if (target < 0) return
    setHint({ slot: order.indexOf(target), target })
  }

  const choose = (slot: number) => {
    if (solved) return
    if (selected === null) setSelected(slot)
    else if (selected === slot) setSelected(null)
    else swap(selected, slot)
  }

  // Animate pieces from where they were to their new slots.
  useLayoutEffect(() => {
    if (!flipState.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    flipTween.current = Flip.from(flipState.current, { duration: reduced ? 0 : 0.42, ease: 'power3.inOut' })
    flipState.current = null
  }, [order])

  // Dragging: drop a piece over another to swap them. The Draggables are made once and read the latest
  // swap() through a ref; recreating (and reverting) them on every move would restore stale inline
  // styles captured mid-Flip. They are killed, not reverted, once the photo is whole.
  const swapRef = useRef(swap)
  useLayoutEffect(() => {
    swapRef.current = swap
  })
  useEffect(() => {
    if (solved) return
    const pieces = gsap.utils.toArray<HTMLElement>('[data-piece]', board.current)
    const draggables = Draggable.create(pieces, {
      zIndexBoost: true,
      dragClickables: true, // the pieces are <button>s, which Draggable ignores by default
      minimumMovement: 6,
      onPress() {
        gsap.to(this.target, { scale: 1.04, duration: 0.15 })
      },
      onRelease() {
        const target = this.target as HTMLElement
        const over = pieces.find((p) => p !== target && this.hitTest(p, '40%'))
        gsap.to(target, { scale: 1, duration: 0.15 })
        if (over) {
          gsap.set(target, { x: 0, y: 0 })
          swapRef.current(Number(target.dataset.slot), Number(over.dataset.slot))
        } else {
          gsap.to(target, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' })
        }
      },
    })
    return () => draggables.forEach((d) => d.kill())
  }, [solved])

  const onKeyDown = (e: KeyboardEvent, slot: number) => {
    const r = Math.floor(slot / N)
    const c = slot % N
    const target = {
      ArrowLeft: c > 0 ? slot - 1 : slot,
      ArrowRight: c < N - 1 ? slot + 1 : slot,
      ArrowUp: r > 0 ? slot - N : slot,
      ArrowDown: r < N - 1 ? slot + N : slot,
    }[e.key]
    if (target !== undefined) {
      e.preventDefault()
      setFocusSlot(target)
      board.current?.querySelector<HTMLElement>(`[data-slot="${target}"]`)?.focus()
    }
  }

  const reset = () => {
    setOrder(shuffle())
    setMoves(0)
    setSelected(null)
    setHint(null)
  }

  return (
    <section
      ref={root}
      id="puzzle"
      aria-labelledby="puzzle-title"
      className="page-x bg-[#3b2f2c] py-24 md:py-[160px]"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 md:pt-4">
          <h2 id="puzzle-title" data-reveal className="text-step-head">
            {t.puzzle.title}
          </h2>
          <p data-reveal className="mt-6 max-w-[38ch]">
            {t.puzzle.intro}
          </p>
          <p data-reveal className="mt-3 max-w-[38ch] text-step-small text-bone/70">
            {t.puzzle.keyboard}
          </p>
          <p data-reveal aria-live="polite" className="mt-8 font-display text-step-lead font-bold">
            {solved ? t.puzzle.solvedIn(moves) : t.puzzle.moves(moves)}
          </p>
          {solved ? (
            <div className="mt-6 space-y-6">
              <p className="max-w-[30ch] text-step-lead italic">{t.puzzle.solved}</p>
              <Cta />
            </div>
          ) : (
            <>
              <div className="mt-4 flex gap-6">
                <button type="button" onClick={showHint} className="link text-step-small">
                  {t.puzzle.hint}
                </button>
                <button type="button" onClick={reset} className="link text-step-small">
                  {t.puzzle.reset}
                </button>
              </div>
              <p aria-live="polite" className="mt-3 max-w-[34ch] text-step-small text-blood-300">
                {hint && t.puzzle.hintText(Math.floor(hint.target / N) + 1, (hint.target % N) + 1)}
              </p>
            </>
          )}
        </div>

        <figure data-reveal className="md:col-span-8">
          <div
            ref={board}
            role="group"
            aria-label={t.puzzle.title}
            className={cn(
              'grid aspect-video w-full touch-none grid-cols-3 transition-[gap] duration-700 ease-(--ease-expo)',
              solved ? 'gap-0' : 'gap-1 md:gap-1.5',
            )}
          >
            {order.map((piece, slot) => {
              const row = Math.floor(piece / N)
              const col = piece % N
              const isSelected = selected === slot
              return (
                <button
                  key={piece}
                  type="button"
                  data-piece
                  data-slot={slot}
                  tabIndex={slot === focusSlot ? 0 : -1}
                  onClick={() => choose(slot)}
                  onFocus={() => setFocusSlot(slot)}
                  onKeyDown={(e) => onKeyDown(e, slot)}
                  aria-pressed={isSelected}
                  aria-label={`${t.puzzle.piece(piece + 1, Math.floor(slot / N) + 1, (slot % N) + 1)}${isSelected ? `, ${t.puzzle.selected}` : ''}`}
                  className={cn(
                    'relative bg-void bg-no-repeat outline-offset-[-3px] transition-[filter] duration-200',
                    isSelected && 'outline-3 outline-blood-500 outline-solid',
                    hint?.slot === slot && !isSelected && 'outline-3 outline-blood-300 outline-dashed',
                    !solved && 'cursor-grab hover:brightness-125 active:cursor-grabbing',
                  )}
                  style={{
                    backgroundImage: `url(${puzzleImage})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${col * 50}% ${row * 50}%`,
                  }}
                />
              )
            })}
          </div>
          <figcaption className="sr-only">{t.puzzle.alt}</figcaption>
          <noscript>
            <img src={puzzleImage} alt={t.puzzle.alt} />
          </noscript>
        </figure>
      </div>
    </section>
  )
}
