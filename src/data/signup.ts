// The sign-up form posts straight to the team's Google Form (no backend). To wire it up:
// 1. Create a Google Form with two short-answer questions: Email (required) and Name.
//    Settings: "Collect email addresses" = Do not collect, "Require sign-in" = off.
// 2. ⋮ → Get pre-filled link, fill both fields, copy the link. It looks like
//    https://docs.google.com/forms/d/e/<FORM_ID>/viewform?entry.111=a&entry.222=b
// 3. Paste FORM_ID and the two entry ids below.
// Google answers with an opaque response (mode: 'no-cors'), so success is assumed once the request
// leaves; `viewUrl` is offered as a fallback when the request itself fails.
const FORM_ID = ''

export const signupForm = {
  ready: FORM_ID !== '',
  action: `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
  viewUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,
  fields: {
    email: 'entry.0',
    name: 'entry.0',
  },
}

/** Team inbox for the contact line; leave empty to show only the Facebook page. */
export const CONTACT_EMAIL = ''
