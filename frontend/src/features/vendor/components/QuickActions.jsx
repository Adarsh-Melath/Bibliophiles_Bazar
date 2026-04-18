import { Plus, Package, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const actions = [
  { id: 'add', label: 'Add New Book', icon: Plus, primary: true, to: '/vendor/books/new' },
  { id: 'orders', label: 'View Orders', icon: Package, primary: false, to: '/vendor/orders' },
  { id: 'payout', label: 'Request Payout', icon: DollarSign, primary: false, to: '/vendor/earnings' },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-offwhite border border-tan rounded-xl shadow-soft p-6"
    >
      <h2 className="text-xl font-heading font-bold text-teal mb-1">Quick Actions</h2>
      <p className="text-sm font-body text-teal/60 mb-6">Common tasks and shortcuts</p>

      <div className="flex flex-col space-y-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.to)}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-label font-semibold text-sm transition-all duration-200 ${
              action.primary
                ? 'bg-sage text-white hover:bg-sage-dark shadow-sm hover:shadow'
                : 'bg-white border-2 border-sage text-sage hover:bg-sage/5'
            }`}
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
