import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FALLBACK_COVER_URL } from "../data/books";

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// Fixed rotation offsets within [-6, +6] range
const bookImages = [
  {
    src: "https://covers.openlibrary.org/b/id/10527843-L.jpg",
    alt: "Project Hail Mary book cover",
    rotate: -4,
    zIndex: 3,
    top: "0px",
    left: "40px",
  },
  {
    src: "https://covers.openlibrary.org/b/id/10909258-L.jpg",
    alt: "The Midnight Library book cover",
    rotate: 3,
    zIndex: 2,
    top: "30px",
    left: "10px",
  },
  {
    src: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    alt: "Atomic Habits book cover",
    rotate: -1,
    zIndex: 1,
    top: "60px",
    left: "70px",
  },
];

export default function HeroSection() {
  return (
    <motion.section
      className="library-panel grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-2 lg:px-12 lg:py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label="Hero"
    >
      {/* Left column */}
      <div className="flex flex-col justify-center gap-6">
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <span className="library-chip">
            <Sparkles size={14} className="icon-bob" />
            Curated for book lovers
          </span>
          <span className="library-chip">Free shipping on orders over $30</span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="library-page-heading max-w-xl">
            Discover Your Next Favorite Book
          </h1>
          <p className="max-w-lg text-base leading-7 library-muted sm:text-lg">
            Explore our hand-picked collection of titles across every genre — from timeless
            classics to the latest releases. Your perfect read is waiting.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <Link to="/books" className="library-button">
            Browse Books
          </Link>
          <Link to="/categories" className="library-button-secondary">
            Explore Categories
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-2">
          {[
            { value: "50,000+", label: "Titles available" },
            { value: "4.9★", label: "Average rating" },
            { value: "Free", label: "Returns & exchanges" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--library-primary)", fontFamily: "var(--font-heading)" }}
              >
                {value}
              </span>
              <span className="text-xs library-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right column — floating stacked books */}
      <motion.div
        variants={itemVariants}
        className="relative flex items-center justify-center"
        style={{ minHeight: "320px" }}
        aria-hidden="true"
      >
        <div className="relative" style={{ width: "260px", height: "300px" }}>
          {bookImages.map((book, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-xl"
              style={{
                transform: `rotate(${book.rotate}deg)`,
                top: book.top,
                left: book.left,
                zIndex: book.zIndex,
                boxShadow: "0 18px 45px rgba(84,140,140,0.18), 0 4px 12px rgba(84,140,140,0.12)",
                width: "140px",
              }}
            >
              <img
                src={book.src}
                alt={book.alt}
                className="w-full object-cover"
                style={{ aspectRatio: "2/3", height: "210px" }}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_COVER_URL;
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
