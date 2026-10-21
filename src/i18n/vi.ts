// Source of truth for copy (see docs/copy-deck.md). en.ts must match this shape (enforced by the Dictionary type).
// Product facts, problems, playtest figures and member bios come from the team's EXE101 deck.
export const vi = {
  meta: {
    title: 'Blood Root — Hextrix Studio',
    description:
      'Game kinh dị tâm lý, giải đố góc nhìn thứ nhất trên PC, lấy cảm hứng từ tín ngưỡng dân gian Việt Nam. Bản demo miễn phí.',
  },
  brand: {
    studio: 'Hextrix Studio',
    game: 'Blood Root',
  },
  cta: 'Đăng ký chơi thử',
  ui: {
    soundOn: 'Bật âm thanh',
    soundOff: 'Tắt âm thanh',
    switchLanguage: 'English',
    switchLanguageLabel: 'Switch to English',
    skip: 'Bỏ qua tới nội dung',
    menu: 'Mục lục',
    close: 'Đóng',
  },
  nav: {
    label: 'Các mục chính',
    premise: 'Giới thiệu',
    why: 'Vấn đề',
    features: 'Tính năng',
    puzzle: 'Chơi thử',
    team: 'Nhóm',
  },
  hero: {
    tagline:
      'Game kinh dị tâm lý, giải đố góc nhìn thứ nhất trên PC, lấy cảm hứng từ tín ngưỡng dân gian Việt Nam.',
    altarAlt: 'Bàn thờ gia đình trong game: ảnh thờ, đèn thờ, lư hương và bình hoa cúc, soi bằng đèn pin',
    tabs: {
      premise: 'Giới thiệu',
      why: 'Vấn đề & giải pháp',
      features: 'Tính năng',
      puzzle: 'Chơi thử',
      team: 'Nhóm',
    },
  },
  premise: {
    title: 'Ba không tỉnh lại',
    note: 'Một cuộc gọi lúc nửa đêm: ba, một cảnh sát đã nghỉ hưu, hôn mê sâu không rõ lý do. Bạn về quê, mở lại tiệm tạp hóa của gia đình, và tìm thấy tập hồ sơ ông còn điều tra dở.',
    facts: [
      { value: 'PC', label: 'Windows, góc nhìn thứ nhất' },
      { value: '2–3 giờ', label: 'cho bản đầy đủ' },
      { value: 'Miễn phí', label: 'bản demo; bản đầy đủ dự kiến 50.000đ' },
      { value: 'Itch.io', label: 'và Game Jolt; Chương 1 đã chơi được' },
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
    stub: 'Nhận bản chơi thử Chương 1 ngay khi nhóm phát hành.',
  },
  why: {
    title: 'Vì sao có Blood Root',
    intro:
      'Ở môn EXE101, nhóm khảo sát sinh viên 18–25 tuổi mê giải đố và kinh dị. Họ nói với chúng tôi bốn điều.',
    caption: 'Biên bản khảo sát: điều người chơi đang gặp và cách Blood Root trả lời',
    problemHead: 'Người chơi đang gặp',
    solutionHead: 'Blood Root làm khác',
    rows: [
      {
        problem: 'Game kinh dị chủ yếu dựa vào jump scare.',
        solution: 'Nỗi sợ đến từ không khí, âm thanh và những gì bạn tự suy ra. Không hù dọa.',
      },
      {
        problem: 'Hiếm game giải đố, trinh thám mang bối cảnh Việt.',
        solution: 'Tiệm tạp hóa, bàn thờ, trường học về đêm, nền gạch bông: người Việt nhìn là nhận ra.',
      },
      {
        problem: 'Escape room 150.000–300.000đ cho một giờ; game nước ngoài từ 150.000đ.',
        solution: 'Bản demo miễn phí; bản đầy đủ dự kiến 50.000đ cho 2–3 giờ chơi.',
      },
      {
        problem: 'Áp lực học hành, còn giải trí thường chỉ là lướt mạng.',
        solution: 'Mỗi manh mối là một câu hỏi: phải nhìn, nhớ và tự ghép lại.',
      },
    ],
    proofTitle: 'Đã thử với 20 người chơi',
    figures: [
      {
        value: 85,
        suffix: '%',
        caption: 'thích cách kết hợp trinh thám với kinh dị tâm lý, và không khí rất Việt',
      },
      { value: 75, suffix: '%', caption: 'thấy câu chuyện người cha hôn mê cuốn hút' },
      { value: 20, suffix: '', caption: 'người chơi 18–25 tuổi, sinh viên, mê giải đố' },
    ],
    changesTitle: 'Sau buổi thử, nhóm đã sửa',
    changes: [
      'Có gợi ý khi bạn kẹt quá 3 phút.',
      'Có chế độ “Đọc rõ” cho thư tay và báo cũ.',
      'Rút ngắn việc vặt ở tiệm tạp hóa.',
      'Đồ vật quan trọng phát sáng nhẹ để dẫn đường.',
    ],
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
  features: {
    title: 'Bạn sẽ làm gì trong Blood Root',
    intro: 'Chương 1 “Cô giáo” đã chơi được. Đây là bốn điều bạn làm trong đó.',
    count: (i: number, n: number) => `${i} / ${n}`,
    items: [
      {
        name: 'Điều tra bằng manh mối',
        text: 'Nhặt bài báo, thư cũ, ảnh gia đình. Cái kết thay đổi theo số bằng chứng bạn tìm được.',
        alt: 'Một mảnh ảnh bị xé nằm trên nền gạch bông của hành lang',
      },
      {
        name: 'Sống trong một căn nhà Việt',
        text: 'Trông tiệm tạp hóa, thắp nhang cho mẹ, rồi tỉnh dậy trong ngôi trường về đêm.',
        alt: 'Phòng khách trong game: tường xanh, bàn ăn trải khăn hoa, bàn thờ ở cuối phòng',
      },
      {
        name: 'Ghép lại bức ảnh bị xé',
        text: 'Chín mảnh, một manh mối. Kẹt quá ba phút, trò chơi sẽ khẽ gợi ý.',
        alt: 'Giao diện ghép bức ảnh bị xé trong game',
      },
      {
        name: 'Sợ mà không bị hù',
        text: 'Chỉ có chiếc đèn pin, tiếng đèn huỳnh quang rè, và thứ gì đó đang đếm trong bóng tối.',
        alt: 'Vệt đèn pin quét xuống cầu thang tối',
      },
    ],
  },
  puzzle: {
    title: 'Chơi thử ngay',
    intro: 'Bức ảnh này là manh mối đầu tiên của chương 1. Kéo hoặc chạm hai mảnh để đổi chỗ.',
    keyboard: 'Bàn phím: phím mũi tên để chọn, Enter để đổi chỗ.',
    moves: (n: number) => `${n} nước`,
    piece: (n: number, row: number, col: number) => `Mảnh ${n}, hàng ${row} cột ${col}`,
    selected: 'đang chọn',
    reset: 'Xáo lại',
    hint: 'Gợi ý',
    hintText: (row: number, col: number) => `Mảnh đang sáng thuộc về hàng ${row}, cột ${col}.`,
    solved: 'Lớp học, đêm hôm ấy. Cô Mai chưa bao giờ về nhà.',
    solvedIn: (n: number) => `Bạn đã ghép xong sau ${n} nước.`,
    alt: 'Lớp học về đêm nhuốm ánh đỏ, bức ảnh hoàn chỉnh từ minigame',
  },
  making: {
    title: 'Dựng từ đồ vật quen',
    intro:
      'Hũ nước mắm, ổ bánh mì, lư hương trên bàn thờ: nhóm tự dựng 30 mô hình bằng Blender để căn nhà trông như nhà thật ở Việt Nam.',
    altarAlt: 'Bàn thờ dựng bằng 3D: ảnh thờ, đèn thờ, lư hương và bình hoa cúc trên tủ thờ',
    tiles: [
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
      { img: 'stairs', name: 'Cầu thang', where: 'Ngôi trường', tool: 'Blender', note: 'Lối lên tầng trên' },
      { img: 'corridorRed', name: 'Dị cảnh', where: 'Ác mộng', tool: 'Blender', note: 'Hành lang nhuốm đỏ' },
    ],
  },
  team: {
    title: 'Hextrix Studio',
    letter:
      'Chúng tôi là sáu sinh viên FPT University làm Blood Root trong môn EXE201. Chúng tôi muốn một trò chơi kinh dị mà người Việt nhìn vào là nhận ra: tiệm tạp hóa đầu ngõ, nền gạch bông, mùi nhang trên bàn thờ.',
    photoAlt: (name: string) => `Ảnh của ${name}`,
    members: [
      {
        id: 'thang',
        name: 'Trần Hữu Thắng',
        role: 'Trưởng nhóm, quản lý dự án',
        bio: 'Sinh viên Kỹ thuật phần mềm. Làm front-end, back-end (ReactJS, NodeJS, MongoDB), ứng dụng di động và triển khai.',
      },
      {
        id: 'thinh',
        name: 'Nguyễn Phúc Thịnh',
        role: 'Thiết kế front-end, lập trình game',
        bio: 'Sinh viên Kỹ thuật phần mềm. ReactJS, NodeJS, MongoDB, React Native, C#, Java.',
      },
      {
        id: 'thanh',
        name: 'Tạ Ngọc Thanh Thanh',
        role: 'Texture 3D, đồ họa và UI',
        bio: 'Làm texture 3D, thiết kế UI và ấn phẩm quảng bá; đưa ý tưởng 2D vào không gian 3D của game.',
      },
      {
        id: 'nhu',
        name: 'Nguyễn Đình Nhu',
        role: 'Dựng mô hình và hoạt ảnh 3D',
        bio: 'Dựng mô hình, tối ưu lưới và UV để chạy mượt trên engine; làm phần lớn hoạt ảnh nhân vật.',
      },
      {
        id: 'hung',
        name: 'Lê Nguyễn Quốc Hùng',
        role: 'Lập trình game',
        bio: 'Sinh viên Kỹ thuật phần mềm. ReactJS, C++, MySQL, C#, Unity.',
      },
      {
        id: 'phu',
        name: 'Trần Gia Phú',
        role: 'Lập trình game',
        bio: 'Sinh viên Kỹ thuật phần mềm. Java, ReactJS, MySQL, C#, Unity.',
      },
    ],
  },
  signup: {
    title: 'Nhận bản chơi thử',
    intro: 'Để lại email, nhóm gửi bản demo Chương 1 khi lên Itch.io.',
    to: 'Gửi đến',
    email: 'Email của bạn',
    name: 'Tên (không bắt buộc)',
    submit: 'Đăng ký chơi thử',
    sending: 'Đang gửi…',
    consent: 'Chỉ dùng để báo tin Blood Root.',
    invalid: 'Email này chưa đúng. Kiểm tra lại giúp nhóm nhé.',
    success: 'Đã ghi tên bạn. Nhớ khóa cửa trước khi trời tối.',
    error: 'Chưa gửi được. Thử lại, hoặc',
    openForm: 'mở form ở đây',
    notReady: 'Form đăng ký đang được nhóm chuẩn bị. Tạm thời theo dõi fanpage nhé.',
  },
  footer: {
    contact: 'Liên hệ nhóm',
    links: { facebook: 'Fanpage Facebook', top: 'Về đầu trang' },
    stampAlt: 'Ảnh thờ trên bàn thờ trong game',
    imprint: '© 2026 Hextrix Studio · EXE201, FPT University',
    credits: 'Mô hình bên thứ ba',
  },
}

export type Dictionary = typeof vi
