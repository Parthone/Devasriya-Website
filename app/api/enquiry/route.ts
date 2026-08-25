import { NextResponse } from "next/server";

/**
 * ============================================================================
 * LOCAL ENQUIRY HANDLER — PLACEHOLDER
 * ============================================================================
 *
 * This route currently does one thing: log the enquiry to the server console
 * and hand back a reference number so the form can show a success state.
 * Nothing is stored, emailed, or sent to any third party.
 *
 * TO CONNECT THE INTERNAL DEVASRIYA SOFTWARE
 * ------------------------------------------
 * Replace the "LOCAL HANDLING" block below with a call to the software's
 * Enquiries endpoint, e.g.
 *
 *   const upstream = await fetch(`${process.env.DEVASRIYA_API_URL}/enquiries`, {
 *     method: "POST",
 *     headers: { Authorization: `Bearer ${process.env.DEVASRIYA_API_KEY}` },
 *     body: form,                       // forward the multipart form as-is
 *   });
 *   const created = await upstream.json();
 *   return NextResponse.json({ ok: true, reference: created.enquiryNumber });
 *
 * Keep the API key in an environment variable. It must never reach the
 * browser — that is precisely why this route exists as a server-side seam
 * rather than the form calling the software directly.
 * ============================================================================
 */
export async function POST(request: Request) {
  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const requirement = String(form.get("requirement") ?? "").trim();

  // Minimum viable validation — mirror the software's required fields here.
  if (!name || !phone || !requirement) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, phone number and requirement." },
      { status: 400 }
    );
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  const voiceNote = form.get("voiceNote");

  /* ------------------------------- LOCAL HANDLING ------------------------ */
  const reference = `WEB-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  console.log("\n──────── NEW WEBSITE ENQUIRY ────────");
  console.log("reference   :", reference);
  console.log("name        :", name);
  console.log("phone       :", phone);
  console.log("email       :", form.get("email") || "—");
  console.log("service     :", form.get("service") || "—");
  console.log("quantity    :", form.get("quantity") || "—");
  console.log("dimensions  :", form.get("dimensions") || "—");
  console.log("material    :", form.get("material") || "—");
  console.log("deadline    :", form.get("deadline") || "—");
  console.log("requirement :", requirement);
  console.log(
    "files       :",
    files.length ? files.map((f) => `${f.name} (${Math.round(f.size / 1024)}kb)`).join(", ") : "—"
  );
  console.log(
    "voice note  :",
    voiceNote instanceof File ? `${Math.round(voiceNote.size / 1024)}kb` : "—"
  );
  console.log("─────────────────────────────────────\n");
  /* ----------------------------------------------------------------------- */

  return NextResponse.json({ ok: true, reference });
}
