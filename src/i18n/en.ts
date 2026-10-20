import type { Dictionary } from './vi'

export const en: Dictionary = {
  meta: {
    title: 'Blood Root — Hextrix Studio',
    description: 'A first-person psychological horror game for PC, rooted in Vietnamese folk belief.',
  },
  brand: {
    studio: 'Hextrix Studio',
    game: 'Blood Root',
  },
  cta: 'Follow on Facebook',
  ui: {
    soundOn: 'Turn sound on',
    soundOff: 'Turn sound off',
    switchLanguage: 'Tiếng Việt',
    switchLanguageLabel: 'Chuyển sang tiếng Việt',
    skip: 'Skip to content',
  },
  hero: {
    tagline: 'A first-person psychological horror game for PC, rooted in Vietnamese folk belief.',
    tabs: {
      premise: 'The call',
      wall: 'The wall',
      entity: 'Blood root',
      chapter: 'Chapter 1',
      making: 'Behind it',
    },
  },
  premise: {
    title: 'Father won’t wake up',
    note: 'A call at midnight: your father, a retired policeman, has fallen into a deep coma no doctor can explain. You come home, reopen the family grocery store, and find the case he never finished.',
    facts: [
      { value: 'PC', label: 'Platform' },
      { value: 'First person', label: 'Explore, solve, hide' },
      { value: 'Chapter 1', label: 'The teacher, a school at night' },
      { value: 'Coming soon', label: 'In development on Unity' },
    ],
    shelfCaption:
      'The shop shelf: fish sauce, chilli sauce, salt and a loaf of bread. Every item was modelled by the team in Blender and is rendered live in 3D.',
    shelfAlt: 'A grocery shelf with a jar of fish sauce, chilli sauce, salt and a loaf of bread, modelled by the team in Blender',
  },
  letter: {
    title: 'A letter from Father',
    salutation: 'Son,',
    paragraphs: [
      'I’m writing down what I know, in case I don’t get the chance to tell you.',
      '1990. Then 2001. Then 2013. Every ten or twelve years someone in the village falls asleep and never wakes. The doctors call it a coma. The old folks say the tree is keeping their souls.',
      'I pinned everything to the hallway wall. The longer I looked, the more they had in common: each of them carried a regret they never spoke aloud.',
      'If something happens to me, don’t go looking for the tree. Mind the shop, light incense for your mother, and lock the door before dark.',
    ],
    signature: 'Dad',
    role: 'Police officer, retired',
    stub: 'Follow to find out if he wakes in time.',
  },
  wall: {
    title: 'The hallway wall',
    intro: 'Father pinned every story about the village’s sleepers here. Use the flashlight to read.',
    outro: 'Every ten or twelve years. This time it’s him.',
    hintPointer: 'Move to shine the light',
    hintTouch: 'Touch and hold to shine',
    clippings: [
      {
        year: '1990',
        headline: 'Two neighbours fall into unexplained comas',
        body: 'Two men from the upper hamlet were taken to the clinic after no one could wake them. Their families say both were well the night before.',
      },
      {
        year: '2001',
        headline: 'Carpenter found asleep under the old tree, still unconscious after three days',
        body: 'Relatives found him at dawn beside the ancient tree at the village gate. Doctors have found no injury.',
      },
      {
        year: '2002',
        headline: 'Provincial hospital admits fifth coma case this year',
        body: 'All of the patients come from the same village. Samples have been sent to the city for testing.',
      },
      {
        year: '2013',
        headline: '“The sleeping village”: a mystery without an answer',
        body: 'For more than twenty years it has returned on a rhythm the villagers do not dare to name.',
      },
      {
        year: '2024',
        headline: 'High-school teacher in deep coma after an evening class',
        body: 'Colleagues found her in a classroom after school had closed. Her young son is staying with his grandmother.',
      },
      {
        year: 'Father’s note',
        headline: '10–12 years. Every one of them regretted something. The tree?',
        body: '',
      },
    ],
  },
  entity: {
    title: 'The blood root',
    statement:
      'It kills no one. It keeps the souls of the wounded, feeds on their guilt and regret, and builds nightmares out of their memories.',
    rows: [
      { name: 'It feeds', detail: 'on guilt and regret' },
      { name: 'It builds', detail: 'realms out of memory' },
      { name: 'It keeps', detail: 'old victims guard each chapter' },
      { name: 'It persuades', detail: 'your pain, until you give in' },
    ],
  },
  chapter: {
    title: 'Chapter 1: The teacher',
    prev: 'Previous moment',
    next: 'Next moment',
    moments: [
      {
        name: 'The first night',
        text: 'After your first day at the counter, you fall asleep and wake in a school corridor.',
        alt: 'A dark school corridor with a classroom door ajar',
      },
      {
        name: 'The dirty hall',
        text: 'Sweep the floor and gather torn pieces of a photograph from the patterned tiles.',
        alt: 'A torn photo piece lying on patterned floor tiles',
      },
      {
        name: 'Lights out',
        text: 'The fluorescent tubes die. From here on there is only your flashlight.',
        alt: 'A flashlight beam sweeping down a dark staircase',
      },
      {
        name: 'The torn photo',
        text: 'Nine pieces become a classroom at night: your first clue.',
        alt: 'The in-game torn photo puzzle',
      },
      {
        name: 'The classroom',
        text: 'The teacher is counting at her desk. You have one minute to find somewhere to hide.',
        alt: 'A dark classroom with wooden desks',
      },
      {
        name: 'Hold your breath',
        text: 'Find a cupboard and stay inside until the footsteps pass.',
        alt: 'A corridor with a countdown: the teacher is counting, find a cupboard to hide in',
      },
    ],
  },
  puzzle: {
    title: 'Piece it back together',
    intro: 'This photograph is the first clue of chapter 1. Drag or tap two pieces to swap them.',
    keyboard: 'Keyboard: arrow keys to move, Enter to swap.',
    moves: (n: number) => `${n} ${n === 1 ? 'move' : 'moves'}`,
    piece: (n: number, row: number, col: number) => `Piece ${n}, row ${row} column ${col}`,
    selected: 'selected',
    reset: 'Shuffle again',
    solved: 'The classroom, that night. Miss Mai never came home.',
    solvedIn: (n: number) => `You put it back together in ${n} ${n === 1 ? 'move' : 'moves'}.`,
    alt: 'A classroom at night washed in red: the completed photo from the minigame',
  },
  making: {
    title: 'Built from real things',
    intro:
      'A jar of fish sauce, a loaf of bread, the incense burner on the altar: we modelled each one in Blender so the house feels like a real Vietnamese home.',
    altarAlt: 'A 3D family altar: a funeral portrait, altar lamp, incense burner and chrysanthemums on an altar cabinet',
    tiles: [
      { img: 'altar', name: 'The altar', where: 'The house', tool: 'Unity', note: 'Portrait, lamp, incense burner' },
      { img: 'house', name: 'Living room', where: 'The house', tool: 'Unity', note: 'Patterned tiles, blue walls' },
      { img: 'bedroom', name: 'Bedroom', where: 'The house', tool: 'Unity', note: 'Floral sheets, wooden wardrobe' },
      { img: 'school', name: 'Corridor by day', where: 'The school', tool: 'Unity', note: 'Before the lights go out' },
      { img: 'classroom', name: 'Classroom', where: 'The school', tool: 'Blender', note: 'Wooden desks, green board' },
      { img: 'corridorDay', name: 'Corridor', where: 'The school', tool: 'Blender', note: 'Like the FPT basement' },
      { img: 'stairs', name: 'Stairwell', where: 'The school', tool: 'Blender', note: 'The way upstairs' },
      { img: 'corridorRed', name: 'Nightmare', where: 'The other side', tool: 'Blender', note: 'A corridor stained red' },
    ],
  },
  stats: {
    titleA: 'A game',
    titleB: 'made by hand',
    figures: [
      { value: '10–12', caption: 'years in each cycle of the blood root' },
      { value: '9', caption: 'pieces of the torn photograph' },
      { value: '30', caption: 'models the team built in Blender' },
      { value: '3', caption: 'settings: the house, the school, the village' },
      { value: '1', caption: 'chapter playable so far' },
    ],
  },
  studio: {
    title: 'Hextrix Studio',
    letter:
      'We are a team of FPT University students making Blood Root for the EXE201 course. We wanted a horror game Vietnamese players would recognise at a glance: the corner grocery store, the patterned floor tiles, the smell of incense on the family altar.',
    members: [
      { name: 'Nguyễn Phúc Thịnh', role: 'Front-end design, game development' },
      { name: 'Trần Hữu Thắng', role: 'Business analysis, project management' },
      { name: 'Tạ Ngọc Thanh Thanh', role: 'Graphic design' },
      { name: 'Nguyễn Đình Nhu', role: 'Graphic design' },
      { name: 'Lê Nguyễn Quốc Hùng', role: 'Game development' },
      { name: 'Trần Gia Phú', role: 'Game development' },
    ],
  },
  footer: {
    signoff: 'Lock the door before dark',
    message: 'Blood Root is in development. Follow our page for news of the playable demo.',
    links: { facebook: 'Facebook page', top: 'Back to top' },
    stampAlt: 'The funeral portrait on the in-game altar',
    imprint: '© 2026 Hextrix Studio · EXE201, FPT University',
    credits: 'Third-party models',
  },
}
