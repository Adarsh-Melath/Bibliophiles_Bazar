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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-[#FDF8F5] border border-[#E8D5C4] rounded-xl shadow-soft p-6 relative overflow-hidden"
    >
      {/* Decorative bg */}
      <div className="absolute -right-6 -top-6 text-amber-500/5">
        <AlertTriangle className="w-32 h-32" />
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-heading font-bold text-teal">Inventory Alert</h3>
          <p className="text-sm font-body text-teal/70 mt-1 mb-3">
            <span className="font-bold text-amber-600">{lowStockBooks.length} books</span> are
            running low on stock and need immediate replenishment.
          </p>

          <ul className="space-y-2 mb-4">
            {lowStockBooks.map((book) => (
              <li
                key={book.title}
                className="flex justify-between items-center text-sm font-body bg-white/60 px-3 py-2 rounded-md border border-tan/30"
              >
                <span className="font-semibold text-teal">{book.title}</span>
                <span className="text-amber-600 font-label font-bold text-xs bg-amber-100 px-2 py-0.5 rounded">
                  {book.stock} left
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate('/vendor/books')}
            className="text-sm font-label font-semibold text-sage hover:text-sage-dark transition-colors flex items-center group"
          >
            Manage Inventory
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
