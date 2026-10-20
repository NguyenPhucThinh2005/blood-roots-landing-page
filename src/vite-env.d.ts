/// <reference types="vite/client" />

// vite-imagetools: `import img from './a.png?w=1200&format=avif'` returns a URL;
// add `&as=picture` to get sources for <picture>. Declared loosely so any query type-checks.
declare module '*&imagetools' {
  const src: string
  export default src
}

declare module '*as=picture' {
  const picture: {
    sources: Record<string, string>
    img: { src: string; w: number; h: number }
  }
  export default picture
}

declare module '*format=avif' {
  const src: string
  export default src
}

declare module '*format=webp' {
  const src: string
  export default src
}
