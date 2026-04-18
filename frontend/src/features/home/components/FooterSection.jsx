import { Link } from "react-router-dom";
import { Globe, Share2, MessageCircle, Rss, BookHeart, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Browse Books", to: "/books" },
  { label: "Categories", to: "/categories" },
  { label: "New Releases", to: "/books?sort=new" },
  { label: "Coming Soon", to: "/coming-soon" },
];

const supportLinks = [
  { label: "FAQ", to: "/faq" },
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Returns", to: "/returns" },
  { label: "Privacy Policy", to: "/privacy" },
];

const socialLinks = [
  { icon: Globe, label: "Visit our website", href: "#" },
  { icon: Share2, label: "Share Bibliophile's Bazar", href: "#" },
  { icon: MessageCircle, label: "Chat with us", href: "#" },
  { icon: Rss, label: "Subscribe to our RSS feed", href: "#" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="library-panel mt-4 px-6 py-10 sm:px-8 lg:px-12"
      aria-label="Site footer"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookHeart size={22} style={{ color: "var(--library-primary)" }} />
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "var(--library-text)" }}
            >
              Bibliophile's Bazar
            </span>
          </div>
          <p className="text-sm leading-6 library-muted max-w-xs">
            A curated sanctuary for book lovers. Discover, collect, and cherish stories that
            matter.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--library-text)" }}
          >
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm library-muted hover:underline transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h3
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--library-text)" }}
          >
            Support
          </h3>
          <ul className="space-y-2">
            {supportLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm library-muted hover:underline transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="space-y-5">
          <div className="space-y-3">
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--library-text)" }}
            >
              Contact
            </h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm library-muted">
                <Mail size={14} />
                hello@bibliophilesbazar.com
              </p>
              <p className="flex items-center gap-2 text-sm library-muted">
                <Phone size={14} />
                +1 (555) 234-5678
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--library-text)" }}
            >
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
                  style={{
                    borderColor: "rgba(215,204,200,0.9)",
                    background: "rgba(255,252,248,0.7)",
                    color: "var(--library-text)",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-10 border-t pt-6 text-center text-xs library-muted"
        style={{ borderColor: "rgba(215,204,200,0.6)" }}
      >
        © {year} Bibliophile&apos;s Bazar. All rights reserved.
      </div>
    </footer>
  );
}
