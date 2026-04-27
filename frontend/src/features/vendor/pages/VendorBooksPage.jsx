import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus, Search, BookOpen, MoreVertical,
  Edit2, Trash2, ChevronLeft, ChevronRight,
  Filter, Download, ArrowUpRight
} from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import { motion, AnimatePresence } from 'framer-motion'

const mockBooks = [
  { id: 1, title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', isbn: '978-0143034902', stock: 12, price: 499, sales: 842 },
  { id: 2, title: 'The Midnight Library', author: 'Matt Haig', isbn: '978-0525559474', stock: 3, price: 399, sales: 756 },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', isbn: '978-0593135204', stock: 45, price: 599, sales: 612 },
  { id: 4, title: 'The Song of Achilles', author: 'Madeline Miller', isbn: '978-0062060624', stock: 18, price: 450, sales: 543 },
  { id: 5, title: 'Circe', author: 'Madeline Miller', isbn: '978-0316556347', stock: 24, price: 450, sales: 432 },
]

export default function VendorBooksPage() {
  const [search, setSearch] = useState('')
  const [deleteModal, setDeleteModal] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-y-auto bg-paper">
      <div className="p-10 space-y-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-shelf/5 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-1 rounded-full bg-burgundy animate-pulse" />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-shelf/40">Inventory Portal</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-shelf tracking-tight">
                Collection
            </h1>
            <p className="font-body text-shelf/40 mt-3 text-base italic max-w-lg leading-relaxed">
              Curate and manage your library of titles.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/vendor/books/new')}
            className="library-button bg-shelf text-paper px-8 py-4 rounded-sm shadow-shelf flex items-center gap-2 group whitespace-nowrap"
          >
            <Plus size={16} className="group-hover:text-burgundy transition-colors" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Register Title</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-sm shadow-soft border border-shelf/5">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-shelf/20" />
            <input
              type="text"
              placeholder="Search by title, author or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-shelf/[0.02] border border-shelf/10 rounded-full py-3 pl-12 pr-6 text-[10px] font-ui uppercase tracking-widest text-shelf placeholder:text-shelf/20 focus:outline-none focus:border-burgundy/20 focus:bg-white transition-all shadow-inner"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-shelf/10 rounded-full font-ui text-[9px] font-bold uppercase tracking-widest text-shelf/40 hover:bg-shelf/5 transition-all">
                <Filter size={14} /> Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-shelf/10 rounded-full font-ui text-[9px] font-bold uppercase tracking-widest text-shelf/40 hover:bg-shelf/5 transition-all">
                <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-sm shadow-shelf border border-shelf/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-shelf/[0.01] border-b border-shelf/10">
                  {['Book Detail', 'Author', 'Price', 'Status', 'Sales', ''].map((h) => (
                    <th key={h} className="px-8 py-5 text-[9px] font-ui font-bold text-shelf/30 uppercase tracking-[0.3em] whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-shelf/5">
                {mockBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-shelf/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-14 bg-shelf/5 rounded-sm overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500 relative flex-shrink-0">
                            <BookOpen className="absolute inset-0 m-auto w-5 h-5 text-burgundy opacity-20" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-heading font-bold text-shelf group-hover:text-burgundy transition-colors truncate">{book.title}</p>
                          <p className="text-[10px] font-ui font-bold text-shelf/30 uppercase tracking-widest mt-1">{book.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-body text-shelf/70 italic">{book.author}</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-ui font-bold text-shelf">₹{book.price}</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[9px] font-ui font-bold uppercase tracking-widest ${
                            book.stock <= 5 ? 'text-red-600' : book.stock <= 20 ? 'text-amber-600' : 'text-emerald-700'
                        }`}>
                            {book.stock <= 5 ? 'Critical Stock' : book.stock <= 20 ? 'Low Stock' : 'In Stock'}
                        </span>
                        <div className="w-24 h-1 bg-shelf/5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${book.stock <= 5 ? 'bg-red-600' : book.stock <= 20 ? 'bg-amber-600' : 'bg-emerald-700'}`}
                                style={{ width: `${Math.min(100, (book.stock / 50) * 100)}%` }}
                            />
                        </div>
                        <span className="text-[8px] font-ui font-bold text-shelf/30 uppercase tracking-widest">{book.stock} Available</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-heading font-bold text-shelf">{book.sales}</span>
                            <ArrowUpRight size={12} className="text-emerald-600" />
                        </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/vendor/books/edit/${book.id}`)}
                          className="p-2.5 rounded-full hover:bg-shelf hover:text-white text-shelf/20 transition-all border border-transparent"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteModal(book)}
                          className="p-2.5 rounded-full hover:bg-burgundy hover:text-white text-shelf/20 transition-all border border-transparent"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-8 py-10 border-t border-shelf/5">
            <button className="p-3 rounded-full border border-shelf/10 text-shelf/40 hover:bg-shelf hover:text-white transition-all disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-shelf">Page 1</span>
                <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-shelf/20">of 12</span>
            </div>
            <button className="p-3 rounded-full border border-shelf/10 text-shelf/40 hover:bg-shelf hover:text-white transition-all">
                <ChevronRight size={16} />
            </button>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModal(null)} className="absolute inset-0 bg-shelf/40 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-sm bg-white rounded-sm shadow-2xl relative z-10 p-10 text-center">
              <div className="w-16 h-16 bg-burgundy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-burgundy">
                <Trash2 size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-shelf mb-4">Unlist Title</h3>
              <p className="font-body text-sm text-shelf/50 mb-8 leading-relaxed italic">
                Are you sure you want to remove <span className="font-bold text-shelf">"{deleteModal.title}"</span> from your catalog?
              </p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteModal(null)} className="flex-1 py-4 border border-shelf/10 font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-shelf/5 transition-all text-shelf/40">Retain</button>
                <button className="flex-1 py-4 bg-burgundy text-white font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-shelf transition-all shadow-lg active:scale-95">Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
