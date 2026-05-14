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
    <div className="w-66 bg-ink h-full flex flex-col text-paper shadow-2xl z-20 relative flex-shrink-0">
      {/* Logo */}
      <div className="h-24 flex items-center px-8 border-b border-paper/10">
        <Library className="w-8 h-8 mr-3 text-gold" />
        <div>
          <span className="font-heading font-bold text-xl tracking-tight text-paper block">
            The Bibliophile's Bazar
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-ui font-bold">
            Vendor Portal
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-paper/40 mb-6 px-4 font-bold">
            Catalog
        </p>
        {navItems.map((item, index) => {
          const active = pathname === item.to
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.to}
                className={`w-full flex items-center px-4 py-4 rounded transition-all duration-300 font-ui text-[11px] uppercase tracking-widest font-bold group ${
                  active
                    ? 'bg-gold text-ink shadow-lg'
                    : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-4 transition-colors ${active ? 'text-ink' : 'text-gold group-hover:text-paper'}`} />
                {item.label}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="p-4 border-t border-paper/10 space-y-1 bg-ink/80">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="w-full flex items-center px-4 py-3 rounded transition-all duration-300 font-ui text-[11px] uppercase tracking-widest font-bold text-paper/60 hover:text-paper hover:bg-paper/10"
          >
            <item.icon className="w-5 h-5 mr-4 text-paper/40" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
