import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookCard } from '../../../components/common/BookCard';

const mockWishlistBooks = [
  {
    id: 101,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Philosophy',
    price: 499,
    rating: 4.8,
    imageUrl: "/covers/default-book.jpg"
  },
  {
    id: 102,
    title: '1984 (Hardcover Edition)',
    author: 'George Orwell',
    category: 'Classic',
    price: 750,
    rating: 4.9,
    imageUrl: "/covers/default-book.jpg"
  },
  {
    id: 103,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    price: 999,
    rating: 4.7,
    imageUrl: "/covers/default-book.jpg"
  },
  {
    id: 104,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    price: 1250,
    rating: 4.9,
    imageUrl: "/covers/default-book.jpg"
  }
];

export default function WishlistPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="library-panel p-8 mb-10"
    >
      <div className="flex items-center justify-between mb-8 border-b border-shelf/5 pb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-shelf">
            Saved Collections
          </h2>
          <p className="font-body text-xs text-shelf/40 mt-1 uppercase tracking-widest font-bold">
            Books marked for future reading
          </p>
        </div>
        <Link 
          to="/wishlist" 
          className="text-burgundy hover:text-shelf font-ui text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 group p-2 border border-transparent hover:border-shelf/10 rounded"
        >
          Manage All{' '}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockWishlistBooks.map((book) => (
          <div key={book.id} className="flex flex-col h-full group">
            <BookCard {...book} />

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button className="flex-grow library-button text-[10px] py-3 rounded">
                <ShoppingCart size={14} className="mr-1" /> Add
              </button>
              <button className="p-3 border border-shelf/10 text-shelf/40 hover:text-burgundy hover:border-burgundy/20 rounded transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}