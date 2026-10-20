# Blood Root — Landing page

Landing page cho game **Blood Root** của Hextrix Studio (EXE201, FPT). Chỉ có frontend, deploy trên Vercel.

## Bắt đầu

Yêu cầu: Node ≥ 22 (nhóm đang dùng 24), git.

```bash
npm install
npm run dev
```

| Lệnh              | Tác dụng                                  |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Chạy dev server tại http://localhost:5173 |
| `npm run build`   | Typecheck + build ra `dist/`              |
| `npm run preview` | Chạy thử bản build                        |
| `npm run lint`    | Kiểm tra code bằng oxlint                 |
| `npm run format`  | Format code bằng Prettier                 |

## Công nghệ

| Thư viện                                                    | Dùng để                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Vite + React 19.3 + TypeScript                              | Khung project. **Không nâng React lên 19.4** cho tới khi `@react-three/fiber` hỗ trợ. |
| Tailwind CSS v4                                             | Styling; design token nằm ở `src/index.css`                                           |
| Lenis                                                       | Cuộn mượt                                                                             |
| GSAP (ScrollTrigger, SplitText, Flip, CustomEase, Observer) | Mọi animation; con trỏ custom và nút nam châm dùng `gsap.quickTo`                     |
| three + @react-three/fiber + drei + postprocessing          | 3D/WebGL, chỉ tải khi cần (lazy)                                                      |
| howler                                                      | Âm thanh nền và hiệu ứng (mặc định tắt)                                               |
| vite-imagetools                                             | Tự tạo ảnh AVIF/WebP                                                                  |
| leva                                                        | Bảng chỉnh thông số khi dev                                                           |
| @vercel/analytics                                           | Đếm lượt truy cập trên Vercel                                                         |

## Cấu trúc thư mục

```
src/
  lib/          gsap.ts (đăng ký plugin), cn.ts
  providers/    SmoothScroll (Lenis + GSAP)
  hooks/        useReducedMotion
  i18n/         vi.ts (bản gốc), en.ts, LanguageProvider
  audio/        sounds.ts (danh sách âm thanh), SoundProvider
  webgl/        Scene 3D (lazy-load)
  sections/     các section của trang
  components/   cursor, preloader, nút…
  assets/images ảnh đã xuất, import qua vite-imagetools
public/media/   video/, models/, audio/ đã nén
raw-assets/     file gốc PSD/AI/video (không đưa lên git)
.claude/skills/ agent skills cho Claude Code
```

## Xử lý tài nguyên

**Ảnh:** xuất PNG từ PSD vào `src/assets/images/`, rồi import kèm query:

```ts
import hero from './assets/images/banner.png?w=1920&format=avif'
```

**Video** (cần cài ffmpeg: `winget install Gyan.FFmpeg`):

```bash
ffmpeg -i raw-assets/clip.mov -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart public/media/video/clip.mp4
```

```bash
ffmpeg -i public/media/video/clip.mp4 -frames:v 1 -q:v 3 public/media/video/clip-poster.jpg
```

**Model 3D** (.glb xuất từ Unity):

```bash
npx @gltf-transform/cli optimize raw-assets/model.glb public/media/models/model.glb --compress meshopt --texture-compress webp
```

## Agent skills

Các skill nằm trong `.claude/skills/` và được commit cùng repo, nên cả nhóm dùng chung một bộ:

- `design-taste-frontend`: gu thẩm mỹ UI (taste-skill)
- `gsap-*`: skill GSAP chính chủ của GreenSock
- `web-design-guidelines`, `vercel-react-best-practices`: của Vercel

Cập nhật skill: `npx skills update -p`. Danh sách nguồn ghi trong `skills-lock.json`.

## Deploy

Push lên GitHub, vào Vercel chọn Import Project → preset **Vite** → Deploy. Mỗi lần push lên `main` sẽ tự deploy; mỗi Pull Request có link preview riêng. Cache header được cấu hình trong `vercel.json`.
