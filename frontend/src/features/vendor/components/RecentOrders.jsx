import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const orders = [
  { id: 'ORD-8921', book: 'The Great Gatsby', customer: 'Eleanor Shellstrop', status: 'Pending', amount: '$24.99' },
  { id: 'ORD-8920', book: 'To Kill a Mockingbird', customer: 'Chidi Anagonye', status: 'Shipped', amount: '$18.50' },
  { id: 'ORD-8919', book: 'Dune: Deluxe Edition', customer: 'Tahani Al-Jamil', status: 'Delivered', amount: '$45.00' },
  { id: 'ORD-8918', book: 'Project Hail Mary', customer: 'Jason Mendoza', status: 'Shipped', amount: '$28.99' },
  { id: 'ORD-8917', book: 'Atomic Habits', customer: 'Michael Realman', status: 'Delivered', amount: '$22.00' },
  { id: 'ORD-8916', book: '1984', customer: 'Janet', status: 'Pending', amount: '$15.99' },
]

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':  return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Shipped':  return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Delivered': return 'bg-green-100 text-green-800 border-green-200'
    default:         return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-offwhite border border-tan rounded-xl shadow-soft overflow-hidden"
    >
      <div className="p-6 border-b border-tan flex justify-between items-center">
        <div>
          <h2 className="text-xl font-heading font-bold text-teal">Recent Orders</h2>
          <p className="text-sm font-body text-teal/60 mt-1">Latest transactions from your store</p>
        </div>
        <button className="text-sm font-label font-medium text-sage hover:text-sage-dark transition-colors flex items-center gap-1">
          View All <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-tan/20">
              {['Order ID', 'Book Title', 'Customer Name', 'Status', 'Amount'].map((h) => (
                <th key={h} className="px-6 py-4 text-xs font-label font-semibold text-teal uppercase tracking-wider last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-tan/50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/40 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-label font-medium text-teal">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-body font-semibold text-teal">{order.book}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-body text-teal/80">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-label font-semibold rounded-full border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-label font-bold text-teal text-right">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
