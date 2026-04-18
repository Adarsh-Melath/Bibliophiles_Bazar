import { motion } from "framer-motion";
import BookCard from "./BookCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function RecommendedSection({ books }) {
  return (
    <section className="space-y-6" aria-label="Recommended For You">
      <div className="flex items-center justify-between">
        <h2 className="library-section-title">Recommended For You</h2>
        <a
          href="/books"
          className="text-sm transition-colors"
          style={{ color: "var(--library-primary)" }}
        >
          See more →
        </a>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {books.map((book) => (
          <motion.div key={book.id} variants={cardVariants} className="flex justify-center">
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
