/**
 * ============================================================================
 * DEVASRIYA PRINT — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * EVERY business detail on the website comes from this one file.
 * Edit here and the whole site updates. Do not hardcode details in pages.
 *
 * Anything wrapped in [SQUARE BRACKETS] is a PLACEHOLDER and is NOT real.
 * Placeholders render with a visible highlight on the site so they are easy
 * to spot. Replace them with the real values, and the highlight disappears
 * automatically.
 *
 * Nothing in this file is invented — no fake phone numbers, no fake address,
 * no fake service list, no fake testimonials, no fake experience claims.
 * ============================================================================
 */

export const business = {
  name: "Devasriya Print",
  shortName: "Devasriya",

  /** One line, shown in the header area and meta description. */
  tagline: "Printing & Advertising",

  /**
   * The hero promise. Rewrite in the client's own words once confirmed.
   * Kept deliberately generic and true — describes how the business works,
   * not claims about it.
   */
  promise:
    "Custom printing and advertising work, handled end to end — from your first enquiry to final delivery.",

  contact: {
    phone: "[PHONE NUMBER]",
    /** Digits only, with country code, e.g. 919876543210 — used for wa.me links */
    whatsapp: "[WHATSAPP NUMBER]",
    email: "[EMAIL ADDRESS]",
    addressLines: ["[SHOP / OFFICE ADDRESS LINE 1]", "[ADDRESS LINE 2]", "[CITY, STATE — PIN CODE]"],
    hours: "[WORKING HOURS, e.g. Mon–Sat, 10am–7pm]",
    /** Paste the Google Maps embed URL here when available, else leave null. */
    mapEmbedUrl: null as string | null,
    gst: "[GST NUMBER — optional, remove if not applicable]",
  },

  social: {
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
  },

  /**
   * SERVICES — NOT YET CONFIRMED BY THE CLIENT.
   *
   * The real service list has not been supplied, so nothing has been invented.
   * Replace each entry below with an actual Devasriya service.
   * Add or remove entries freely — the Services page and the quote form's
   * service dropdown both read from this array.
   */
  services: [
    {
      slug: "service-1",
      name: "[SERVICE 1 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: [
        "[Point about what is covered]",
        "[Point about materials or sizes offered]",
        "[Point about typical turnaround or minimum quantity]",
      ],
    },
    {
      slug: "service-2",
      name: "[SERVICE 2 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: ["[Point about what is covered]", "[Point about materials or sizes offered]", "[Point about typical turnaround or minimum quantity]"],
    },
    {
      slug: "service-3",
      name: "[SERVICE 3 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: ["[Point about what is covered]", "[Point about materials or sizes offered]", "[Point about typical turnaround or minimum quantity]"],
    },
    {
      slug: "service-4",
      name: "[SERVICE 4 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: ["[Point about what is covered]", "[Point about materials or sizes offered]", "[Point about typical turnaround or minimum quantity]"],
    },
    {
      slug: "service-5",
      name: "[SERVICE 5 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: ["[Point about what is covered]", "[Point about materials or sizes offered]", "[Point about typical turnaround or minimum quantity]"],
    },
    {
      slug: "service-6",
      name: "[SERVICE 6 NAME]",
      summary: "[One line describing this service in plain language.]",
      details: ["[Point about what is covered]", "[Point about materials or sizes offered]", "[Point about typical turnaround or minimum quantity]"],
    },
  ],

  /**
   * PORTFOLIO — replace with real photographs of completed Devasriya work.
   * Drop images into /public/work/ and set `image` to e.g. "/work/job-01.jpg".
   * While `image` is null, a labelled placeholder tile renders instead.
   */
  work: [
    { title: "[PROJECT TITLE]", category: "[SERVICE 1 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 2 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 1 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 3 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 4 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 2 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 5 NAME]", image: null as string | null },
    { title: "[PROJECT TITLE]", category: "[SERVICE 6 NAME]", image: null as string | null },
  ],

  /**
   * ABOUT — to be written with the client. Do not add years in business,
   * customer counts, machinery, awards or certifications until confirmed.
   */
  about: {
    lead: "[Two or three sentences about Devasriya Print in the owner's own words — what the business does and who it serves.]",
    body: [
      "[Paragraph: how Devasriya approaches custom work and why customers come back.]",
      "[Paragraph: anything the client wants customers to know — capabilities, coverage area, the kind of jobs handled.]",
    ],
  },

  /**
   * The six stages of a Devasriya job, shown publicly so customers understand
   * that custom work is welcome. These mirror the internal software's flow.
   */
  process: [
    { step: "01", title: "Enquiry", body: "You tell us what you need — in text, by voice note, or by sending reference files." },
    { step: "02", title: "Estimate", body: "We work out material, size, quantity and finishing, and send you a written quotation." },
    { step: "03", title: "Design", body: "Our designer prepares the artwork from your requirements and references." },
    { step: "04", title: "Your approval", body: "You review the design and either approve it or ask for changes. Every revision is kept on record." },
    { step: "05", title: "Production", body: "Once approved, the job moves to production and is checked before it leaves." },
    { step: "06", title: "Delivery", body: "Finished work is delivered or collected, and billing is settled." },
  ],

  /** Turn on when the customer portal (phase 2) goes live. */
  portalEnabled: false,
  portalUrl: "#",
} as const;

export type Service = (typeof business.services)[number];
export type WorkItem = (typeof business.work)[number];
