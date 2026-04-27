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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border border-shelf/10 rounded-2xl shadow-soft p-8 h-[450px] flex flex-col group"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-xl font-heading font-bold text-shelf">Market Performance</h2>
          <p className="text-[10px] font-ui font-bold uppercase tracking-[0.2em] text-shelf/30 mt-1.5">Monthly revenue trends</p>
        </div>
        <div className="relative">
            <select className="bg-shelf/[0.03] border border-shelf/5 rounded-full px-5 py-2 text-[9px] font-ui font-bold uppercase tracking-widest text-shelf/60 appearance-none pr-10 hover:bg-white hover:border-burgundy/20 transition-all cursor-pointer outline-none">
                <option>Last 7 Months</option>
                <option>This Year</option>
                <option>All Time</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-shelf/20">
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#800020" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#800020" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2C1E11" opacity={0.03} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#2C1E11', fontSize: 10, fontFamily: 'Montserrat', fontWeight: 600, opacity: 0.3 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#2C1E11', fontSize: 10, fontFamily: 'Montserrat', fontWeight: 600, opacity: 0.3 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip
              cursor={{ stroke: '#800020', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{
                backgroundColor: '#FDFBF7',
                border: '1px solid rgba(44,30,17,0.1)',
                borderRadius: '4px',
                fontFamily: 'Montserrat',
                boxShadow: '0 10px 30px rgba(44,30,17,0.1)',
                padding: '12px'
              }}
              itemStyle={{ color: '#800020', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase' }}
              labelStyle={{ color: '#2C1E11', fontSize: '10px', fontWeight: 700, marginBottom: '4px', opacity: 0.4 }}
              formatter={(v) => [`₹${v}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#800020"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 5, fill: '#800020', stroke: '#fff', strokeWidth: 2, shadow: '0 0 10px rgba(128,0,32,0.4)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
