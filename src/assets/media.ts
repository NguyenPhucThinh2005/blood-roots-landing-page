// Every raster on the page, imported once through vite-imagetools so each ships as a sized WebP.
// Sources come from the asset pipeline (npm run media); see scripts/.
import logoBloodRoot from './images/logo-blood-root.webp?w=1400&format=webp'
import logoHextrix from './images/logo-hextrix.webp?w=240&format=webp'

import ch1Classroom from './images/ch1-classroom.jpg?w=720&format=webp'
import ch1Corridor from './images/ch1-corridor.jpg?w=720&format=webp'
import ch1Count from './images/ch1-count.jpg?w=720&format=webp'
import ch1Pieces from './images/ch1-pieces.jpg?w=720&format=webp'
import posterCorridor from './images/poster-corridor.jpg?w=1600&format=webp'
import posterFlashlight from './images/poster-flashlight.jpg?w=960&format=webp'
import posterJigsaw from './images/poster-jigsaw.jpg?w=960&format=webp'

import btsAltar from './images/bts-altar.jpg?w=720&format=webp'
import btsBedroom from './images/bts-bedroom.jpg?w=720&format=webp'
import btsClassroom from './images/bts-classroom.jpg?w=720&format=webp'
import btsCorridorDay from './images/bts-corridor-day.jpg?w=720&format=webp'
import btsCorridorRed from './images/bts-corridor-red.jpg?w=960&format=webp'
import btsHouse from './images/bts-house.jpg?w=720&format=webp'
import btsSchool from './images/bts-school.jpg?w=720&format=webp'
import btsStairs from './images/bts-stairs.jpg?w=720&format=webp'

import puzzle from './images/puzzle.jpg?w=1200&format=webp'

export const logos = { bloodRoot: logoBloodRoot, hextrix: logoHextrix }

export const chapterImages = {
  corridor: ch1Corridor,
  pieces: ch1Pieces,
  classroom: ch1Classroom,
  count: ch1Count,
  flashlight: posterFlashlight,
  jigsaw: posterJigsaw,
}

export const btsImages = {
  altar: btsAltar,
  house: btsHouse,
  bedroom: btsBedroom,
  school: btsSchool,
  classroom: btsClassroom,
  corridorDay: btsCorridorDay,
  stairs: btsStairs,
  corridorRed: btsCorridorRed,
} as const

export type BtsImage = keyof typeof btsImages

export const posters = { corridor: posterCorridor, flashlight: posterFlashlight, jigsaw: posterJigsaw }

export const puzzleImage = puzzle

export const videos = {
  corridor: '/media/video/corridor.mp4',
  flashlight: '/media/video/flashlight.mp4',
  jigsaw: '/media/video/jigsaw.mp4',
}

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61594750001680'
