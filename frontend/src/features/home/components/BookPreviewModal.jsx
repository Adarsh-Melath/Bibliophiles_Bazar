import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, BookOpen, ShieldCheck } from 'lucide-react';

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
            className="fixed inset-0 bg-shelf/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper w-full max-w-5xl rounded-sm shadow-shelf overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] border border-shelf/10"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 bg-paper/50 hover:bg-shelf hover:text-paper rounded-full text-shelf transition-all duration-300"
              >
                <X size={18} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-5/12 bg-shelf/5 p-12 flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full max-w-[280px] rounded-sm shadow-shelf hover:rotate-1 transition-transform duration-700"
                    />
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-10 md:p-14 flex flex-col overflow-y-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-burgundy" />
                        <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-burgundy">
                            {book.category}
                        </span>
                    </div>

                    <h2 className="font-heading text-4xl font-bold text-shelf mb-4 tracking-tight leading-tight">
                    {book.title}
                    </h2>

                    <p className="font-body text-xl text-shelf/60 italic mb-6">
                    by {book.author}
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex text-burgundy/40">
                            {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(book.rating) ? 'text-burgundy fill-burgundy' : ''}
                            />
                            ))}
                        </div>
                        <div className="h-4 w-px bg-shelf/10" />
                        <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-shelf/40">
                            {book.rating} / 5.0 Rating
                        </span>
                    </div>
                </div>

                <div className="mb-10 flex-grow">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen size={14} className="text-burgundy" />
                        <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-shelf/30">Synopsis</span>
                    </div>
                    <p className="font-body text-shelf/70 leading-relaxed italic text-lg">
                        "{book.description}"
                    </p>
                </div>

                <div className="mt-auto pt-10 border-t border-shelf/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex flex-col">
                    <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-shelf/30 mb-1">Catalog price</span>
                    <div className="font-heading text-4xl font-bold text-shelf">
                        ${book.price.toFixed(2)}
                    </div>
                  </div>

                  <button className="w-full sm:w-auto bg-burgundy text-white font-ui font-bold uppercase tracking-[0.2em] text-[10px] py-5 px-12 rounded-sm hover:-translate-y-1 hover:bg-shelf transition-all duration-300 flex items-center justify-center gap-3 shadow-shelf group">
                    <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                    Archive to Cart
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2 opacity-20">
                    <ShieldCheck size={12} className="text-shelf" />
                    <span className="font-ui text-[8px] font-bold uppercase tracking-[0.3em] text-shelf">Official Edition • Library Secured</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}