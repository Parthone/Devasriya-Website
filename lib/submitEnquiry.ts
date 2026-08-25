import type { EnquiryPayload, EnquiryResult } from "./enquiry";

/**
 * ============================================================================
 * THE INTEGRATION SEAM
 * ============================================================================
 *
 * Every enquiry submitted anywhere on this website passes through this one
 * function. Nothing else in the site talks to a backend.
 *
 * RIGHT NOW: it posts to /api/enquiry, a local route inside this project that
 * simply logs the enquiry to the server console and returns a reference
 * number. No third-party form service, no email service, no WhatsApp — the
 * data does not leave the app.
 *
 * LATER: when the internal Devasriya management software exposes an endpoint,
 * change app/api/enquiry/route.ts to forward the payload there as a new
 * Enquiry record. This file does not need to change at all.
 * ============================================================================
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  const body = new FormData();

  body.append("name", payload.name);
  body.append("phone", payload.phone);
  body.append("email", payload.email ?? "");
  body.append("service", payload.service);
  body.append("quantity", payload.quantity ?? "");
  body.append("dimensions", payload.dimensions ?? "");
  body.append("material", payload.material ?? "");
  body.append("deadline", payload.deadline ?? "");
  body.append("requirement", payload.requirement);
  body.append("source", payload.source);
  body.append("submittedAt", payload.submittedAt);

  payload.files.forEach((file) => body.append("files", file, file.name));

  if (payload.voiceNote) {
    body.append("voiceNote", payload.voiceNote, "requirement-voice-note.webm");
  }

  try {
    const res = await fetch("/api/enquiry", { method: "POST", body });
    const data = (await res.json()) as EnquiryResult;

    if (!res.ok || !data.ok) {
      return { ok: false, error: "error" in data ? data.error : "Something went wrong." };
    }
    return data;
  } catch {
    return {
      ok: false,
      error: "Could not send your enquiry. Please check your connection and try again.",
    };
  }
}
