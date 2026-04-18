import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, BellRing } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ComingSoonSection({ items }) {
  const [notified, setNotified] = useState(new Set());

  const handleNotify = (id) => {
    setNotified((prev) => new Set(prev).add(id));
  };

  return (
    <motion.section
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      aria-label="Coming Soon"
    >
      <h2 className="library-section-title">Coming Soon</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isNotified = notified.has(item.id);
          return (
            <article
              key={item.id}
              className="library-card flex flex-col gap-4 p-6"
            >
              {/* Badge */}
              <span
                className="library-chip self-start text-xs uppercase tracking-widest"
                style={{ color: "var(--library-primary)" }}
              >
                Coming Soon
              </span>

              <div className="flex-1 space-y-2">
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--library-text)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-6 library-muted">{item.teaser}</p>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--library-primary)", fontFamily: "var(--font-heading)" }}
                >
                  {item.price}
                </span>
                <button
                  type="button"
                  className="library-button-secondary gap-2 text-xs px-4 py-2"
                  onClick={() => handleNotify(item.id)}
                  disabled={isNotified}
                  aria-label={isNotified ? `Already notified for ${item.title}` : `Notify me when ${item.title} is available`}
                >
                  {isNotified ? (
                    <>
                      <BellRing size={14} />
                      Notified ✓
                    </>
                  ) : (
                    <>
                      <Bell size={14} />
                      Notify Me
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
