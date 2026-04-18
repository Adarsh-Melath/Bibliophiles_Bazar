import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

const data = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 5200, orders: 380 },
  { name: 'Apr', sales: 4500, orders: 290 },
  { name: 'May', sales: 6000, orders: 480 },
  { name: 'Jun', sales: 5800, orders: 390 },
  { name: 'Jul', sales: 7500, orders: 520 },
]

export default function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-offwhite border border-tan rounded-xl shadow-soft p-6 h-[400px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-teal">Sales Overview</h2>
          <p className="text-sm font-body text-teal/60 mt-1">Monthly revenue performance</p>
        </div>
        <select className="bg-white border border-tan rounded-lg px-3 py-1.5 text-sm font-label text-teal focus:outline-none focus:ring-2 focus:ring-sage/50">
          <option>Last 7 Months</option>
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#548C8C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#548C8C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D7CCC8" opacity={0.5} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#548C8C', fontSize: 12, fontFamily: 'Open Sans' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#548C8C', fontSize: 12, fontFamily: 'Open Sans' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#EFEBE9',
                borderColor: '#D7CCC8',
                borderRadius: '8px',
                fontFamily: 'Open Sans',
                color: '#548C8C',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)',
              }}
              itemStyle={{ color: '#548C8C', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#548C8C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6, fill: '#9CAF88', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
