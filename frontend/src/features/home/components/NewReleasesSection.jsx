import { motion } from "framer-motion";
import BookCard from "./BookCard";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function NewReleasesSection({ books }) {
  return (
    <motion.section
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      aria-label="New Releases"
    >
      <div className="flex items-center justify-between">
        <h2 className="library-section-title">New Releases</h2>
        <a
          href="/books"
          className="text-sm library-muted hover:underline transition-colors"
          style={{ color: "var(--library-primary)" }}
        >
          View all →
        </a>
      </div>

      {/* Horizontally scrollable row — scrollbar hidden */}
      <div
        className="overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex gap-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
