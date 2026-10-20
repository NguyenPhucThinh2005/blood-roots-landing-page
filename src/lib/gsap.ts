import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register every plugin once; import gsap from here instead of from 'gsap' directly.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase, Flip, Observer)

gsap.defaults({ ease: 'expo.out', duration: 1 })

export { CustomEase, Flip, gsap, Observer, ScrollTrigger, SplitText, useGSAP }
