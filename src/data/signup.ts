// The sign-up form posts straight to the team's Google Form "Blood Root - Đăng ký chơi thử" (no
// backend). Field ids come from the public viewform page (FB_PUBLIC_LOAD_DATA_); if a question is
// added or recreated in the form, read the new ids there. Choice values must match the form's
// option text exactly, so they stay in Vietnamese whatever language the page shows.
// Google answers with an opaque response (mode: 'no-cors'), so success is assumed once the request
// leaves; `viewUrl` is offered as a fallback when the request itself fails.
const FORM_ID: string = '1FAIpQLSfu4eN0Wu4azaoglXoAgAZ65V5iEd0Qr4_SjGwr899-gcJgWg'

export const signupForm = {
  ready: FORM_ID !== '',
  action: `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
  viewUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,
  fields: {
    email: 'entry.1350859792',
    name: 'entry.714542996',
    source: 'entry.698906430',
    genres: 'entry.1065176618',
  },
  /** Option values exactly as written in the form, in the same order as i18n signup.sources/genres. */
  sources: ['Facebook', 'Bạn bè giới thiệu', 'Trường / lớp học', 'Khác'],
  genres: ['Kinh dị', 'Giải đố', 'Trinh thám', 'Cốt truyện'],
}

/** Team inbox for the contact line; leave empty to show only the Facebook page. */
export const CONTACT_EMAIL = 'contactbloodroot@gmail.com'
