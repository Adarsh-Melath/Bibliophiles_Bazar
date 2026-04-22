import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { books } from '../data/books';

export function HeroSection() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const featuredBook = books[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper pt-24 pb-12">

      {/* Background Decorative Blobs */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-24 left-[10%] w-[30rem] h-[30rem] bg-shelf/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-24 right-[5%] w-[40rem] h-[40rem] bg-burgundy/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--shelf) 1px, transparent 1px), linear-gradient(90deg, var(--shelf) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        {/* TEXT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-shelf/5 rounded-sm mb-8">
            <span className="w-1 h-1 rounded-full bg-burgundy animate-pulse"></span>
            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.3em] text-shelf/60">Established 2024 • Handpicked Collection</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-6xl md:text-8xl font-bold text-shelf leading-[0.9] mb-8 tracking-tighter"
          >
            Read Classics. <br />
            <span className="text-burgundy italic">New Stories.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-lg md:text-xl text-shelf/60 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Welcome to our library. Explore our collection of 
            old classics and the best new books.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <motion.button
              whileHover={{ y: -4, shadow: '0 10px 30px rgba(44, 30, 17, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs py-5 px-10 rounded-sm hover:bg-burgundy transition-all duration-300 shadow-shelf"
            >
              See Books
            </motion.button>

            <motion.button
              whileHover={{ y: -4, backgroundColor: 'rgba(44, 30, 17, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="border border-shelf/20 text-shelf font-ui font-bold uppercase tracking-[0.2em] text-[10px] py-5 px-10 rounded-sm transition-all duration-300"
            >
              Browse Books
            </motion.button>
          </motion.div>
        </motion.div>

        {/* VISUAL COMPONENT */}
        <motion.div style={{ y: y2 }} className="relative h-[650px] hidden lg:block">

          {/* Focal Point Book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -45, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0, x: "-50%", y: "-50%" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 z-20"
          >
            <div className="relative group perspective-1000 preserve-3d">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [0, 5, 0],
                  rotateZ: [0, -1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-72 h-[450px] rounded-r-lg rounded-l-sm shadow-[25px_25px_50px_rgba(44,30,17,0.3)] overflow-hidden border-l-[6px] border-paper/20 hover:rotate-y-12 transition-transform duration-700 relative preserve-3d"
              >
                <img
                  src={featuredBook.coverUrl}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover grayscale-[0.1] transition-all duration-700 group-hover:grayscale-0"
                />
                
                {/* Book Spine Detail */}
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
              </motion.div>
            </div>
          </motion.div>

          {/* Peripheral Books */}
          {[books[1], books[2], books[3]].map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 100, rotate: i * 10 - 20 }}
              whileInView={{
                opacity: 0.7,
                y: [0, i % 2 === 0 ? -25 : 25, 0],
                rotate: [i * 8 - 15, i * 8 - 5, i * 8 - 15],
              }}
              viewport={{ once: false }}
              transition={{
                opacity: { duration: 1.2, delay: i * 0.2 },
                y: { duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className={`absolute w-44 h-64 rounded-r-md rounded-l-sm shadow-shelf overflow-hidden border-l-4 border-paper/10 blur-[0.4px] hover:blur-none hover:opacity-100 transition-all duration-500 z-10
                ${i === 0
                  ? 'top-10 left-5'
                  : i === 1
                    ? 'bottom-10 right-10'
                    : 'top-32 right-0'
                }`}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover brightness-[0.85] hover:brightness-100 transition-all duration-500"
              />
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}