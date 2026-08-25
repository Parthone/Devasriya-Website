"use client";

import { useRef, useState } from "react";
import { business } from "@/config/business";
import { submitEnquiry } from "@/lib/submitEnquiry";
import VoiceRecorder from "./VoiceRecorder";

const MAX_FILE_MB = 25;

export default function QuoteForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [voiceNote, setVoiceNote] = useState<Blob | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const accepted: File[] = [];
    for (const f of Array.from(incoming)) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`"${f.name}" is larger than ${MAX_FILE_MB}MB and was not attached.`);
        continue;
      }
      accepted.push(f);
    }
    setFiles((prev) => [...prev, ...accepted]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const fd = new FormData(e.currentTarget);
    const result = await submitEnquiry({
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service: String(fd.get("service") ?? ""),
      quantity: String(fd.get("quantity") ?? ""),
      dimensions: String(fd.get("dimensions") ?? ""),
      material: String(fd.get("material") ?? ""),
      deadline: String(fd.get("deadline") ?? ""),
      requirement: String(fd.get("requirement") ?? ""),
      files,
      voiceNote,
      source: "website",
      submittedAt: new Date().toISOString(),
    });

    setSending(false);

    if (result.ok) {
      setReference(result.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError(result.error);
    }
  }

  /* ------------------------------------------------------- success state */
  if (reference) {
    return (
      <div className="alert alert--ok">
        <h3>Enquiry received</h3>
        <p>
          Thank you — your enquiry reference is <strong>{reference}</strong>. We
          will review the details and get back to you with an estimate.
        </p>
        <p className="muted" style={{ marginTop: ".75rem", fontSize: ".85rem" }}>
          Developer note: this enquiry was logged locally by the site. Once the
          Devasriya management software is connected, it will be created there
          as a new Enquiry automatically.
        </p>
      </div>
    );
  }

  /* ---------------------------------------------------------------- form */
  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name <span className="req">*</span></label>
          <input className="input" id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number <span className="req">*</span></label>
          <input className="input" id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Email <span className="hint">(optional)</span></label>
          <input className="input" id="email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="service">What kind of work?</label>
          <select className="select" id="service" name="service" defaultValue="">
            <option value="">Select or leave blank</option>
            {business.services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="quantity">Quantity</label>
          <input className="input" id="quantity" name="quantity" placeholder="e.g. 500 pieces" />
        </div>
        <div className="field">
          <label htmlFor="dimensions">Size / dimensions</label>
          <input className="input" id="dimensions" name="dimensions" placeholder="e.g. 6ft x 3ft" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="material">Material <span className="hint">(if you know)</span></label>
          <input className="input" id="material" name="material" placeholder="Not sure is fine" />
        </div>
        <div className="field">
          <label htmlFor="deadline">Needed by</label>
          <input className="input" id="deadline" name="deadline" type="date" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="requirement">
          Describe what you need <span className="req">*</span>
        </label>
        <textarea
          className="textarea"
          id="requirement"
          name="requirement"
          required
          placeholder="Wording, colours, where it will be used, anything you already have in mind. Rough notes are fine."
        />
      </div>

      {/* --------------------------------------------------- attachments */}
      <div className="field">
        <label htmlFor="files">Reference files <span className="hint">(optional)</span></label>
        <p className="hint">
          Logos, old samples, photos, a rough sketch — anything that helps.
          Up to {MAX_FILE_MB}MB per file.
        </p>
        <div
          className={`dropzone${dragOver ? " dropzone--over" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <strong>Tap to attach files</strong>
          <span>or drag them here</span>
        </div>
        <input
          ref={inputRef}
          id="files"
          type="file"
          multiple
          hidden
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />

        {files.length > 0 && (
          <ul className="filelist">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`}>
                <span>{f.name} · {Math.max(1, Math.round(f.size / 1024))}kb</span>
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => removeFile(i)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --------------------------------------------------- voice note */}
      <div className="field">
        <label>Easier to explain out loud? <span className="hint">(optional)</span></label>
        <p className="hint">
          Record a voice note describing the design. Our designer will listen to
          it while preparing your artwork.
        </p>
        <VoiceRecorder onChange={setVoiceNote} />
      </div>

      {error && <p className="rec__err" role="alert">{error}</p>}

      <button type="submit" className="btn btn--accent btn--lg btn--block" disabled={sending}>
        {sending ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="form-note">
        We use your details only to prepare your estimate and get back to you.
      </p>
    </form>
  );
}
