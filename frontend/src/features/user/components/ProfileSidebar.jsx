import { User, Package, Heart, MapPin, Shield, Check, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../../../components/ui'

const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: User, path: '/profile' },
    { id: 'orders', label: 'My Orders', icon: Package, path: '/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/profile/addresses' },
    { id: 'security', label: 'Security', icon: Shield, path: '/profile/security' },
]

export default function ProfileSidebar({ activeSection }) {
    const navigate = useNavigate();
    
    const handleNavigation = (item) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="w-full">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col gap-6 sticky top-40">
                <nav className="flex flex-col gap-2">
                    <div className="px-6 mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-ink/20">Archive Registry</span>
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`relative flex items-center gap-5 px-6 py-5 rounded-full transition-all duration-700 text-left group overflow-hidden ${
                                    isActive 
                                    ? 'text-white shadow-2xl shadow-ink/20' 
                                    : 'text-ink/40 hover:text-ink hover:bg-ink/[0.02]'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSidebarBg"
                                        className="absolute inset-0 bg-ink z-0"
                                        initial={false}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 40
                                        }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center justify-between w-full">
                                    <span className="flex items-center gap-5">
                                        <Icon size={18} className={isActive ? 'text-gold' : 'text-ink/20 group-hover:text-gold transition-colors duration-500'} />
                                        <span className="font-ui text-[10px] font-bold uppercase tracking-[0.3em]">{item.label}</span>
                                    </span>
                                    {isActive && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_#d4af37]"
                                        />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile/Tablet Horizontal Tabs */}
            <div className="lg:hidden mb-12 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`relative flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-700 whitespace-nowrap ${
                                    isActive 
                                    ? 'bg-ink text-white shadow-xl shadow-ink/20' 
                                    : 'bg-white/50 backdrop-blur-md text-ink/40 border border-ink/[0.05] hover:border-gold/30'
                                }`}
                            >
                                <Icon size={14} className={isActive ? 'text-gold' : ''} />
                                <span className="font-ui text-[9px] font-bold uppercase tracking-[0.3em]">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
