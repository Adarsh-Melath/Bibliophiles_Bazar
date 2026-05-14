import React, { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

function NewsletterComponent() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      className="py-40 bg-ink relative overflow-hidden font-ui min-h-[80vh] flex items-center"
      ref={containerRef}
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/newsletter_luxury_bg.png" 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          alt="Newsletter Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
      </div>

      {/* Cinematic Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-1" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Column: Editorial Hook */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-10"
          >
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-gold"
            />
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
              The <span className="italic font-heading text-gold block mt-4">Inner Circle</span>
            </h2>
            <p className="font-body text-white/60 text-xl md:text-2xl leading-relaxed max-w-lg">
              Gain exclusive access to our private archives, literary dispatches, and curated collection previews.
            </p>
            <div className="flex items-center gap-6 text-white/20 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Est. 2026</span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Members Only</span>
            </div>
          </motion.div>

          {/* Right Column: Inscription Portal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="editorial-card p-12 md:p-20 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                    <Mail size={200} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-4">
                    Register Your Interest
                    <div className="flex-grow h-[1px] bg-white/10" />
                </h3>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="CONCIERGE@BIBLIOPHILES.COM"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-6 text-white placeholder:text-white/10 focus:outline-none focus:border-gold transition-all duration-700 font-ui text-sm uppercase tracking-[0.4em] font-bold"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] bg-gold w-0 group-focus-within:w-full transition-all duration-1000" />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-6 bg-gold text-ink font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-white hover:text-ink transition-all duration-700 shadow-2xl shadow-gold/20 flex items-center justify-center gap-6 group/btn overflow-hidden relative"
                    >
                        <span className="relative z-10">Inscribe Entry</span>
                        <ArrowRight
                            size={20}
                            className="relative z-10 group-hover/btn:translate-x-4 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                    </button>

                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20 text-center">
                        Secure Transmission & Archival Privacy Guaranteed
                    </p>
                </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export const Newsletter = memo(NewsletterComponent);