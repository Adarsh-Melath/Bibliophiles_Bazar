import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Users, Store, BookOpen,
    ShoppingBag, Library, ShieldCheck,
    CreditCard, Settings, LogOut, BarChart2
} from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
    { label: 'Overview', icon: LayoutDashboard, to: '/admin/dashboard' },
    { label: 'Users', icon: Users, to: '/admin/users' },
    { label: 'Vendors', icon: Store, to: '/admin/vendors' },
    { label: 'Books', icon: BookOpen, to: '/admin/books' },
    { label: 'Orders', icon: ShoppingBag, to: '/admin/orders' },
    { label: 'Categories', icon: Library, to: '/admin/categories' },
    { label: 'Insights', icon: BarChart2, to: '/admin/analytics' },
    { label: 'Payments', icon: CreditCard, to: '/admin/vendor-payouts' },
    { label: 'Settings', icon: Settings, to: '/admin/settings' },
]

export default function AdminSidebar() {
    const { user, clearAuth } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearAuth()
        navigate('/admin/login')
    }

    return (
        <aside className="w-64 shrink-0 min-h-screen flex flex-col bg-shelf relative z-20 border-r border-shelf shadow-2xl">
            {/* Archival Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]" />

            {/* Brand Identity */}
            <div className="px-8 py-10 border-b border-paper/5 relative z-10">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-burgundy rounded-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Library size={20} className="text-paper" />
                    </div>
                    <div>
                        <span className="font-heading text-lg font-bold text-paper block leading-none tracking-tight">
                            Admin Portal
                        </span>
                        <span className="font-ui text-[8px] uppercase tracking-[0.4em] text-burgundy font-bold mt-1 block">
                            Control Panel
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 flex flex-col gap-2 relative z-10">
                {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group flex items-center gap-4 px-6 py-4 rounded-sm text-[10px] uppercase font-bold tracking-[0.25em] transition-all duration-500 relative
                             ${isActive
                                ? 'text-paper bg-burgundy shadow-shelf'
                                : 'text-paper/40 hover:text-paper hover:bg-paper/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-indicator"
                                        className="absolute left-0 w-1 h-6 bg-paper rounded-r-full"
                                    />
                                )}
                                <Icon size={14} className={`${isActive ? 'text-paper' : 'text-paper/20 group-hover:text-burgundy'} transition-colors`} />
                                <span className="flex-1">{label}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-paper animate-pulse" />}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Admin Profile */}
            <div className="px-6 py-8 border-t border-paper/10 bg-black/20 relative z-10">
                <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="w-10 h-10 rounded-sm bg-paper/5 border border-paper/10 flex items-center
                                    justify-center text-paper font-heading text-lg font-bold shadow-inner">
                        {user?.name?.charAt(0) || 'A'}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-bold text-paper truncate tracking-tight">
                            {user?.name}
                        </p>
                        <p className="font-ui text-[8px] uppercase tracking-widest text-burgundy font-bold mt-0.5">
                            Admin Status
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-sm
                               text-paper/60 hover:text-paper hover:bg-burgundy
                               font-ui text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border border-paper/5 hover:border-burgundy"
                >
                    <LogOut size={14} />
                    Logout
                </button>
            </div>
        </aside>
    )
}