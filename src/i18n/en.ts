import type { Dictionary } from './vi'

export const en: Dictionary = {
  meta: {
    title: 'Blood Root — Hextrix Studio',
    description:
      'A first-person psychological horror and puzzle game for PC, rooted in Vietnamese folk belief. Free demo.',
  },
  brand: {
    studio: 'Hextrix Studio',
    game: 'Blood Root',
  },
  cta: 'Sign up for the demo',
  ui: {
    soundOn: 'Turn sound on',
    soundOff: 'Turn sound off',
    switchLanguage: 'Tiếng Việt',
    switchLanguageLabel: 'Chuyển sang tiếng Việt',
    skip: 'Skip to content',
    menu: 'Contents',
    close: 'Close',
  },
  nav: {
    label: 'Main sections',
    premise: 'About',
    why: 'Why',
    features: 'Features',
    puzzle: 'Try it',
    team: 'Team',
  },
  hero: {
    tagline: 'A first-person psychological horror and puzzle game for PC, rooted in Vietnamese folk belief.',
    altarAlt:
      'The family altar in the game: portrait, altar lamp, incense burner and chrysanthemums, lit by a flashlight',
    tabs: {
      premise: 'About',
      why: 'Problem & answer',
      features: 'Features',
      puzzle: 'Try it',
      team: 'Team',
    },
  },
  premise: {
    title: 'Father won’t wake up',
    note: 'A call at midnight: your father, a retired policeman, has fallen into a deep coma no doctor can explain. You come home, reopen the family grocery store, and find the case he never finished.',
    facts: [
      { value: 'PC', label: 'Windows, first person' },
      { value: '2–3 hours', label: 'for the full game' },
      { value: 'Free', label: 'demo; full game planned at 50,000 VND' },
      { value: 'Itch.io', label: 'and Game Jolt; chapter 1 is playable' },
    ],
    shelfCaption:
      'The shop shelf: fish sauce, chilli sauce, salt and a loaf of bread. Every item was modelled by the team in Blender and is rendered live in 3D.',
    shelfAlt:
      'A grocery shelf with a jar of fish sauce, chilli sauce, salt and a loaf of bread, modelled by the team in Blender',
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
    stub: 'Get the chapter 1 demo the day the team releases it.',
  },
  why: {
    title: 'Why Blood Root exists',
    intro:
      'In our EXE101 course we surveyed students aged 18–25 who love puzzles and horror. They told us four things.',
    caption: 'Survey record: what players run into, and how Blood Root answers',
    problemHead: 'What players run into',
    solutionHead: 'What Blood Root does instead',
    rows: [
      {
        problem: 'Horror games lean on jump scares.',
        solution: 'Fear comes from atmosphere, sound and what you work out yourself. No jump scares.',
      },
      {
        problem: 'Few puzzle or detective games are set in Vietnam.',
        solution:
          'A corner grocery store, a family altar, a school at night, patterned tiles: places Vietnamese players know at a glance.',
      },
      {
        problem: 'Escape rooms cost 150,000–300,000 VND for one hour; foreign games start at 150,000 VND.',
        solution: 'A free demo; the full game is planned at 50,000 VND for 2–3 hours of play.',
      },
      {
        problem: 'Study pressure is high, and downtime is mostly scrolling.',
        solution: 'Every clue is a question: you have to look, remember and piece it together.',
      },
    ],
    proofTitle: 'Tested with 20 players',
    figures: [
      {
        value: 85,
        suffix: '%',
        caption: 'liked the mix of detective work and psychological horror, and the Vietnamese atmosphere',
      },
      { value: 75, suffix: '%', caption: 'found the story of the father’s coma gripping' },
      { value: 20, suffix: '', caption: 'players aged 18–25, students who love puzzles' },
    ],
    changesTitle: 'What we changed after the playtest',
    changes: [
      'A hint arrives when you are stuck for more than 3 minutes.',
      'A “Read clearly” mode for handwritten letters and old newspapers.',
      'Shorter chores in the grocery store.',
      'Important objects glow faintly to guide you.',
    ],
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
  features: {
    title: 'What you do in Blood Root',
    intro: 'Chapter 1, “The teacher”, is playable. These are the four things you do in it.',
    count: (i: number, n: number) => `${i} of ${n}`,
    items: [
      {
        name: 'Investigate through clues',
        text: 'Collect newspaper articles, old letters and family photos. The ending depends on how much evidence you find.',
        alt: 'A torn photo piece lying on the patterned tiles of a corridor',
      },
      {
        name: 'Live in a Vietnamese home',
        text: 'Mind the grocery store, light incense for your mother, then wake inside a school at night.',
        alt: 'The living room in the game: blue walls, a floral tablecloth, the altar at the far end',
      },
      {
        name: 'Rebuild the torn photograph',
        text: 'Nine pieces, one clue. Stuck for three minutes and the game nudges you gently.',
        alt: 'The in-game torn photo puzzle',
      },
      {
        name: 'Fear without jump scares',
        text: 'Only a flashlight, the buzz of a dying fluorescent tube, and something counting in the dark.',
        alt: 'A flashlight beam sweeping down a dark staircase',
      },
    ],
  },
  puzzle: {
    title: 'Try it now',
    intro: 'This photograph is the first clue of chapter 1. Drag or tap two pieces to swap them.',
    keyboard: 'Keyboard: arrow keys to move, Enter to swap.',
    moves: (n: number) => `${n} ${n === 1 ? 'move' : 'moves'}`,
    piece: (n: number, row: number, col: number) => `Piece ${n}, row ${row} column ${col}`,
    selected: 'selected',
    reset: 'Shuffle again',
    hint: 'Hint',
    hintText: (row: number, col: number) => `The lit piece belongs in row ${row}, column ${col}.`,
    solved: 'The classroom, that night. Miss Mai never came home.',
    solvedIn: (n: number) => `You put it back together in ${n} ${n === 1 ? 'move' : 'moves'}.`,
    alt: 'A classroom at night washed in red: the completed photo from the minigame',
  },
  making: {
    title: 'Built from real things',
    intro:
      'A jar of fish sauce, a loaf of bread, the incense burner on the altar: we modelled 30 objects in Blender so the house feels like a real Vietnamese home.',
    altarAlt:
      'A 3D family altar: a funeral portrait, altar lamp, incense burner and chrysanthemums on an altar cabinet',
    tiles: [
      {
        img: 'house',
        name: 'Living room',
        where: 'The house',
        tool: 'Unity',
        note: 'Patterned tiles, blue walls',
      },
      {
        img: 'bedroom',
        name: 'Bedroom',
        where: 'The house',
        tool: 'Unity',
        note: 'Floral sheets, wooden wardrobe',
      },
      {
        img: 'school',
        name: 'Corridor by day',
        where: 'The school',
        tool: 'Unity',
        note: 'Before the lights go out',
      },
      {
        img: 'classroom',
        name: 'Classroom',
        where: 'The school',
        tool: 'Blender',
        note: 'Wooden desks, green board',
      },
      { img: 'stairs', name: 'Stairwell', where: 'The school', tool: 'Blender', note: 'The way upstairs' },
      {
        img: 'corridorRed',
        name: 'Nightmare',
        where: 'The other side',
        tool: 'Blender',
        note: 'A corridor stained red',
      },
    ],
  },
  team: {
    title: 'Hextrix Studio',
    letter:
      'We are six FPT University students making Blood Root for the EXE201 course. We wanted a horror game Vietnamese players would recognise at a glance: the corner grocery store, the patterned floor tiles, the smell of incense on the family altar.',
    photoAlt: (name: string) => `Photo of ${name}`,
    members: [
      {
        id: 'thang',
        name: 'Trần Hữu Thắng',
        role: 'Team lead, project management',
        bio: 'Software engineering student. Front-end and back-end (ReactJS, NodeJS, MongoDB), mobile apps and deployment.',
      },
      {
        id: 'thinh',
        name: 'Nguyễn Phúc Thịnh',
        role: 'Front-end design, game development',
        bio: 'Software engineering student. ReactJS, NodeJS, MongoDB, React Native, C#, Java.',
      },
      {
        id: 'thanh',
        name: 'Tạ Ngọc Thanh Thanh',
        role: '3D texturing, graphics and UI',
        bio: '3D texturing, UI and promotional design; carries 2D concepts into the game’s 3D spaces.',
      },
      {
        id: 'nhu',
        name: 'Nguyễn Đình Nhu',
        role: '3D modelling and animation',
        bio: 'Models, topology and UVs that run smoothly in the engine; most of the character animation.',
      },
      {
        id: 'hung',
        name: 'Lê Nguyễn Quốc Hùng',
        role: 'Game development',
        bio: 'Software engineering student. ReactJS, C++, MySQL, C#, Unity.',
      },
      {
        id: 'phu',
        name: 'Trần Gia Phú',
        role: 'Game development',
        bio: 'Software engineering student. Java, ReactJS, MySQL, C#, Unity.',
      },
    ],
  },
  signup: {
    title: 'Get the demo',
    intro: 'Leave your email and we will send the chapter 1 demo when it lands on Itch.io.',
    to: 'Send to',
    email: 'Your email',
    name: 'Name (optional)',
    submit: 'Sign up for the demo',
    sending: 'Sending…',
    consent: 'Only used for news about Blood Root.',
    invalid: 'That email doesn’t look right. Please check it.',
    success: 'You’re on the list. Remember to lock the door before dark.',
    error: 'That didn’t go through. Try again, or',
    openForm: 'open the form here',
    notReady: 'The sign-up form is being set up. Follow our page for now.',
  },
  footer: {
    contact: 'Contact the team',
    links: { facebook: 'Facebook page', top: 'Back to top' },
    stampAlt: 'The funeral portrait on the in-game altar',
    imprint: '© 2026 Hextrix Studio · EXE201, FPT University',
    credits: 'Third-party models',
  },
}
