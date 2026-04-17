import { User, Package, Heart, MapPin, Shield, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
    { id: 'personal', label: 'Personal Info', icon: User, path: '/profile' },
    { id: 'orders', label: 'My Orders', icon: Package, path: '/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/profile/addresses' },
    { id: 'security', label: 'Security', icon: Shield, path: '/profile/security' },
]

export default function ProfileSidebar({ activeSection, onSectionChange }) {
    const location = useLocation()

    return (
        <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-accent/20 p-6">

                {/* Profile Header */}
                <div className="text-center pb-6 mb-6 border-b border-accent/20">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <User size={32} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-heading">Welcome back!</h3>
                    <p className="font-body text-sm text-heading-muted mt-1">Manage your account</p>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    {menuItems.map(({ id, label, icon: Icon, path }) => {
                        const isActive = activeSection === id ||
                                       (id === 'personal' && location.pathname === '/profile') ||
                                       location.pathname === path

                        return (
                            <Link
                                key={id}
                                to={path}
                                onClick={() => onSectionChange(id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-heading-muted hover:bg-accent/5 hover:text-heading'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-body font-medium">{label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Settings */}
                <div className="mt-8 pt-6 border-t border-accent/20">
                    <Link
                        to="/settings"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-heading-muted
                                 hover:bg-accent/5 hover:text-heading transition-all duration-200"
                    >
                        <Settings size={18} />
                        <span className="font-body font-medium">Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}