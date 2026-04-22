import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function BookCard({
  title,
  author,
  category,
  price,
  rating,
  imageUrl
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col group cursor-pointer h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-5 shadow-soft group-hover:shadow-shelf transition-all duration-500 bg-shelf/5 border border-shelf/5">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // e.target.src = '/covers/default-book.jpg';
          }}
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-shelf/0 group-hover:bg-shelf/5 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <span className="font-ui text-[10px] uppercase tracking-[0.2em] font-bold text-burgundy mb-2 block">
          {category}
        </span>
        <h3 className="font-heading font-bold text-shelf text-lg leading-tight mb-1 line-clamp-2 group-hover:text-burgundy transition-colors">
          {title}
        </h3>
        <p className="font-body text-xs text-shelf/60 mb-4 line-clamp-1 italic italic-font">
          by {author}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-shelf/5">
          <div className="flex items-center gap-1.5 text-shelf">
            <Star size={12} fill="currentColor" className="text-burgundy" />
            <span className="font-ui text-[11px] font-bold tracking-tighter">
              {rating}
            </span>
          </div>
          <span className="font-heading font-bold text-shelf text-lg">
             {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
