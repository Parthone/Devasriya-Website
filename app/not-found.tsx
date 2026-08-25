import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center", paddingBlock: "3rem" }}>
        <span className="eyebrow">404</span>
        <h1 style={{ marginTop: "1rem" }}>Page not found</h1>
        <p className="lead" style={{ marginTop: "1rem" }}>
          That page does not exist. Let us get you back on track.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--accent btn--lg">Back to home</Link>
          <Link href="/quote" className="btn btn--ghost btn--lg">Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}
