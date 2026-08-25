# Devasriya Print — Website

Public marketing website for Devasriya Print (printing & advertising).
Built with Next.js (App Router) + TypeScript and a hand-written CSS design
system. No CSS framework, no third-party form service, no external services
of any kind.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

Node 18.18+ required.

> The voice-note recorder needs a **secure context**. It works on
> `http://localhost` during development and on any `https://` domain in
> production. It will not work over plain `http://` on a LAN IP.

---

## Where to put the real business information

**Everything lives in one file: `config/business.ts`.**

Anything wrapped in `[SQUARE BRACKETS]` is an unfilled placeholder. Those
render on the site with a **yellow highlight** so they are impossible to miss.
Replace the bracketed text with the real value and the highlight disappears by
itself — no other file needs to change.

Still to be supplied by the client:

| What | Where |
|---|---|
| Phone, WhatsApp, email, address, hours | `config/business.ts → contact` |
| GST number (or delete the field) | `config/business.ts → contact.gst` |
| **The actual service list** | `config/business.ts → services` |
| Portfolio photos + project titles | `config/business.ts → work` + `/public/work/` |
| About text | `config/business.ts → about` |
| Instagram / Facebook links | `config/business.ts → social` |
| Google Maps embed URL | `config/business.ts → contact.mapEmbedUrl` |
| Real logo files | `components/Logo.tsx`, `app/icon.svg` |

Nothing on this site is invented. There are no placeholder phone numbers that
look real, no fake testimonials, no invented years-in-business or customer
counts, and no assumed service list.

### Portfolio photos

Drop images into `public/work/` and set the `image` field:

```ts
{ title: "Shop signage", category: "Flex Printing", image: "/work/job-01.jpg" }
```

While `image` is `null`, a labelled placeholder tile renders instead.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, services preview, work preview, process |
| `/services` | Full service list |
| `/work` | Portfolio, filterable by service |
| `/process` | The six stages of a job + design-approval explainer |
| `/quote` | Enquiry / quote request form |
| `/contact` | About + contact details |

---

## Connecting the internal Devasriya software

There is **one** integration seam. Nothing else in the site talks to a backend.

```
QuoteForm  →  lib/submitEnquiry.ts  →  POST /api/enquiry  →  [ your software ]
                                       app/api/enquiry/route.ts
```

**Right now:** `app/api/enquiry/route.ts` validates the submission, logs it to
the server console, and returns a reference number. Nothing is stored or sent
anywhere.

**To connect the software:** edit the `LOCAL HANDLING` block in
`app/api/enquiry/route.ts` and forward the multipart form to the Enquiries
endpoint. The commented example in that file shows the shape. Keep the API key
in an environment variable — it must never reach the browser, which is exactly
why the form posts to this server route instead of calling the software
directly.

`lib/enquiry.ts` defines the payload. Its field names were chosen to line up
with the software's Enquiries module, so forwarding should be a straight
mapping rather than a translation layer.

### What the form already collects

- Customer: name, phone, email
- Requirement: service, quantity, dimensions, material, deadline, description
- Reference file uploads (25MB per file)
- **A recorded voice note** — the customer describes the design out loud,
  recorded in the browser with `MediaRecorder`, sent along as
  `requirement-voice-note.webm`

---

## Customer portal (phase 2)

Not built yet — deliberately. The public site is scoped to marketing and
enquiry capture only, and carries no internal or employee-facing information.

A "Customer Login" link is already wired into the header and mobile menu but
stays hidden until you flip `portalEnabled: true` in `config/business.ts` and
point `portalUrl` at the portal.

Planned portal scope (described publicly on `/process` as "coming soon"):
quotations, design review with approve / request-changes / comment, design
version history, and job tracking.

---

## Design notes

- **Type:** Archivo (display), Inter (body), Instrument Serif (accents), loaded
  from Google Fonts in `app/layout.tsx`.
- **Palette:** warm paper `#fbf8f3`, ink `#16130f`, vermilion `#d9451f`, plus
  CMYK dots used only as small registration-mark accents.
- **The logo** is a "D" monogram where a vermilion plate sits slightly
  off-register behind the ink plate — a nod to press misregistration. It is a
  placeholder; swap `components/Logo.tsx` and `app/icon.svg` for the real mark.
- All styles live in `app/globals.css`, organised by section and driven by CSS
  custom properties at the top. Change the tokens, change the whole site.
- Mobile-first throughout; the layout is built for phones and scales up.

---

## Verification status

This project was written outside a Node environment with registry access, so
`npm install` and `next build` have **not** been run against it yet. What *was*
verified before handoff:

- All six pages render without errors through React's server renderer
- Every page screenshotted at 1440px and 390px, and reviewed
- `POST /api/enquiry` tested with both a valid submission (files + voice note
  attached) and an invalid one — validation and the success path both behave

Run `npm install && npm run build` first thing and fix anything the compiler
flags — most likely candidates are dependency versions in `package.json`.
