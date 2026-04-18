import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <motion.section
      className="flex justify-center px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      aria-label="Newsletter"
    >
      <div
        className="library-panel w-full max-w-2xl px-8 py-10 text-center space-y-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(84,140,140,0.08) 0%, rgba(156,175,136,0.10) 100%), rgba(255,252,248,0.94)",
        }}
      >
        <div className="space-y-2">
          <h2 className="library-section-title text-2xl">Stay in the Loop</h2>
          <p className="text-sm leading-7 library-muted max-w-md mx-auto">
            Get weekly picks, new arrivals, and exclusive deals delivered straight to your inbox.
            No spam — just great books.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <CheckCircle size={40} style={{ color: "var(--library-primary)" }} />
            <p
              className="text-base font-semibold"
              style={{ color: "var(--library-text)" }}
            >
              You're subscribed! Welcome to the community.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-center">
              <div className="flex flex-col gap-1 w-full sm:max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 library-muted pointer-events-none"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    className="library-input pl-9"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    aria-invalid={!!error}
                  />
                </div>
              </div>
              <button type="submit" className="library-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
            {error && (
              <p
                id="newsletter-error"
                className="text-xs text-center"
                style={{ color: "#c0392b" }}
                role="alert"
              >
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </motion.section>
  );
}
