import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Draggable } from 'gsap/Draggable'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register every plugin once; import gsap from here instead of from 'gsap' directly.
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  CustomEase,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  Flip,
  Observer,
)

gsap.defaults({ ease: 'expo.out', duration: 1 })

export {
  CustomEase,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  Flip,
  gsap,
  Observer,
  ScrollTrigger,
  SplitText,
  useGSAP,
}

// Handy in DevTools while building; stripped from production builds.
if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger })
