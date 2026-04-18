import { Book, ShoppingBag, DollarSign, Clock, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Books', value: '128', icon: Book, trend: '+12 this month' },
  { label: 'Total Orders', value: '1,847', icon: ShoppingBag, trend: '+5.2% vs last month' },
  { label: 'Total Revenue', value: '$24,563', icon: DollarSign, trend: '+12.5% vs last month' },
  { label: 'Pending Orders', value: '23', icon: Clock, trend: 'Needs attention' },
  { label: 'Low Stock Alerts', value: '3', icon: AlertTriangle, trend: 'Action required' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

export default function StatsCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          className="bg-offwhite border border-tan rounded-xl p-5 shadow-soft hover:-translate-y-1 transition-transform duration-300 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-sage/10 rounded-lg group-hover:bg-sage/20 transition-colors">
              <stat.icon className="w-6 h-6 text-sage" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-heading font-bold text-teal mb-1">{stat.value}</h3>
            <p className="text-sm font-label font-medium text-teal/70">{stat.label}</p>
            <p className="text-xs font-body text-teal/50 mt-2">{stat.trend}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
