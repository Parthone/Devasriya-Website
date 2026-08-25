/**
 * Shape of a website enquiry.
 *
 * These field names are deliberately chosen to line up with the Enquiries
 * module of the internal Devasriya management software, so that forwarding an
 * enquiry later is a straight mapping rather than a translation layer.
 */
export type EnquiryPayload = {
  /** Customer */
  name: string;
  phone: string;
  email?: string;

  /** Requirement */
  service: string;
  quantity?: string;
  dimensions?: string;
  material?: string;
  deadline?: string;
  requirement: string;

  /** Attachments — reference artwork, samples, previous jobs */
  files: File[];
  /** Spoken design requirement, recorded in the browser */
  voiceNote?: Blob | null;

  /** Set by the client, useful for later attribution */
  source: "website";
  submittedAt: string;
};

export type EnquiryResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };
