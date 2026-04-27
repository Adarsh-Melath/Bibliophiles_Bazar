import { Book, ShoppingBag, DollarSign, Clock, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Books', value: '128', icon: Book, trend: '+12 this month', color: 'text-burgundy', bg: 'bg-burgundy/10' },
  { label: 'Total Orders', value: '1,847', icon: ShoppingBag, trend: '+5.2% vs last month', color: 'text-shelf', bg: 'bg-shelf/5' },
  { label: 'Total Revenue', value: '₹24,563', icon: DollarSign, trend: '+12.5% vs last month', color: 'text-burgundy', bg: 'bg-burgundy/10' },
  { label: 'Pending Orders', value: '23', icon: Clock, trend: 'Needs attention', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Low Stock Alerts', value: '3', icon: AlertTriangle, trend: 'Action required', color: 'text-red-600', bg: 'bg-red-50' },
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
          className="bg-white border border-shelf/10 rounded-2xl p-5 shadow-soft hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 ${stat.bg} rounded-xl group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-heading font-bold text-shelf mb-1">{stat.value}</h3>
            <p className="text-[10px] font-ui font-bold uppercase tracking-wider text-shelf/40">{stat.label}</p>
            <p className="text-[10px] font-body text-shelf/30 mt-2 italic">{stat.trend}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
