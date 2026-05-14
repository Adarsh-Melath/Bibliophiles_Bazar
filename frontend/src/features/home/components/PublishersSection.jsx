import React, { useEffect, memo } from 'react';
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

function PublishersSectionComponent() {
  return (
    <section className="py-32 bg-paper border-y border-ink/5 overflow-hidden relative font-ui selection:bg-gold/20">
      
      {/* Subtle fine-line texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="section-container mb-20 text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-6 px-1 mb-8"
        >
            <div className="h-[1px] w-8 bg-gold" />
            <p className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.5em]">
              The Directory
            </p>
            <div className="h-[1px] w-8 bg-gold" />
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-bold text-ink tracking-tight">
            Partnered <span className="italic text-gold font-heading">Institutions</span>
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group py-10">
        
        {/* Editorial Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-48 md:w-80 bg-gradient-to-r from-paper via-paper/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 md:w-80 bg-gradient-to-l from-paper via-paper/80 to-transparent z-10 pointer-events-none" />

        <div className="library-marquee gap-32 lg:gap-48 py-12 group/marquee">
          {[...publishers, ...publishers].map((publisher, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
              }}
              className="flex-shrink-0 flex items-center gap-24 cursor-default transition-all duration-700
                         group-hover/marquee:opacity-20 hover:!opacity-100"
            >
              <span className="text-4xl md:text-7xl font-bold uppercase tracking-tighter 
                               transition-all duration-700
                               text-ink/10 group-hover/marquee:text-ink/5 hover:!text-gold">
                {publisher}
              </span>
              <div className="w-3 h-3 rounded-full bg-gold/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const PublishersSection = memo(PublishersSectionComponent);