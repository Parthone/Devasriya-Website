import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { business } from "@/config/business";
import { Txt } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us about your printing or advertising job and we will send you an estimate.",
};

export default function QuotePage() {
  const { contact } = business;

  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">Get a quote</span>
          <h1>Tell us about the job</h1>
          <p className="lead">
            Only your name, phone number and a description are required. Fill in
            whatever else you know — we will work out the rest with you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <QuoteForm />
          </div>

          <aside className="aside-box">
            <h3>What happens next</h3>
            <dl>
              <div>
                <dt>Step 1</dt>
                <dd>We read through your requirement and check the details.</dd>
              </div>
              <div>
                <dt>Step 2</dt>
                <dd>You receive a written estimate — material, size, quantity, price.</dd>
              </div>
              <div>
                <dt>Step 3</dt>
                <dd>Once you accept, our designer starts on the artwork.</dd>
              </div>
              <div>
                <dt>Step 4</dt>
                <dd>Nothing goes to print until you have approved the design.</dd>
              </div>
            </dl>

            <hr className="rule" />

            <div>
              <p className="minilabel">Prefer to call?</p>
              <p className="aside-strong"><Txt>{contact.phone}</Txt></p>
              <p className="muted" style={{ fontSize: ".9rem" }}><Txt>{contact.hours}</Txt></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
