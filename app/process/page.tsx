import type { Metadata } from "next";
import { business } from "@/config/business";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The six stages of a Devasriya Print job — enquiry, estimate, design, your approval, production and delivery.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h1>Six stages, no surprises</h1>
          <p className="lead">
            Custom printing goes wrong when nobody knows what stage the job is
            at. Here is exactly how a job moves through Devasriya — and where
            you have the final say.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="steps">
            {business.process.map((p) => (
              <div className="step" key={p.step}>
                <span className="step__num">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Design approval</span>
              <h2 style={{ marginTop: "1rem" }}>Nothing prints until you say so</h2>
              <div className="prose" style={{ marginTop: "1.25rem" }}>
                <p>
                  Print is unforgiving — once a thousand copies are run, a wrong
                  phone number is a thousand wrong phone numbers. So the design
                  stage is built around your approval, not around our schedule.
                </p>
                <p>
                  You describe what you want in whatever way is easiest: typed
                  out, spoken as a voice note, or by sending a reference file.
                  Our designer works from that and sends the artwork back to you.
                </p>
                <p>
                  You can approve it, ask for changes, or approve it with a
                  comment — &ldquo;<span className="serif-em">go ahead, but make the phone
                  number slightly bigger</span>&rdquo; is a perfectly normal
                  response, and it gets actioned before production.
                </p>
                <p className="muted">
                  Every revision is kept on record, so an earlier version is
                  never lost when a new one is uploaded.
                </p>
              </div>
            </div>

            <aside className="aside-box">
              <h3>Coming soon</h3>
              <p style={{ fontSize: ".95rem" }}>
                A customer login where you can follow your job without picking up
                the phone.
              </p>
              <dl>
                <div>
                  <dt>Quotations</dt>
                  <dd>View and accept estimates online</dd>
                </div>
                <div>
                  <dt>Design review</dt>
                  <dd>Approve, request changes, or leave comments</dd>
                </div>
                <div>
                  <dt>Version history</dt>
                  <dd>Every draft kept, nothing overwritten</dd>
                </div>
                <div>
                  <dt>Job tracking</dt>
                  <dd>See which stage your order is at</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
