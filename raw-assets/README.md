# raw-assets

Thư mục chứa file gốc, **không đưa lên git** (đã có trong `.gitignore`). Bản gốc vẫn lưu trên Drive của nhóm.

```
raw-assets/
  drive/      file tải từ Drive EXE/MEDIA (PSD, AI, PNG)
    exports/  file tôi xuất ra từ đó (logo SVG...)
  images/     ảnh chụp trong quá trình phát triển
  videos/     video gameplay gốc (+ contact sheet để chọn đoạn)
```

## Lưu ý về file gốc
- **Cả 3 PSD đều ở hệ màu CMYK** (dùng cho in ấn). Trước khi tách layer cho web cần GD chuyển sang RGB trong Photoshop: Edit → Convert to Profile → sRGB. Sau đó xuất từng nhóm layer (background, smoke, dust, spider-web, light, logo) thành PNG có nền trong suốt.
- `TYPO-GAME.ai` là vector thật. Đã xuất thành `drive/exports/TYPO-GAME.svg`, gồm logo "BLOOD ROOT" có rễ cây và 2 phiên bản logo Hextrix.
- Ảnh trong `images/` là ảnh chụp màn hình còn giao diện Unity/Blender, đã bị Zalo nén. Chỉ dùng làm tham khảo hoặc cho mục "hậu trường", không dùng làm ảnh chính.
- `videos/class-room.mp4` dài 3:40 và dính HUD (nhiệm vụ, phụ đề, tâm ngắm). Nên quay lại các cảnh không có UI.

Sau khi xử lý (xem README ở thư mục gốc), file đã tối ưu đặt vào `src/assets/images/` hoặc `public/media/`.
