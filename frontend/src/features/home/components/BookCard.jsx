import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import StarRating from "./StarRating";
import { FALLBACK_COVER_URL } from "../data/books";

/**
 * BookCard — reusable card for displaying a book in grids and scroll rows.
 */
export default function BookCard({ book }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="library-card library-hover-card group flex flex-col gap-3 p-4 cursor-pointer"
      style={{ minWidth: "180px", maxWidth: "220px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image with hover cart overlay */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={book.coverUrl}
          alt={book.coverAlt}
          className="w-full object-cover rounded-xl"
          style={{ aspectRatio: "2/3", height: "200px" }}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_COVER_URL;
          }}
        />
        {/* Floating cart icon on hover */}
        {hovered && (
          <button
            type="button"
            aria-label={`Add ${book.title} to cart`}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border shadow-md transition-all duration-200"
            style={{
              background: "rgba(255,252,248,0.95)",
              borderColor: "rgba(156,175,136,0.8)",
              color: "var(--library-primary)",
            }}
          >
            <ShoppingCart size={16} />
          </button>
        )}
      </div>

      {/* Book info */}
      <div className="flex flex-col gap-1 flex-1">
        <h3
          className="text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--library-text)", fontFamily: "var(--font-heading)" }}
        >
          {book.title}
        </h3>
        <p className="text-xs library-muted line-clamp-1">{book.author}</p>
        <div className="mt-1">
          <StarRating rating={book.rating} />
        </div>
        <p
          className="mt-auto text-sm font-semibold"
          style={{ color: "var(--library-primary)" }}
        >
          {book.price}
        </p>
      </div>
    </article>
  );
}
