import Link from "next/link";
import Logo from "./Logo";
import { business } from "@/config/business";
import { Txt } from "./Placeholder";

export default function Footer() {
  const { contact } = business;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <span className="brand">
              <Logo size={36} onDark />
              <span className="brand__text">
                <span className="brand__name">{business.name}</span>
                <span className="brand__sub">{business.tagline}</span>
              </span>
            </span>
            <p className="footer__blurb">{business.promise}</p>
            <div className="regmark" style={{ marginTop: "1.25rem" }} aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>

          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/work">Our Work</Link></li>
              <li><Link href="/process">How It Works</Link></li>
              <li><Link href="/quote">Get a Quote</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><Txt>{contact.phone}</Txt></li>
              <li><Txt>{contact.email}</Txt></li>
              <li>
                {contact.addressLines.map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    <Txt>{line}</Txt>
                  </span>
                ))}
              </li>
              <li><Txt>{contact.hours}</Txt></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </span>
          <span><Txt>{contact.gst}</Txt></span>
        </div>
      </div>
    </footer>
  );
}
