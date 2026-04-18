import { motion } from "framer-motion";
import { ShoppingCart, BookOpen } from "lucide-react";
import StarRating from "./StarRating";
import { FALLBACK_COVER_URL } from "../data/books";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BookOfTheMonth({ book }) {
  return (
    <motion.section
      className="library-panel grid gap-8 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_1.2fr] lg:px-12 lg:py-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      aria-label="Book of the Month"
    >
      {/* Left — cover */}
      <div className="flex items-center justify-center">
        <div
          className="overflow-hidden rounded-2xl"
          style={{ boxShadow: "var(--library-shadow)", maxWidth: "260px", width: "100%" }}
        >
          <img
            src={book.coverUrl}
            alt={book.coverAlt}
            className="w-full object-cover"
            style={{ aspectRatio: "2/3", maxHeight: "390px" }}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_COVER_URL;
            }}
          />
        </div>
      </div>

      {/* Right — details */}
      <div className="flex flex-col justify-center gap-5">
        <div className="flex items-center gap-3">
          <span className="library-chip text-xs uppercase tracking-widest">
            📚 Book of the Month
          </span>
          <span className="library-chip">{book.category}</span>
        </div>

        <div className="space-y-2">
          <h2
            className="library-section-title text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {book.title}
          </h2>
          <p className="text-sm library-muted">by {book.author}</p>
        </div>

        <StarRating rating={book.rating} />

        <p className="text-sm leading-7 library-muted max-w-md">{book.description}</p>

        <p
          className="text-2xl font-bold"
          style={{ color: "var(--library-primary)", fontFamily: "var(--font-heading)" }}
        >
          {book.price}
        </p>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="library-button gap-2">
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button type="button" className="library-button-secondary gap-2">
            <BookOpen size={16} />
            Read Preview
          </button>
        </div>
      </div>
    </motion.section>
  );
}
