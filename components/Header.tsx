"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { business } from "@/config/business";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/process", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="wrap header__bar">
        <Link href="/" className="brand" aria-label={`${business.name} — home`}>
          <Logo size={38} />
          <span className="brand__text">
            <span className="brand__name">{business.name}</span>
            <span className="brand__sub">{business.tagline}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          {/* Customer portal — phase 2. Hidden until business.portalEnabled is true. */}
          {business.portalEnabled && (
            <a className="btn btn--ghost header__cta" href={business.portalUrl}>
              Customer Login
            </a>
          )}
          <Link href="/quote" className="btn btn--accent header__cta">
            Get a Quote
          </Link>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="drawer" id="mobile-drawer">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          {business.portalEnabled && <a href={business.portalUrl}>Customer Login</a>}
          <Link href="/quote" className="btn btn--accent btn--block btn--lg">
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
