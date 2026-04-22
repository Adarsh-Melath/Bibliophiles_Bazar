import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart } from 'lucide-react';

export function BookPreviewModal({ book, isOpen, onClose }) {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-teal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-teal transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-2/5 bg-tan/20 p-8 flex items-center justify-center shrink-0">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full max-w-[240px] rounded-lg shadow-xl"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10 flex flex-col overflow-y-auto">
                <p className="font-ui text-sage font-semibold uppercase tracking-wider text-sm mb-2">
                  {book.category}
                </p>

                <h2 className="font-heading text-3xl font-bold text-teal mb-2">
                  {book.title}
                </h2>

                <p className="font-body text-lg text-teal/70 italic mb-4">
                  by {book.author}
                </p>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={
                          i < Math.floor(book.rating)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    ))}
                  </div>

                  <span className="font-ui text-sm font-medium text-teal/80">
                    {book.rating} / 5.0
                  </span>
                </div>

                <div className="prose prose-teal mb-8 flex-grow">
                  <p className="font-body text-teal/80 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-tan/30 flex items-center justify-between">
                  <div className="font-heading text-3xl font-bold text-teal">
                    ${book.price.toFixed(2)}
                  </div>

                  <button className="bg-sage text-white font-ui font-semibold py-3 px-8 rounded-full hover:bg-sage/90 transition-colors flex items-center gap-2 shadow-lg shadow-sage/20">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}