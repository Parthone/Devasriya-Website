"use client";

import { useMemo, useState } from "react";
import { business } from "@/config/business";
import { Txt } from "./Placeholder";

export default function WorkGrid() {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(business.work.map((w) => w.category));
    return ["All", ...Array.from(set)];
  }, []);

  const items = useMemo(
    () => (active === "All" ? business.work : business.work.filter((w) => w.category === active)),
    [active]
  );

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter work by service">
        {categories.map((c) => (
          <button
            key={c}
            className="chip"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c === "All" ? "All work" : <Txt>{c}</Txt>}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {items.map((w, i) => (
          <article className="work-tile" key={`${w.title}-${i}`}>
            <div className="work-tile__img">
              {w.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.image} alt={w.title} />
              ) : (
                <span>
                  Photo of
                  <br />
                  completed work
                </span>
              )}
            </div>
            <div className="work-tile__meta">
              <h4>
                <Txt>{w.title}</Txt>
              </h4>
              <span>
                <Txt>{w.category}</Txt>
              </span>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <p className="muted" style={{ marginTop: "1.5rem" }}>
          Nothing here yet.
        </p>
      )}
    </>
  );
}
