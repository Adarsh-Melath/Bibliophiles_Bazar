import { AlertTriangle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const lowStockBooks = [
  { title: 'The Midnight Library', stock: 2 },
  { title: 'Sapiens: A Brief History', stock: 4 },
  { title: 'Dune', stock: 5 },
]

export default function AlertsSection() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-red-50/30 border border-red-100 rounded-2xl shadow-soft p-8 relative overflow-hidden"
    >
      {/* Decorative bg */}
      <div className="absolute -right-8 -top-8 text-red-500/5">
        <AlertTriangle className="w-40 h-40" />
      </div>

      <div className="flex items-start relative z-10">
        <div className="flex-shrink-0 mt-1">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="ml-6 flex-1">
          <h3 className="text-xl font-heading font-bold text-shelf">Stock Alert</h3>
          <p className="text-sm font-body text-shelf/70 mt-1.5 mb-5 leading-relaxed">
            <span className="font-bold text-red-600 underline decoration-red-200 decoration-2 underline-offset-4">{lowStockBooks.length} items</span> are running low and need replenishment.
          </p>

          <ul className="space-y-3 mb-6">
            {lowStockBooks.map((book) => (
              <li
                key={book.title}
                className="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-red-100/50 backdrop-blur-sm shadow-sm"
              >
                <span className="text-sm font-heading font-bold text-shelf">{book.title}</span>
                <span className="text-red-700 font-ui font-bold text-[9px] uppercase tracking-widest bg-red-100 px-2.5 py-1 rounded">
                  {book.stock} low
                </span>
              </li>
            ))}
          </ul>

          {/* <button
            onClick={() => navigate('/vendor/books')}
            className="text-[10px] font-ui font-bold uppercase tracking-widest text-red-600 hover:text-shelf transition-all flex items-center gap-2 group"
          >
            Manage items
            <div className="w-6 h-6 rounded-full border border-red-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                <ArrowRight className="w-3 h-3 translate-x-px" />
            </div>
          </button> */}
        </div>
      </div>
    </motion.div>
  )
}
