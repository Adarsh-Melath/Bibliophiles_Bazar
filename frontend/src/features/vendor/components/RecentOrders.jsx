import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const orders = [
  { id: 'ORD-8921', book: 'The Great Gatsby', customer: 'Eleanor Shellstrop', status: 'Pending', amount: '₹249' },
  { id: 'ORD-8920', book: 'To Kill a Mockingbird', customer: 'Chidi Anagonye', status: 'Shipped', amount: '₹185' },
  { id: 'ORD-8919', book: 'Dune: Deluxe Edition', customer: 'Tahani Al-Jamil', status: 'Delivered', amount: '₹450' },
  { id: 'ORD-8918', book: 'Project Hail Mary', customer: 'Jason Mendoza', status: 'Shipped', amount: '₹289' },
  { id: 'ORD-8917', book: 'Atomic Habits', customer: 'Michael Realman', status: 'Delivered', amount: '₹220' },
  { id: 'ORD-8916', book: '1984', customer: 'Janet', status: 'Pending', amount: '₹159' },
]

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':  return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'Shipped':  return 'bg-shelf/5 text-shelf/70 border-shelf/10'
    case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    default:         return 'bg-shelf/5 text-shelf/50 border-shelf/5'
  }
}

export default function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white border border-shelf/10 rounded-2xl shadow-soft overflow-hidden"
    >
      <div className="p-8 border-b border-shelf/5 flex justify-between items-center bg-shelf/[0.01]">
        <div>
          <h2 className="text-xl font-heading font-bold text-shelf">Recent activity</h2>
          <p className="text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/30 mt-1.5">Latest transactions from your store</p>
        </div>
        <button className="text-[10px] font-ui font-bold uppercase tracking-widest text-burgundy hover:text-shelf transition-all flex items-center gap-2 group">
          View all 
          <div className="w-6 h-6 rounded-full bg-burgundy/5 flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-all">
            <ExternalLink className="w-3 h-3" />
          </div>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-shelf/[0.02]">
              {['Order ID', 'Book Title', 'Customer', 'Status', 'Amount'].map((h) => (
                <th key={h} className="px-8 py-5 text-[9px] font-ui font-bold text-shelf/40 uppercase tracking-[0.3em] last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-shelf/5">
            {orders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-shelf/[0.01] transition-colors group">
                <td className="px-8 py-5 whitespace-nowrap text-[11px] font-ui font-bold text-shelf/50 group-hover:text-shelf transition-colors">{order.id}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                    <p className="text-sm font-heading font-bold text-shelf">{order.book}</p>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-body text-shelf/60">{order.customer}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={`px-4 py-1.5 text-[9px] font-ui font-bold uppercase tracking-widest rounded-full border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-sm font-ui font-bold text-shelf text-right">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
