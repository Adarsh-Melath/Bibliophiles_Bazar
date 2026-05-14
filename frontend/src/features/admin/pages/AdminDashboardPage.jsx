import { Bell, Search, TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Library, ShoppingCart, Globe } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../../../components/ui'
import { motion } from 'framer-motion'
import PageTransition from '../../../components/ui/PageTransition'

const revenueData = [
    { name: 'Jan', revenue: 4000, orders: 2400 },
    { name: 'Feb', revenue: 3000, orders: 1398 },
    { name: 'Mar', revenue: 2000, orders: 9800 },
    { name: 'Apr', revenue: 2780, orders: 3908 },
    { name: 'May', revenue: 1890, orders: 4800 },
    { name: 'Jun', revenue: 2390, orders: 3800 },
]

const stats = [
    { label: 'Total Revenue', value: '$128,450', icon: DollarSign, trend: '+12.5%', trendUp: true },
    { label: 'Total Orders', value: '2,345', icon: ShoppingCart, trend: '+8.2%', trendUp: true },
    { label: 'Active Users', value: '1,890', icon: Users, trend: '-2.1%', trendUp: false },
    { label: 'Total Books', value: '15,678', icon: BookOpen, trend: '+5.3%', trendUp: true },
]

export default function AdminDashboardPage() {
    const { user } = useAuthStore()

    return (
        <div className="min-h-screen bg-paper font-ui selection:bg-gold/20">
            <main className="section-container py-16">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-gold" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Executive Overview</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-7xl font-bold text-ink tracking-tighter mb-4">
                        System <span className="italic font-heading">Insights</span>
                    </h1>
                    <p className="text-ink/30 text-lg">Welcome back, {user?.name}. Here is the current state of your literary empire.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, ease: [0.19, 1, 0.22, 1], duration: 1 }}
                            className="editorial-card group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 rounded-full bg-ink/[0.03] border border-ink/[0.05] flex items-center justify-center transition-all duration-700 group-hover:bg-ink group-hover:text-gold group-hover:shadow-2xl group-hover:shadow-ink/20">
                                    <stat.icon className="h-6 w-6 transition-colors duration-700" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${stat.trendUp ? 'border-gold text-gold bg-gold/5' : 'border-velvet/20 text-velvet bg-velvet/5'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20 mb-2">{stat.label}</p>
                            <div className="text-4xl font-bold text-ink tracking-tighter">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, ease: [0.19, 1, 0.22, 1], duration: 1.2 }}
                        className="lg:col-span-2 editorial-card !p-12"
                    >
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-ink tracking-tight">Revenue Dynamics</h3>
                                <p className="text-[10px] text-ink/30 uppercase tracking-[0.3em] mt-2">Fiscal trajectory analysis</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gold" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">Revenue</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" vertical={false} opacity={0.03} />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#1c1c1c', fontSize: 10, fontWeight: 700, opacity: 0.2 }} 
                                        dy={15}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#1c1c1c', fontSize: 10, fontWeight: 700, opacity: 0.2 }} 
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1c1c1c', border: 'none', borderRadius: '12px', padding: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                                        itemStyle={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                        labelStyle={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                                        cursor={{ stroke: '#d4af37', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#d4af37"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        animationDuration={2500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, ease: [0.19, 1, 0.22, 1], duration: 1.2 }}
                        className="editorial-card !p-12 bg-ink text-white"
                    >
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-white tracking-tight">Recent Archives</h3>
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mt-2">Latest system curation</p>
                        </div>
                        <div className="space-y-10">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:bg-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                    </div>
                                    <div className="flex-1 border-b border-white/5 pb-4 group-last:border-none">
                                        <p className="font-body text-sm font-medium text-white/80 group-hover:text-gold transition-colors duration-500">Order batch #{4582 + item} catalogued</p>
                                        <p className="text-[9px] text-white/20 uppercase tracking-widest mt-2 font-bold">
                                            {item * 12} minutes ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
