# Art direction — Blood Root landing page

Direction được rút bằng taste-skill: **page-is-the-object** ("The page is the object"), seed `2095115771`, ngày 2026-10-20. Bản đầy đủ in lại bằng `node .claude/skills/design-taste-frontend/scripts/draw.mjs --show`.
3 direction được rút: name-as-monument, page-is-the-object, editorial-report. Chọn page-is-the-object vì Blood Root **có sẵn một vật thật trong thế giới game**: bức tường hành lang dán bài báo và tập hồ sơ điều tra của người cha (GDD). Hai direction kia không chứa được điều đó.

## Ý tưởng

> Trên trang này, **tập hồ sơ và bức tường bài báo mà người cha (cảnh sát đã nghỉ hưu) để lại về những vụ hôn mê lặp lại mỗi 10–12 năm** trở thành **chính trang web**: chồng folder có tab, các mẩu báo cắt dán, lá thư có mép xé, nhãn vật chứng, tấm bưu thiếp ở mặt sau.

- **Phép thử đối thủ:** thay "Blood Root" bằng một game kinh dị khác thì câu này không còn đúng. Chu kỳ 10–12 năm, người cha cảnh sát, tiệm tạp hóa và bức tường hành lang đều chỉ Blood Root có.
- **Thứ tương tác được (live thing, duy nhất 1):** **ghép lại bức ảnh bị xé 9 mảnh**, cơ chế độc đáo của game. Dùng ảnh thật `phong_hoc_dem.jpg` của minigame. Chơi được bằng chuột, chạm và bàn phím. Nếu không có JS thì hiện ảnh hoàn chỉnh.
- **Đèn pin:** chuyển động tạo không khí ở bức tường bài báo (cơ chế phím F trong game). Không phải trò chơi thứ hai. Nội dung luôn nằm trong DOM và đọc được khi bật reduced motion.
- **Mức độ kinh dị:** ám ảnh, không jump scare, không nháy quá 3 lần/giây (WCAG 2.3.1).

## Hệ thống

| Vai trò | Giá trị |
|---|---|
| Nền (ground) | `void #070505` |
| Giấy (paper) | `bone #f2ece4`: các mảnh báo, folder trước, lá thư, bưu thiếp |
| Mực (ink) | `void` trên giấy, `bone` trên nền |
| Điểm nhấn (accent) | `blood-500 #d61f1f`: chỉ dùng cho nút CTA, logo và trường màu của section Rễ máu (`blood-900`) |
| Màu folder | 5 tab có 5 tông lấy từ thế giới game: giấy, xanh gạch bông giảm bão hòa, đỏ thẫm, tro, xám bệnh viện |
| Tiêu đề | **Libre Franklin 700**, tracking -0.035em, leading 0.92 (đã kiểm tra subset tiếng Việt) |
| Chữ đọc | **Source Serif 4** 400/600/italic, leading 1.55 (đã kiểm tra subset tiếng Việt) |
| Cỡ chữ | `--step-small` 13–14px · `--step-body` 17–19px · `--step-lead` 20–26px · `--step-head` 32–64px · hero/logo 10vw |
| Logo | `TYPO-GAME.svg` (BLOOD ROOT có rễ), không dùng font |

Thay đổi so với nền móng: **Be Vietnam Pro được thay bằng cặp font của direction**, vì kiểu báo in hợp với bài báo dán tường.

## Section: khung (blueprint) → nội dung Blood Root

| Thứ tự | Blueprint được rút | Blood Root | Hình ảnh |
|---|---|---|---|
| Cổng vào | (thêm, vì có âm thanh và nội dung kinh dị) | Cảnh báo + chọn có/không âm thanh, logo hiện dần khi tải | Logo |
| Hero | Tabbed folder stack | Tập hồ sơ: h1 là logo, 5 tab folder dẫn tới các section; folder trước mở và chứa nút CTA | Ảnh render bàn thờ kẹp trong folder |
| 1 · intro | Title, note, facts row | "Ba không tỉnh lại": premise + hàng thông số game | Render kệ tạp hóa (model nhóm dựng) |
| 2 · about | Founder's letter (biến thể tờ giấy) | Thư ba để lại: tờ giấy mép răng cưa + phần xé ra chứa CTA | — |
| 3 · showcase | Output slips along the edge | Bức tường hành lang: video/ảnh hành lang tràn màn hình, 6 mẩu báo dựng ở mép dưới, soi bằng đèn pin | Frame hành lang từ video |
| 4 · (thêm) | Colour chapter + motion "Index with preview" | Rễ máu: nền chuyển đỏ thẫm, danh sách 4 dòng về cách thực thể vận hành, rê chuột lên dòng nào thì hiện ảnh tương ứng | Ảnh concept hành lang đỏ, lớp học, cây trong sương |
| 5 · how-it-works | Drag row of moments | Chương 1: Cô giáo, 6 khoảnh khắc theo thứ tự trong game | 6 frame từ video gameplay |
| 6 · (live thing) | Đặt cạnh khoảnh khắc "Bức ảnh bị xé" | Ghép lại bức ảnh | `phong_hoc_dem.jpg` |
| 7 · gallery | Photo tiles with label strips | Hậu trường: mỗi đồ vật là một "vật chứng" kèm nhãn (số mesh/texture thật đọc từ file .glb) | Render model + ảnh chụp Blender/Unity |
| 8 · stats | Column aligned on the decimal | Những con số có thật: chu kỳ 10–12 năm, 9 mảnh, 30 mô hình tự dựng, 3 bối cảnh, 1 chương | — |
| 9 · about | Founder's letter | Thư của Hextrix Studio + danh sách thành viên | Logo Hextrix |
| Footer | The back of the card | Mặt sau tấm bưu thiếp: lời dặn, các link, "con tem" là ảnh thờ, credit nhỏ | Render ảnh thờ |

## Ngoại lệ so với house rules (có lý do, khi chạy inspector truyền `--allow` đúng các mục này)
- **Mặt nạ đèn pin** dùng `radial-gradient`. Đây là hiệu ứng ánh sáng, không phải nền gradient.
- **Grain, vignette, ánh nến** nằm trong canvas WebGL.
- Các blueprint có bỏ heading (thư ba để lại) **vẫn có heading**, theo house rules.

## Ngân sách và an toàn
- JS ban đầu ≤ 250KB gzip; three.js tách chunk riêng.
- LCP là logo/chữ.
- Model tổng ≤ 8MB, mỗi video ≤ 4MB.
- Không quá 3 lần nháy/giây.
- Reduced motion: giữ nguyên nội dung, 3D thay bằng ảnh.

## Khác với kế hoạch ban đầu (theo house rules của taste-skill)
- **Không có cổng vào và preloader.** Màn hình đầu là HTML hiện ngay; canvas 3D tải sau. Âm thanh là nút cố định ở góc dưới bên phải, mặc định tắt (trên điện thoại chỉ hiện biểu tượng).
- **Không có custom cursor.** Đèn pin chỉ là hiệu ứng ánh sáng trong section bức tường; con trỏ hệ thống vẫn giữ nguyên.
- **Cỡ chữ gom về 6 bậc** (`--text-step-small/body/lead/title/head/display`).
- **Điện thoại:** bức tường chỉ dựng 2 mẩu báo (1990 và 2024) vừa trong lề, không cuộn ngang.
- **Màu giấy** đổi từ `#f2ece4` sang `#e9e8e4` (ít ngả vàng hơn, theo cảnh báo palette-cream).

## Kết quả gate (2026-10-20)
`lint.mjs src`: 0 FAIL. `inspect.mjs` ở 1440/768/390: **0 FAIL, 5 WARN**, đều có lý do:
- `small-title` / `hero-words`: h1 là logo dạng ảnh (có alt "Blood Root"), inspector không đọc được chữ trong ảnh nên lấy câu mô tả làm tiêu đề.
- `side-scroll`: hàng khoảnh khắc Chương 1 là carousel theo blueprint, có nút trước/sau và thanh tiến trình.
- `blank-gap`: vùng đó là tấm 3D kệ tạp hóa (canvas), inspector không đọc được nội dung canvas.
- `empty-middle` (768px): hàng tiêu đề carousel, tiêu đề bên trái và nút bên phải.
