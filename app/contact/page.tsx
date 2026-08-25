import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { Txt } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "About & Contact",
  description: `Get in touch with ${business.name}.`,
};

export default function ContactPage() {
  const { contact, social } = business;

  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">About &amp; contact</span>
          <h1>{business.name}</h1>
          <p className="lead"><Txt>{business.about.lead}</Txt></p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="prose">
            <h2>About the business</h2>
            <div style={{ marginTop: "1.25rem" }}>
              {business.about.body.map((para, i) => (
                <p key={i} style={{ marginTop: i ? "1.05rem" : 0 }}>
                  <Txt>{para}</Txt>
                </p>
              ))}
            </div>

            <div style={{ marginTop: "2.25rem" }}>
              <Link href="/quote" className="btn btn--accent btn--lg">
                Get a Quote
              </Link>
            </div>
          </div>

          <aside className="aside-box">
            <h3>Get in touch</h3>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd><Txt>{contact.phone}</Txt></dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><Txt>{contact.whatsapp}</Txt></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><Txt>{contact.email}</Txt></dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {contact.addressLines.map((line, i) => (
                    <span key={i} style={{ display: "block" }}>
                      <Txt>{line}</Txt>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd><Txt>{contact.hours}</Txt></dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd>
                  <span style={{ display: "block" }}><Txt>{social.instagram}</Txt></span>
                  <span style={{ display: "block" }}><Txt>{social.facebook}</Txt></span>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Map — renders only once a real embed URL is added to config/business.ts */}
      {contact.mapEmbedUrl && (
        <section className="section section--tight">
          <div className="wrap">
            <iframe
              src={contact.mapEmbedUrl}
              title={`${business.name} location`}
              loading="lazy"
              style={{ width: "100%", height: 380, border: 0, borderRadius: "var(--radius-lg)" }}
            />
          </div>
        </section>
      )}
    </>
  );
}
