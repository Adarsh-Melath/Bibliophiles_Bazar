import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const publishers = [
  'Penguin Random House',
  'HarperCollins',
  'Simon & Schuster',
  'Macmillan',
  'Hachette Book Group',
  'Oxford University Press',
  'Cambridge University Press',
  'Scholastic',
];

export function PublishersSection() {
  useEffect(() => {
    console.log("📜 Publishers Registry component mounted at:", new Date().toLocaleTimeString());
  }, []);

  return (
    <section className="py-24 bg-paper border-y border-shelf/5 overflow-hidden relative selection:bg-burgundy/10">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 px-4 py-1.5 bg-shelf/5 rounded-full mb-6"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
            <p className="font-ui text-[10px] font-bold text-shelf/60 uppercase tracking-[0.4em]">
              Publishers List
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
        </motion.div>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-shelf tracking-tight">
            Our <span className="italic text-burgundy">Publishers</span>
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group py-4">
        
        {/* Archival Vignette Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-paper via-paper/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-paper via-paper/90 to-transparent z-10 pointer-events-none" />

        {/* CSS-Driven Infinite Marquee with Focal Highlight logic */}
        <div className="library-marquee gap-24 lg:gap-32 py-10 group/marquee">
          {/* Two copies of the list is the gold standard for infinite marquee at 0 -> -50% */}
          {[...publishers, ...publishers].map((publisher, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.1, 
                rotate: -1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="flex-shrink-0 flex items-center gap-16 cursor-default transition-opacity duration-500
                         group-hover/marquee:opacity-30 hover:!opacity-100"
            >
              <span className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight 
                               transition-colors duration-500
                               text-shelf/15 group-hover/marquee:text-shelf/10 hover:!text-burgundy">
                {publisher}
              </span>
              <span className="text-shelf/5 font-serif lowercase italic text-xl opacity-40">and</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}