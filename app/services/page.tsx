import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { Txt } from "@/components/Placeholder";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description: `Printing and advertising services offered by ${business.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>What we print</h1>
          <p className="lead">
            Most jobs are custom. Sizes, materials, quantities and finishing are
            worked out per job, so treat the list below as a starting point —
            if what you need is not here, ask us anyway.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--2">
            {business.services.map((s, i) => (
              <article className="card" key={s.slug}>
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3><Txt>{s.name}</Txt></h3>
                <p><Txt>{s.summary}</Txt></p>
                <ul>
                  {s.details.map((d, j) => (
                    <li key={j}><Txt>{d}</Txt></li>
                  ))}
                </ul>
                <div className="card__foot">
                  <Link href="/quote" className="textlink">
                    Get a quote <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        body="Describe the job in plain language and we will tell you what it takes — material, size, quantity and a realistic timeline."
      />
    </>
  );
}
