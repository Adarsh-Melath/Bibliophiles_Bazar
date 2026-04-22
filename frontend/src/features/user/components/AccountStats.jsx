import React from 'react';
import { motion } from 'framer-motion';
import { Package, BookOpen, Heart, Award } from 'lucide-react';

const stats = [
  {
    label: 'Total Orders',
    value: '24',
    icon: Package,
    color: 'var(--shelf)'
  },
  {
    label: 'Wishlist Items',
    value: '12',
    icon: Heart,
    color: 'var(--burgundy)'
  },
  {
    label: 'Library Points',
    value: '1,250',
    icon: Award,
    color: 'var(--shelf)'
  }
];

export default function AccountStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            className="library-panel p-6 flex flex-col items-center text-center group cursor-default"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-soft"
              style={{ backgroundColor: 'var(--paper)', border: `1px solid rgba(44, 30, 17, 0.1)` }}
            >
              <Icon size={22} style={{ color: stat.color }} />
            </div>
            
            <p className="font-heading font-bold text-3xl text-shelf leading-none mb-1">
              {stat.value}
            </p>
            <p className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-shelf/40">
              {stat.label}
            </p>
            
            {/* Subtle decorative line */}
            <div className="w-8 h-0.5 bg-burgundy/10 mt-4 group-hover:w-12 group-hover:bg-burgundy/30 transition-all duration-300"></div>
          </motion.div>
        );
      })}
    </div>
  );
}
