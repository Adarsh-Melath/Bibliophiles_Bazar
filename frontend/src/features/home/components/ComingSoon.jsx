import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bell, Calendar } from 'lucide-react';
import { upcomingBooks } from '../data/books';

export function ComingSoon() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });

  return (
    <section className="py-24 bg-paper" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-shelf/5 pb-10"
        >
          <div>
            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-4 block">Future Archives</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-shelf">
              Upcoming Volumes
            </h2>
          </div>

          <p className="font-body text-shelf/50 max-w-md text-sm leading-relaxed">
            Prepare your shelves for these anticipated arrivals. 
            Secure your place in the registry today to receive immediate notification upon their formal release.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {upcomingBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              className="group perspective-1000 h-[450px]"
            >
              <div className="relative w-full h-full transform-style-3d transition-transform duration-[1.2s] group-hover:rotate-y-180">
                {/* Front Side: Archival Facade */}
                <div className="absolute inset-0 backface-hidden rounded-sm overflow-hidden shadow-shelf border-l-4 border-paper/10">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-shelf/90 via-shelf/20 to-transparent flex flex-col justify-end p-8">
                    <p className="font-ui text-burgundy font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                      {book.category}
                    </p>

                    <h3 className="font-heading text-paper text-2xl font-bold mb-2 tracking-tight group-hover:text-paper/90">
                      {book.title}
                    </h3>

                    <p className="font-body text-paper/60 text-xs font-medium italic mb-6">
                      by {book.author}
                    </p>

                    <div className="flex items-center gap-2.5 text-paper bg-burgundy/80 backdrop-blur-sm py-2 px-4 rounded-sm w-fit border border-white/10 shadow-lg">
                      <Calendar size={14} />
                      <span className="font-ui text-[9px] font-bold uppercase tracking-widest leading-none pt-0.5">
                        {new Date(book.releaseDate).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Side: Editorial Log */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-paper rounded-sm p-10 shadow-shelf border border-shelf/10 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-0.5 bg-burgundy mb-6"></div>
                    <h3 className="font-heading text-shelf text-2xl font-bold mb-4 tracking-tight">
                      {book.title}
                    </h3>

                    <p className="font-body text-shelf/60 text-sm leading-relaxed line-clamp-8 italic">
                      {book.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center pt-6 border-t border-shelf/5">
                      <p className="font-ui text-[9px] text-shelf/30 uppercase font-bold tracking-[0.25em] mb-2">
                        Expected Investment
                      </p>

                      <p className="font-heading text-3xl font-bold text-shelf">
                        ₹{book.price}
                      </p>
                    </div>

                    <button className="library-button w-full bg-shelf text-paper py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-burgundy transition-all duration-300 shadow-shelf group/btn">
                      <Bell size={16} className="group-hover/btn:animate-wiggle" />
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Request Dispatch</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
