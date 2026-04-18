import { Star } from "lucide-react";

/**
 * StarRating — renders a row of filled, half-filled, or empty stars.
 * @param {number} rating  0–5 (supports .5 increments)
 * @param {number} max     total stars to render (default 5)
 */
export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating >= i + 0.5;

        return (
          <span key={i} className="relative inline-flex" aria-hidden="true">
            {/* Empty star base */}
            <Star
              size={16}
              className="text-primary"
              style={{ opacity: 0.25 }}
              fill="currentColor"
            />
            {/* Filled overlay — full or half */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star size={16} className="text-primary" fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
