import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, ShoppingCart, DollarSign,
  BarChart2, Star, User, Settings, Library,
} from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/vendor/dashboard' },
  { icon: BookOpen, label: 'Books', to: '/vendor/books' },
  { icon: ShoppingCart, label: 'Orders', to: '/vendor/orders' },
  { icon: DollarSign, label: 'Earnings', to: '/vendor/earnings' },
  { icon: BarChart2, label: 'Analytics', to: '/vendor/analytics' },
  { icon: Star, label: 'Reviews', to: '/vendor/reviews' },
]

const bottomNavItems = [
  { icon: User, label: 'Profile', to: '/vendor/profile' },
  { icon: Settings, label: 'Settings', to: '/vendor/settings' },
]

export default function VendorSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="w-64 bg-sage h-full flex flex-col text-white shadow-lg z-20 relative flex-shrink-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/20">
        <Library className="w-8 h-8 mr-3 text-white" />
        <span className="font-heading font-bold text-xl tracking-wide">
          Bibliophile's
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-label uppercase tracking-wider text-white/70 mb-4 px-2">
          Menu
        </p>
        {navItems.map((item, index) => {
          const active = pathname === item.to
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.to}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors font-label text-sm ${
                  active
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-white/80'}`} />
                {item.label}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="p-4 border-t border-white/20 space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="w-full flex items-center px-3 py-2 rounded-lg transition-colors font-label text-sm text-white/90 hover:bg-white/10 hover:text-white"
          >
            <item.icon className="w-5 h-5 mr-3 text-white/80" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
