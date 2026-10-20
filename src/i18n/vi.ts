// Source of truth for copy (see docs/copy-deck.md). en.ts must match this shape (enforced by the Dictionary type).
export const vi = {
  meta: {
    title: 'Blood Root — Hextrix Studio',
    description:
      'Game kinh dị tâm lý góc nhìn thứ nhất trên PC, lấy cảm hứng từ tín ngưỡng dân gian Việt Nam.',
  },
  brand: {
    studio: 'Hextrix Studio',
    game: 'Blood Root',
  },
  cta: 'Theo dõi trên Facebook',
  ui: {
    soundOn: 'Bật âm thanh',
    soundOff: 'Tắt âm thanh',
    switchLanguage: 'English',
    switchLanguageLabel: 'Switch to English',
    skip: 'Bỏ qua tới nội dung',
  },
  hero: {
    tagline: 'Game kinh dị tâm lý góc nhìn thứ nhất trên PC, lấy cảm hứng từ tín ngưỡng dân gian Việt Nam.',
    tabs: {
      premise: 'Cuộc gọi',
      wall: 'Bức tường',
      entity: 'Rễ máu',
      chapter: 'Chương 1',
      making: 'Hậu trường',
    },
  },
  premise: {
    title: 'Ba không tỉnh lại',
    note: 'Một cuộc gọi lúc nửa đêm: ba, một cảnh sát đã nghỉ hưu, hôn mê sâu không rõ lý do. Bạn về quê, mở lại tiệm tạp hóa của gia đình, và tìm thấy tập hồ sơ ông còn điều tra dở.',
    facts: [
      { value: 'PC', label: 'Nền tảng phát hành' },
      { value: 'Góc nhìn thứ nhất', label: 'Khám phá, giải đố, ẩn nấp' },
      { value: 'Chương 1', label: 'Cô giáo, ngôi trường về đêm' },
      { value: 'Sắp ra mắt', label: 'Đang phát triển trên Unity' },
    ],
    shelfCaption:
      'Kệ hàng của tiệm: hũ nước mắm, chai tương ớt, hũ muối, ổ bánh mì. Mỗi món đều do nhóm dựng bằng Blender, hiển thị trực tiếp bằng 3D.',
    shelfAlt:
      'Kệ tiệm tạp hóa với hũ nước mắm, chai tương ớt, hũ muối và ổ bánh mì do nhóm dựng bằng Blender',
  },
  letter: {
    title: 'Thư ba để lại',
    salutation: 'Con,',
    paragraphs: [
      'Ba ghi lại những gì ba biết, phòng khi ba không kịp nói.',
      'Năm 1990, rồi 2001, rồi 2013. Cứ mười, mười hai năm, trong làng lại có người ngủ mà không dậy nữa. Bác sĩ gọi là hôn mê. Người già gọi là bị cây giữ hồn.',
      'Ba dán hết lên tường hành lang. Càng nhìn, ba càng thấy họ giống nhau ở một điều: ai cũng mang một nỗi hối hận chưa nói ra.',
      'Nếu ba có chuyện gì, đừng đi tìm cái cây. Trông tiệm, thắp nhang cho mẹ, và khóa cửa trước khi trời tối.',
    ],
    signature: 'Ba',
    role: 'Cảnh sát, đã nghỉ hưu',
    stub: 'Theo dõi để biết ba có kịp tỉnh lại không.',
  },
  wall: {
    title: 'Bức tường hành lang',
    intro: 'Ba dán ở đây mọi bài báo về những người hôn mê trong làng. Soi đèn pin để đọc.',
    outro: 'Cứ mười, mười hai năm lại một lần. Lần này là ba.',
    hintPointer: 'Di chuột để soi',
    hintTouch: 'Chạm và giữ để soi',
    clippings: [
      {
        year: '1990',
        headline: 'Hai người cùng xóm hôn mê không rõ nguyên nhân',
        body: 'Hai người đàn ông ở xóm trên được đưa lên trạm xá sau khi không thể đánh thức. Gia đình cho biết cả hai vẫn khỏe mạnh vào tối hôm trước.',
      },
      {
        year: '2001',
        headline: 'Thợ mộc ngủ gục bên gốc cây đầu làng, ba ngày chưa tỉnh',
        body: 'Người nhà tìm thấy ông nằm cạnh gốc cây cổ thụ lúc rạng sáng. Bác sĩ chưa tìm ra tổn thương nào.',
      },
      {
        year: '2002',
        headline: 'Bệnh viện tỉnh tiếp nhận ca hôn mê thứ năm trong năm',
        body: 'Các bệnh nhân đều đến từ cùng một làng. Mẫu xét nghiệm đã được gửi lên tuyến trên.',
      },
      {
        year: '2013',
        headline: '“Làng ngủ”: chuyện chưa có lời giải',
        body: 'Hơn hai mươi năm, chuyện lặp lại theo một nhịp mà người trong làng không dám gọi tên.',
      },
      {
        year: '2024',
        headline: 'Cô giáo trường cấp ba hôn mê sâu sau buổi dạy tối',
        body: 'Cô được đồng nghiệp phát hiện trong lớp học sau giờ tan trường. Con trai nhỏ của cô đang ở với bà ngoại.',
      },
      {
        year: 'Ghi chú của ba',
        headline: '10–12 năm. Ai cũng mang một điều hối tiếc. Cái cây?',
        body: '',
      },
    ],
  },
  entity: {
    title: 'Rễ máu',
    statement:
      'Nó không giết ai. Nó giữ linh hồn của những người đang tổn thương, nuôi mình bằng tội lỗi và hối tiếc của họ, rồi dựng ác mộng từ chính ký ức ấy.',
    rows: [
      { name: 'Hấp thu', detail: 'tội lỗi và hối tiếc' },
      { name: 'Dị cảnh', detail: 'dựng từ ký ức nạn nhân' },
      { name: 'Kẻ giữ cửa', detail: 'nạn nhân cũ canh giữ mỗi chương' },
      { name: 'Lời dụ dỗ', detail: 'gợi lại nỗi đau để bạn đầu hàng' },
    ],
  },
  chapter: {
    title: 'Chương 1: Cô giáo',
    prev: 'Khoảnh khắc trước',
    next: 'Khoảnh khắc sau',
    moments: [
      {
        name: 'Đêm đầu tiên',
        text: 'Sau ngày bán hàng đầu tiên, bạn ngủ thiếp đi và tỉnh dậy trong hành lang một ngôi trường.',
        alt: 'Hành lang trường học tối, cửa lớp mở hé',
      },
      {
        name: 'Hành lang bẩn',
        text: 'Quét rác, nhặt từng mảnh ảnh bị xé vương trên nền gạch bông.',
        alt: 'Một mảnh ảnh bị xé nằm trên nền gạch bông',
      },
      {
        name: 'Đèn tắt',
        text: 'Đèn huỳnh quang tắt phụt. Từ đây chỉ còn chiếc đèn pin.',
        alt: 'Vệt đèn pin quét xuống cầu thang tối',
      },
      {
        name: 'Bức ảnh bị xé',
        text: 'Chín mảnh ghép lại thành lớp học về đêm, manh mối đầu tiên.',
        alt: 'Giao diện ghép bức ảnh bị xé trong game',
      },
      {
        name: 'Lớp học',
        text: 'Cô giáo đang đếm ở bục giảng. Bạn có một phút để tìm chỗ trốn.',
        alt: 'Lớp học tối với bàn ghế gỗ',
      },
      {
        name: 'Nín thở',
        text: 'Tìm một chiếc tủ và trốn trong đó cho đến khi tiếng bước chân đi qua.',
        alt: 'Hành lang với dòng chữ đếm ngược: cô giáo đang đếm ở bục giảng, nhanh chóng tìm tủ để trốn',
      },
    ],
  },
  puzzle: {
    title: 'Ghép lại bức ảnh',
    intro: 'Bức ảnh này là manh mối đầu tiên của chương 1. Kéo hoặc chạm hai mảnh để đổi chỗ.',
    keyboard: 'Bàn phím: phím mũi tên để chọn, Enter để đổi chỗ.',
    moves: (n: number) => `${n} nước`,
    piece: (n: number, row: number, col: number) => `Mảnh ${n}, hàng ${row} cột ${col}`,
    selected: 'đang chọn',
    reset: 'Xáo lại',
    solved: 'Lớp học, đêm hôm ấy. Cô Mai chưa bao giờ về nhà.',
    solvedIn: (n: number) => `Bạn đã ghép xong sau ${n} nước.`,
    alt: 'Lớp học về đêm nhuốm ánh đỏ, bức ảnh hoàn chỉnh từ minigame',
  },
  making: {
    title: 'Dựng từ đồ vật quen',
    intro:
      'Hũ nước mắm, ổ bánh mì, lư hương trên bàn thờ: nhóm tự dựng từng món bằng Blender để căn nhà trông như nhà thật ở Việt Nam.',
    altarAlt: 'Bàn thờ dựng bằng 3D: ảnh thờ, đèn thờ, lư hương và bình hoa cúc trên tủ thờ',
    tiles: [
      { img: 'altar', name: 'Bàn thờ', where: 'Căn nhà', tool: 'Unity', note: 'Ảnh thờ, đèn thờ, lư hương' },
      {
        img: 'house',
        name: 'Phòng khách',
        where: 'Căn nhà',
        tool: 'Unity',
        note: 'Nền gạch bông, tường xanh',
      },
      { img: 'bedroom', name: 'Phòng ngủ', where: 'Căn nhà', tool: 'Unity', note: 'Ga giường hoa, tủ gỗ' },
      {
        img: 'school',
        name: 'Hành lang ban ngày',
        where: 'Ngôi trường',
        tool: 'Unity',
        note: 'Trước khi đèn tắt',
      },
      {
        img: 'classroom',
        name: 'Lớp học',
        where: 'Ngôi trường',
        tool: 'Blender',
        note: 'Bàn ghế gỗ, bảng xanh',
      },
      {
        img: 'corridorDay',
        name: 'Hành lang',
        where: 'Ngôi trường',
        tool: 'Blender',
        note: 'Giống tầng hầm FPT',
      },
      { img: 'stairs', name: 'Cầu thang', where: 'Ngôi trường', tool: 'Blender', note: 'Lối lên tầng trên' },
      { img: 'corridorRed', name: 'Dị cảnh', where: 'Ác mộng', tool: 'Blender', note: 'Hành lang nhuốm đỏ' },
    ],
  },
  stats: {
    titleA: 'Một trò chơi',
    titleB: 'dựng bằng tay',
    figures: [
      { value: '10–12', caption: 'năm cho mỗi chu kỳ của rễ máu' },
      { value: '9', caption: 'mảnh của bức ảnh bị xé' },
      { value: '30', caption: 'mô hình nhóm tự dựng bằng Blender' },
      { value: '3', caption: 'bối cảnh: căn nhà, ngôi trường, ngôi làng' },
      { value: '1', caption: 'chương đầu tiên đã chơi được' },
    ],
  },
  studio: {
    title: 'Hextrix Studio',
    letter:
      'Chúng tôi là nhóm sinh viên FPT University làm Blood Root trong môn EXE201. Chúng tôi muốn một trò chơi kinh dị mà người Việt nhìn vào là nhận ra: tiệm tạp hóa đầu ngõ, nền gạch bông, mùi nhang trên bàn thờ.',
    members: [
      { name: 'Nguyễn Phúc Thịnh', role: 'Thiết kế front-end, lập trình game' },
      { name: 'Trần Hữu Thắng', role: 'Phân tích nghiệp vụ, quản lý dự án' },
      { name: 'Tạ Ngọc Thanh Thanh', role: 'Thiết kế đồ họa' },
      { name: 'Nguyễn Đình Nhu', role: 'Thiết kế đồ họa' },
      { name: 'Lê Nguyễn Quốc Hùng', role: 'Lập trình game' },
      { name: 'Trần Gia Phú', role: 'Lập trình game' },
    ],
  },
  footer: {
    signoff: 'Khóa cửa trước khi trời tối',
    message: 'Blood Root đang được phát triển. Theo dõi fanpage để nhận tin về bản chơi thử.',
    links: { facebook: 'Fanpage Facebook', top: 'Về đầu trang' },
    stampAlt: 'Ảnh thờ trên bàn thờ trong game',
    imprint: '© 2026 Hextrix Studio · EXE201, FPT University',
    credits: 'Mô hình bên thứ ba',
  },
}

export type Dictionary = typeof vi
