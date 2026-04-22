import { Bell, Search, TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Library, ShoppingCart, Globe } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import AdminSidebar from '../components/AdminSidebar'
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import AdminTopBar from '../components/AdminTopBar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../../../components/ui'
import { motion } from 'framer-motion'

const STATS = [
    { label: 'Total Curators', value: '3,842', change: '+12%', up: true, icon: Users },
    { label: 'Manuscript Orders', value: '156', change: '-4%', up: false, icon: ShoppingCart },
    { label: 'Archived Volumes', value: '1,248', change: '+8', up: true, icon: BookOpen },
    { label: 'Guild Revenue', value: '$8,491', change: '+$1.2k', up: true, icon: DollarSign },
]

// ... (Data Constants remain same for structure)

const REVENUE_DATA = [
    { month: 'Jan', revenue: 3200 },
    { month: 'Feb', revenue: 4100 },
    { month: 'Mar', revenue: 3800 },
    { month: 'Apr', revenue: 5200 },
    { month: 'May', revenue: 6800 },
    { month: 'Jun', revenue: 8491 },
]
const ORDER_DATA = [
    { month: 'Jan', orders: 45 },
    { month: 'Feb', orders: 52 },
    { month: 'Mar', orders: 48 },
    { month: 'Apr', orders: 70 },
    { month: 'May', orders: 85 },
    { month: 'Jun', orders: 156 },
]

const TOP_BOOKS = [
    { title: 'The Shadow of the Wind', cover: 'https://images.unsplash.com/photo-1543004471-2401f3e1b854?auto=format&fit=crop&q=80&w=200', vendor: 'Heritage Guild', sales: 842, rating: 4.9 },
    { title: 'Midnight Library', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200', vendor: 'Curator Co.', sales: 756, rating: 4.8 },
    { title: 'Old Man and the Sea', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200', vendor: 'Archivists Inc.', sales: 612, rating: 4.7 },
]

const VENDOR_ACTIVITY = [
    { text: 'Master Curator "A. Vance" added 12 new volumes to the 19th-century collection.', time: '12 mins ago' },
    { text: 'Guild Merchant "The Booksmith" processed an acquisition request for "The Odyssey".', time: '45 mins ago' },
    { text: 'New merchant application received from "Labyrinthine Press".', time: '2 hours ago' },
]

const RECENT_ORDERS = [
    { id: '#BB-8491', customer: 'Arthur Dent', book: 'The Hitchhiker\'s Guide', status: 'Delivered', amount: '$42.00' },
    { id: '#BB-8492', customer: 'Evelyn Carnahan', book: 'Book of the Dead', status: 'Pending', amount: '$150.00' },
    { id: '#BB-8493', customer: 'Atticus Finch', book: 'To Kill a Mockingbird', status: 'Processing', amount: '$18.50' },
    { id: '#BB-8494', customer: 'Hercule Poirot', book: 'Murder on the Orient Express', status: 'Cancelled', amount: '$24.90' },
]

const STATUS_STYLES = {
    Delivered: { variant: 'success', label: 'Archived' },
    Pending: { variant: 'warning', label: 'In Review' },
    Processing: { variant: 'info', label: 'Cataloging' },
    Cancelled: { variant: 'error', label: 'Void' },
}

export default function AdminDashboardPage() {
    const { user } = useAuthStore()

    return (
        <div className="flex min-h-screen bg-paper font-body text-shelf selection:bg-burgundy/10">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopBar />

                {/* Content */}
                <main className="flex-1 p-10 overflow-y-auto space-y-10">

                    {/* Welcoming Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-shelf/5 pb-10">
                        <div>
                            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-3 block">Executive Overview</span>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-shelf tracking-tight">
                                Greetings, Curator {user?.name?.split(' ')[0]}
                            </h1>
                            <p className="font-body text-shelf/40 mt-3 text-base italic max-w-lg leading-relaxed">
                                Reviewing the state of the Bibliophile repository and global trade logs.
                            </p>
                        </div>
                        <button className="library-button-secondary px-8 py-4 text-[10px] whitespace-nowrap">
                            Configure Dashboard
                        </button>
                    </div>

                    {/* Stat Ledger cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card variant="elevated" className="h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-sm bg-shelf/5 border border-shelf/5 flex items-center justify-center text-burgundy shadow-inner">
                                            <stat.icon size={20} />
                                        </div>
                                        <div className={`flex items-center gap-1 font-ui text-[10px] font-bold ${stat.up ? 'text-green-800' : 'text-burgundy'}`}>
                                            {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <p className="font-ui text-[9px] font-bold text-shelf/30 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                                    <p className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                        {stat.value}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Matrix */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        
                        {/* Area Chart: Orders */}
                        <Card className="p-0 overflow-hidden">
                            <CardHeader className="p-8 border-b border-shelf/5">
                                <CardTitle>Order Manuscript Velocity</CardTitle>
                                <CardDescription>Monthly cataloging frequency</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <ResponsiveContainer width="100%" height={240}>
                                    <AreaChart data={ORDER_DATA}>
                                        <defs>
                                            <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#800020" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#800020" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2C1E11" strokeOpacity={0.03} vertical={false} />
                                        <XAxis 
                                            dataKey="month" 
                                            tick={{ fontSize: 10, fill: '#2C1E11', opacity: 0.3, fontWeight: 'bold' }} 
                                            axisLine={false} 
                                            tickLine={false} 
                                        />
                                        <YAxis tick={{ fontSize: 10, fill: '#2C1E11', opacity: 0.3 }} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#FDFBF7', 
                                                border: '1px solid rgba(44,30,17,0.1)',
                                                borderRadius: '2px',
                                                boxShadow: '0 10px 30px rgba(44,30,17,0.1)'
                                            }} 
                                        />
                                        <Area type="monotone" dataKey="orders" stroke="#800020" strokeWidth={3} fill="url(#orderGrad)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Bar Chart: Revenue */}
                        <Card className="p-0 overflow-hidden">
                            <CardHeader className="p-8 border-b border-shelf/5">
                                <CardTitle>Treasury Growth</CardTitle>
                                <CardDescription>Guild revenue accumulation</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={REVENUE_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2C1E11" strokeOpacity={0.03} vertical={false} />
                                        <XAxis 
                                            dataKey="month" 
                                            tick={{ fontSize: 10, fill: '#2C1E11', opacity: 0.3, fontWeight: 'bold' }} 
                                            axisLine={false} 
                                            tickLine={false} 
                                        />
                                        <YAxis tick={{ fontSize: 10, fill: '#2C1E11', opacity: 0.3 }} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(44,30,17,0.02)' }}
                                            contentStyle={{ 
                                                backgroundColor: '#FDFBF7', 
                                                border: '1px solid rgba(44,30,17,0.1)',
                                                borderRadius: '2px'
                                            }} 
                                            formatter={(v) => [`$${v}`, 'Revenue']} 
                                        />
                                        <Bar dataKey="revenue" fill="#2C1E11" radius={[2, 2, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Best Sellers & Activity */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        
                        {/* Top Performers Table */}
                        <Card className="p-0">
                            <CardHeader className="p-8 border-b border-shelf/5">
                                <CardTitle>Manuscript Merit</CardTitle>
                                <CardDescription>Top performing volumes by curation score</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-shelf/10">
                                                <th className="text-left pb-4 font-ui text-[9px] uppercase tracking-[0.3em] text-shelf/30">Volume</th>
                                                <th className="text-right pb-4 font-ui text-[9px] uppercase tracking-[0.3em] text-shelf/30">Archives</th>
                                                <th className="text-right pb-4 font-ui text-[9px] uppercase tracking-[0.3em] text-shelf/30">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-shelf/5">
                                            {TOP_BOOKS.map((book, i) => (
                                                <tr key={i} className="group hover:bg-shelf/[0.02] transition-colors">
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative shrink-0">
                                                                <img src={book.cover} alt={book.title}
                                                                    className="w-9 h-12 object-cover rounded-sm shadow-sm group-hover:scale-110 transition-transform duration-500" />
                                                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-sm" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-heading text-sm font-bold text-shelf truncate group-hover:text-burgundy transition-colors">
                                                                    {book.title}
                                                                </p>
                                                                <p className="font-ui text-[9px] uppercase tracking-widest text-shelf/30 font-bold">{book.vendor}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-right font-heading text-base font-bold text-shelf/60">
                                                        {book.sales}
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <Badge variant="info">★ {book.rating}</Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity Log */}
                        <Card className="p-0">
                            <CardHeader className="p-8 border-b border-shelf/5">
                                <CardTitle>Librarian's Log</CardTitle>
                                <CardDescription>Global repository notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                {VENDOR_ACTIVITY.map((item, i) => (
                                    <div key={i} className="flex items-start gap-6 relative group">
                                        {i !== VENDOR_ACTIVITY.length - 1 && (
                                            <div className="absolute left-[13px] top-8 bottom-[-20px] w-px bg-shelf/5" />
                                        )}
                                        <div className="w-7 h-7 rounded-sm border border-shelf/10 bg-paper flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-burgundy/30 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-burgundy/20 group-hover:bg-burgundy animate-pulse" />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <p className="font-body text-base text-shelf/70 leading-relaxed italic">{item.text}</p>
                                            <p className="font-ui text-[9px] uppercase tracking-[0.2em] font-bold text-shelf/20">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-shelf/5">
                                    <button className="font-ui text-[9px] uppercase font-bold tracking-[0.3em] text-burgundy hover:text-shelf transition-colors">
                                        Access Full Archives →
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Master Order Manifest */}
                    <Card className="p-0 overflow-hidden" variant="elevated">
                        <CardHeader className="p-10 border-b border-shelf/5 bg-paper/50">
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <CardTitle className="text-3xl">Trade Manifests</CardTitle>
                                    <CardDescription>Recent cross-guild acquisitions and status</CardDescription>
                                </div>
                                <button className="library-button-secondary py-3 px-6 text-[9px]">
                                    Purge Logs
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-shelf/5 border-b border-shelf/10">
                                            {['Sequence', 'Curator', 'Manuscript', 'Archival Status', 'Appraisal'].map(h => (
                                                <th key={h} className="text-left px-8 py-4 font-ui text-[9px]
                                                                       font-bold text-shelf/40 uppercase tracking-[0.3em]">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-shelf/5">
                                        {RECENT_ORDERS.map((order, i) => (
                                            <tr key={i} className="hover:bg-shelf/[0.01] transition-colors group">
                                                <td className="px-8 py-6 font-ui text-[10px] font-bold text-shelf/30 uppercase tracking-widest">
                                                    {order.id}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-heading text-base font-bold text-shelf">{order.customer}</p>
                                                </td>
                                                <td className="px-8 py-6 font-body text-shelf/60 italic">
                                                    {order.book}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <Badge variant={STATUS_STYLES[order.status]?.variant || 'default'}>
                                                        {STATUS_STYLES[order.status]?.label || order.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-8 py-6 font-heading text-lg font-bold text-shelf">
                                                    {order.amount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                </main>
            </div>
        </div>
    )
}
