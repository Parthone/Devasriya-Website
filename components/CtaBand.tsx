import Link from "next/link";

export default function CtaBand({
  title = "Have a job in mind?",
  body = "Send us the details — size, quantity, material, deadline. Not sure of the specifics? Describe it in your own words or record a voice note and we will work it out with you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta__actions">
            <Link href="/quote" className="btn btn--accent btn--lg">Get a Quote</Link>
            <Link href="/contact" className="btn btn--onink btn--lg">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
