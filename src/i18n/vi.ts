// Source of truth for copy. en.ts must match this shape (enforced by the Dictionary type).
export const vi = {
  meta: {
    title: 'Blood Root — Hextrix Studio',
    description:
      'Game kinh dị tâm lý góc nhìn thứ nhất, giải đố và phiêu lưu, lấy cảm hứng từ văn hóa và tín ngưỡng dân gian Việt Nam.',
  },
  brand: {
    studio: 'Hextrix Studio',
    game: 'Blood Root',
  },
  hero: {
    tagline: 'Game 3D cốt truyện tâm linh, giải đố, phiêu lưu — một game thuần Việt.',
    status: 'Sắp ra mắt',
  },
  ui: {
    soundOn: 'Bật âm thanh',
    soundOff: 'Tắt âm thanh',
    switchLanguage: 'Switch to English',
  },
}

export type Dictionary = typeof vi
