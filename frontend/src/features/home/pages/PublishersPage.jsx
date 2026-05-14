import React from 'react';
import { motion } from 'framer-motion';
import { PublishersSection } from '../components/PublishersSection';
import { BookOpen, Award, Globe, Shield } from 'lucide-react';

export default function PublishersPage() {
  return (
    <div className="pt-40 bg-paper min-h-screen">
      {/* Editorial Header */}
      <section className="section-container mb-32">
        <div className="max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-6 mb-10"
            >
                <div className="h-[1px] w-12 bg-gold" />
                <span className="text-[11px] uppercase font-bold tracking-[0.6em] text-gold">The Institutions</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-7xl md:text-9xl font-bold text-ink tracking-tighter leading-[0.8] mb-16"
            >
                Curated <br />
                <span className="italic font-heading text-gold">Collaborations</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-2xl text-ink/60 leading-relaxed max-w-2xl font-body"
            >
                We partner with the world's most prestigious publishing houses and independent estates 
                to bring you an unparalleled collection of literary excellence.
            </motion.p>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="bg-ink py-32 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
          </div>

          <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 relative z-10">
              {[
                  { icon: BookOpen, title: '50k+', desc: 'Curated Titles' },
                  { icon: Award, title: '120', desc: 'Partner Houses' },
                  { icon: Globe, title: '24', desc: 'Global Archives' },
                  { icon: Shield, title: '100%', desc: 'Authenticity' }
              ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-4"
                  >
                      <stat.icon size={32} className="text-gold mb-6" />
                      <h3 className="text-5xl font-bold tracking-tighter">{stat.title}</h3>
                      <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">{stat.desc}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      <PublishersSection />

      {/* Editorial Content */}
      <section className="py-40 bg-paper">
          <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  <div className="space-y-12">
                      <h2 className="text-5xl font-bold text-ink tracking-tight leading-tight">
                          A commitment to <br />
                          <span className="italic font-heading">Timeless Preservation</span>
                      </h2>
                      <p className="text-xl text-ink/60 leading-relaxed font-body">
                          Our vetting process for partner institutions is rigorous. We ensure that every 
                          publisher we represent shares our dedication to the art of the book, 
                          from the quality of the paper to the integrity of the translation.
                      </p>
                      <button className="px-10 py-5 bg-ink text-white font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-gold transition-all duration-700">
                          Learn Our Standards
                      </button>
                  </div>
                  <div className="relative group">
                      <div className="aspect-[4/5] bg-ink/5 overflow-hidden rounded-sm">
                          <img 
                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000" 
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                            alt="Library Archive" 
                          />
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 border-8 border-paper bg-gold p-10 hidden md:flex items-center justify-center text-center">
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
                              Certified Archival Excellence
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
