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

export default function ProfileSidebar({ activeSection, onSectionChange }) {
    const navigate = useNavigate();
    
    const handleNavigation = (item) => {
        if (item.path) {
            navigate(item.path);
        }
        if (onSectionChange) {
            onSectionChange(item.id);
        }
    };

    return (
        <div className="w-full">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col gap-4 sticky top-40">
                <div className="px-5 mb-2">
                    <h3 className="font-heading font-bold text-2xl text-shelf">
                        Dashboard
                    </h3>
                    <div className="h-0.5 w-8 bg-burgundy mt-2"></div>
                </div>

                <nav className="flex flex-col gap-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`relative flex items-center gap-4 px-5 py-4 rounded transition-all duration-300 text-left group ${
                                    isActive 
                                    ? 'text-paper font-bold' 
                                    : 'text-shelf/60 hover:text-shelf hover:bg-shelf/5'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSidebarBg"
                                        className="absolute inset-0 bg-shelf rounded-sm z-0 shadow-lg"
                                        initial={false}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 350,
                                            damping: 35
                                        }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-4">
                                    <Icon size={18} className={isActive ? 'text-burgundy' : 'group-hover:text-burgundy transition-colors'} />
                                    <span className="font-ui text-xs uppercase tracking-widest">{item.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile/Tablet Horizontal Tabs */}
            <div className="lg:hidden mb-10 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap border ${
                                    isActive 
                                    ? 'bg-shelf text-paper border-shelf shadow-lg' 
                                    : 'bg-white text-shelf/60 border-shelf/10 hover:border-burgundy/30'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <Icon size={14} className={isActive ? 'text-burgundy' : ''} />
                                    <span className="font-ui text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
