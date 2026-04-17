import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Tag, Store, BookOpen,
    ShoppingBag, Library, ShieldCheck,
    FileCheck, Settings, LogOut
} from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
    { label: 'Categories', icon: Tag, to: '/admin/categories' },
    { label: 'Vendors', icon: Store, to: '/admin/vendors' },
    { label: 'Books', icon: BookOpen, to: '/admin/books' },
    { label: 'Orders', icon: ShoppingBag, to: '/admin/orders' },
    { label: 'Collections', icon: Library, to: '/admin/collections' },
    { label: 'Admins', icon: ShieldCheck, to: '/admin/admins' },
    { label: 'Vendor Payouts', icon: FileCheck, to: '/admin/vendor-payouts' },
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
        <aside className="w-56 shrink-0 min-h-screen flex flex-col"
            style={{ background: 'linear-gradient(180deg, #3d5a3e 0%, #2d4a2e 100%)' }}>

            {/* Logo */}
            <div className="px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <BookOpen size={20} className="text-white" />
                    <span className="font-heading text-base font-bold text-white">
                        The Bibliophile's Bazar
                    </span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
                    <NavLink key={to} to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                             font-body transition-all duration-200
                             ${isActive
                                ? 'bg-white/20 text-white font-medium'
                                : 'text-white/60 hover:bg-white/10 hover:text-white'
                            }`
                        }>
                        <Icon size={15} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Admin profile + logout */}
            <div className="px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center
                                    justify-center text-white text-xs font-bold">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-body text-xs font-medium text-white truncate">
                            {user?.name}
                        </p>
                        <p className="font-body text-xs text-white/50 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl
                               text-white/60 hover:text-white hover:bg-white/10
                               font-body text-xs transition-all duration-200">
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
