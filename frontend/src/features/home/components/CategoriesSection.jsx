import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CategoriesSection({ categories }) {
  return (
    <section className="space-y-6" aria-label="Explore Categories">
      <h2 className="library-section-title">Explore Categories</h2>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {categories.map(({ id, label, slug, icon: Icon }) => (
          <motion.div key={id} variants={cardVariants}>
            <Link
              to={`/categories/${slug}`}
              className="library-card library-hover-card flex flex-col items-center justify-center gap-3 p-4 text-center no-underline"
              style={{ minHeight: "100px" }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: "rgba(215,204,200,0.9)",
                  background: "rgba(255,252,248,0.7)",
                }}
              >
                <Icon size={20} style={{ color: "var(--library-primary)" }} />
              </motion.div>
              <span
                className="text-xs font-medium leading-tight"
                style={{ color: "var(--library-text)" }}
              >
                {label}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
