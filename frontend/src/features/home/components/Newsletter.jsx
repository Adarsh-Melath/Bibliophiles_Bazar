import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export function Newsletter() {
  const containerRef = useRef(null); // ✅ fixed

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      className="py-32 bg-shelf relative overflow-hidden"
      ref={containerRef}
    >

      {/* Background Decorative Archival Lines */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-paper/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-inner">
                <Mail size={30} className="text-burgundy" />
            </div>

            <h2 className="font-heading text-5xl md:text-6xl font-bold text-paper mb-8 tracking-tight">
              Join the Ledger
            </h2>

            <p className="font-body text-paper/60 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Subscribe to receive curated literary dispatches, 
              archival updates, and exclusive invitations to private collections.
            </p>
          </motion.div>

          {/* Subscription Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="reader@library.com"
                required
                className="flex-grow bg-paper/5 border border-white/10 rounded-sm py-5 px-8 text-paper placeholder:text-white/20 focus:outline-none focus:border-burgundy focus:bg-white/10 transition-all font-body text-lg"
              />

              <button
                type="submit"
                className="bg-burgundy text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs py-5 px-10 rounded-sm hover:bg-white hover:text-shelf transition-all duration-300 shadow-lg group flex items-center justify-center gap-3"
              >
                Inscribe
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <p className="font-ui text-[9px] uppercase tracking-[0.25em] font-bold text-white/20 mt-8">
                Your privacy is held in the strictest professional confidence
            </p>

          </motion.form>

        </div>
      </div>
    </section>
  );
}