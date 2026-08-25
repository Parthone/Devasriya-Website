import Link from "next/link";
import { business } from "@/config/business";
import { Txt } from "@/components/Placeholder";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  const featured = business.services.slice(0, 6);
  const workPreview = business.work.slice(0, 4);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">{business.tagline}</span>
            <h1>
              Printing that starts with <em>your</em> requirement — not a fixed
              product list.
            </h1>
            <p className="lead">{business.promise}</p>

            <div className="hero__actions">
              <Link href="/quote" className="btn btn--accent btn--lg">
                Get a Quote
              </Link>
              <Link href="/work" className="btn btn--ghost btn--lg">
                See Our Work
              </Link>
            </div>

            <p className="hero__note">
              <span className="regmark" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
              Send us a photo, a rough sketch, or just describe it in a voice note.
            </p>
          </div>

          <aside className="flowcard" aria-label="How a job runs">
            <p className="flowcard__title">How a job runs</p>
            <ol>
              {business.process.map((p) => (
                <li key={p.step}>
                  <span>{p.step}</span>
                  <span>{p.title}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------------------ SERVICES */}
      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Custom printing and advertising work</h2>
            <p className="lead">
              Every job is quoted on its own terms — size, material, quantity,
              finishing and deadline. Tell us what you need and we will work out
              the rest with you.
            </p>
          </div>

          <div className="grid grid--3">
            {featured.map((s) => (
              <article className="card" key={s.slug}>
                <h3><Txt>{s.name}</Txt></h3>
                <p><Txt>{s.summary}</Txt></p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Link href="/services" className="textlink">
              All services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- WORK */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our work</span>
            <h2>Jobs we have delivered</h2>
          </div>

          <div className="work-grid">
            {workPreview.map((w, i) => (
              <article className="work-tile" key={i}>
                <div className="work-tile__img">
                  {w.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.image} alt={w.title} />
                  ) : (
                    <span>Photo of<br />completed work</span>
                  )}
                </div>
                <div className="work-tile__meta">
                  <h4><Txt>{w.title}</Txt></h4>
                  <span><Txt>{w.category}</Txt></span>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Link href="/work" className="textlink">
              View the full portfolio <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- PROCESS */}
      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From enquiry to delivery, one clear line</h2>
            <p className="lead">
              You always know which stage your job is at — and nothing goes to
              print until you have approved the design.
            </p>
          </div>

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

          <div style={{ marginTop: "2rem" }}>
            <Link href="/process" className="textlink">
              More about the process <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
