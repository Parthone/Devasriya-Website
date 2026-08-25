import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import CtaBand from "@/components/CtaBand";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Our Work",
  description: `A selection of printing and advertising jobs completed by ${business.name}.`,
};

export default function WorkPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">Our work</span>
          <h1>Recent jobs</h1>
          <p className="lead">
            A selection of work delivered for our customers. Filter by the kind
            of job you are looking for.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <WorkGrid />
        </div>
      </section>

      <CtaBand
        title="Want something like this?"
        body="Send us a reference — a photo, a link, or an old sample — and we will quote you for it."
      />
    </>
  );
}
