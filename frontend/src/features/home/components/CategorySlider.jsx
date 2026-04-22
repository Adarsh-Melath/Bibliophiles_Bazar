import React, { useRef } from 'react';
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

export function CategorySlider() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-50px'
  });

  return (
    <section className="py-24 bg-paper" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8 }}
          className="mb-12 border-l-4 border-burgundy pl-6"
        >
          <h2 className="font-heading text-4xl font-bold text-shelf mb-3 tracking-tight">
            Curated Archives
          </h2>
          <p className="font-body text-shelf/50 uppercase text-[10px] font-bold tracking-[0.2em]">
            Browse our hand-picked literary categories
          </p>
        </motion.div>

        <div
          className="flex gap-8 overflow-x-auto pb-12 cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="min-w-[180px] group"
              >
                <div className="bg-white border border-shelf/5 rounded-sm p-8 flex flex-col items-center text-center gap-6 shadow-soft group-hover:shadow-shelf group-hover:border-burgundy/20 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full bg-shelf/5 flex items-center justify-center text-shelf group-hover:bg-shelf group-hover:text-paper transition-all duration-500 shadow-inner">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="font-ui font-bold text-xs uppercase tracking-[0.2em] text-shelf mb-2 lg:group-hover:text-burgundy">
                      {category.name}
                    </h3>
                    <p className="font-body text-[10px] text-shelf/40 font-bold uppercase tracking-widest">
                      {category.count} <span className="opacity-50">vols</span>
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