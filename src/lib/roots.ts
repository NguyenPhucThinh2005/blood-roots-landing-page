// Procedural roots for the "blood root" chapter: branching stroked paths, generated once from a seed
// so DrawSVG can grow them. Coordinates are in a 1000 × 1000 box.

export type RootPath = { d: string; width: number; depth: number }

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generateRoots(seed = 7, starts?: Array<[number, number, number]>): RootPath[] {
  const rand = mulberry32(seed)
  const paths: RootPath[] = []

  const grow = (x: number, y: number, angle: number, length: number, width: number, depth: number) => {
    const steps = 6 + Math.floor(rand() * 4)
    const seg = length / steps
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`
    const forks: Array<[number, number, number]> = []
    for (let i = 0; i < steps; i++) {
      angle += (rand() - 0.5) * 0.7
      const nx = x + Math.cos(angle) * seg
      const ny = y + Math.sin(angle) * seg
      const cx = (x + nx) / 2 + (rand() - 0.5) * seg * 0.6
      const cy = (y + ny) / 2 + (rand() - 0.5) * seg * 0.6
      d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`
      x = nx
      y = ny
      if (depth < 3 && i > 0 && rand() < 0.42) forks.push([x, y, angle])
    }
    paths.push({ d, width, depth })
    for (const [fx, fy, fa] of forks) {
      const side = rand() < 0.5 ? -1 : 1
      grow(fx, fy, fa + side * (0.45 + rand() * 0.5), length * (0.45 + rand() * 0.2), width * 0.6, depth + 1)
    }
  }

  const origins: Array<[number, number, number]> = starts ?? [
    [80, -10, Math.PI / 2 + 0.3],
    [300, -10, Math.PI / 2 - 0.1],
    [560, -10, Math.PI / 2 + 0.15],
    [820, -10, Math.PI / 2 - 0.35],
    [-10, 420, 0.2],
    [1010, 600, Math.PI - 0.15],
  ]
  for (const [x, y, a] of origins) grow(x, y, a, 380 + rand() * 260, 5 + rand() * 2, 0)
  return paths
}
