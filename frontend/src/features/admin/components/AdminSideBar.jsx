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

export default function AdminSideBar() {
    const { user, clearAuth } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearAuth()
        navigate('/admin/login')
    }

    return (
        <aside className="w-72 shrink-0 min-h-screen flex flex-col bg-ink relative z-20 border-r border-white/5 shadow-2xl font-ui">
            {/* Brand Identity */}
            <div className="px-10 py-12 relative z-10">
                <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                        <Library size={24} className="text-gold" />
                    </div>
                    <div>
                        <span className="font-heading text-xl font-bold text-white block leading-none tracking-tight">
                            BIBLIOPHILES
                        </span>
                        <span className="font-ui text-[8px] uppercase tracking-[0.5em] text-gold font-bold mt-1.5 block">
                            ADMIN PORTAL
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-4 flex flex-col gap-1 relative z-10">
                <p className="px-6 mb-4 font-ui text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Directory</p>
                {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group flex items-center gap-5 px-6 py-4 rounded-full text-[10px] uppercase font-bold tracking-[0.25em] transition-all duration-500 relative
                             ${isActive
                                ? 'text-gold bg-white/5'
                                : 'text-white/30 hover:text-white hover:bg-white/[0.02]'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div 
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-5 bg-gold rounded-r-full"
                                    />
                                )}
                                <Icon size={16} className={`${isActive ? 'text-gold' : 'text-white/20 group-hover:text-gold'} transition-colors duration-500`} />
                                <span className="flex-1">{label}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_#d4af37]" />}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Admin Profile */}
            <div className="px-8 py-10 border-t border-white/5 bg-white/[0.01] relative z-10">
                <div className="flex items-center gap-5 mb-8 px-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center
                                    justify-center text-gold font-heading text-xl font-bold shadow-xl">
                        {user?.name?.charAt(0) || 'A'}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-heading text-lg font-bold text-white truncate tracking-tight">
                            {user?.name}
                        </p>
                        <p className="font-ui text-[9px] uppercase tracking-widest text-gold font-bold mt-1">
                            System Admin
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-full
                               text-white/40 hover:text-white hover:bg-white/5
                               font-ui text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border border-white/10 hover:border-white/20"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </aside>
    )
}