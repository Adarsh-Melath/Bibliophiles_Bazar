import { Plus, Package, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const actions = [
  { id: 'add', label: 'Add Book', icon: Plus, primary: true, to: '/vendor/books/new' },
  { id: 'orders', label: 'Recent Orders', icon: Package, primary: false, to: '/vendor/orders' },
  { id: 'payout', label: 'Earnings', icon: DollarSign, primary: false, to: '/vendor/earnings' },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white border border-shelf/10 rounded-2xl shadow-soft p-8"
    >
      <h2 className="text-xl font-heading font-bold text-shelf mb-1">Actions</h2>
      <p className="text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/30 mb-8">Management shortcuts</p>

      <div className="flex flex-col space-y-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.to)}
            className={`w-full flex items-center justify-center px-4 py-4 rounded-xl font-ui font-bold text-[10px] uppercase tracking-widest transition-all duration-300 group ${
              action.primary
                ? 'bg-burgundy text-white hover:bg-shelf hover:-translate-y-1 shadow-lg active:scale-95'
                : 'bg-paper text-shelf hover:bg-shelf hover:text-white border border-shelf/5 active:scale-95'
            }`}
          >
            <action.icon className={`w-4 h-4 mr-3 transition-colors ${action.primary ? 'text-white' : 'text-burgundy group-hover:text-white'}`} />
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
