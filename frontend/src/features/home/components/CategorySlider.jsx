import React, { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Book,
  Globe,
  Microscope,
  Laptop,
  Heart,
  Briefcase,
  User,
  Clock
} from 'lucide-react';

const categories = [
  {
    name: 'Fiction',
    icon: Book,
    count: '12.4k'
  },
  {
    name: 'Non-Fiction',
    icon: Globe,
    count: '8.2k'
  },
  {
    name: 'Science',
    icon: Microscope,
    count: '4.5k'
  },
  {
    name: 'Technology',
    icon: Laptop,
    count: '6.1k'
  },
  {
    name: 'Self Dev',
    icon: Heart,
    count: '9.8k'
  },
  {
    name: 'Business',
    icon: Briefcase,
    count: '5.3k'
  },
  {
    name: 'Biography',
    icon: User,
    count: '3.7k'
  },
  {
    name: 'History',
    icon: Clock,
    count: '7.2k'
  }
];

function CategorySliderComponent() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-50px'
  });

  return (
    <section className="py-32 bg-paper font-ui" ref={containerRef}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 text-center"
        >
          <motion.div className="inline-flex items-center gap-4 px-1 mb-6">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Browse Archives</span>
            <div className="h-[1px] w-8 bg-gold" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-ink tracking-tighter">
            Curated <span className="italic font-heading">Departments</span>
          </h2>
        </motion.div>

        <div
          className="flex gap-12 overflow-x-auto pb-16 cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -10 }}
                className="min-w-[200px] group"
              >
                <div className="bg-white border border-ink/[0.03] rounded-sm p-10 flex flex-col items-center text-center gap-8 shadow-xl shadow-ink/[0.02] group-hover:shadow-2xl group-hover:shadow-ink/5 group-hover:border-gold/30 transition-all duration-700">
                  <div className="w-20 h-20 rounded-full bg-ink/[0.02] border border-ink/[0.05] flex items-center justify-center text-ink/20 group-hover:bg-ink group-hover:text-gold transition-all duration-700 shadow-inner group-hover:shadow-gold/20">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-ink group-hover:text-gold transition-colors duration-500 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-[9px] text-ink/20 font-bold uppercase tracking-[0.2em]">
                      {category.count} <span className="text-[8px] opacity-40">Manuscripts</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const CategorySlider = memo(CategorySliderComponent);