import { Search, Bell, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import { motion } from 'framer-motion'

export default function VendorTopNavbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="h-20 bg-paper/80 backdrop-blur-md border-b border-ink/5 flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 group-focus-within:text-gold transition-colors" />
          <input
            type="text"
            placeholder="Search books, orders..."
            className="w-full bg-ink/[0.03] border border-ink/5 rounded-full py-2.5 pl-11 pr-4 text-[10px] font-ui uppercase tracking-widest text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/30 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 text-ink/40 hover:text-gold transition-colors rounded-full hover:bg-ink/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-velvet rounded-full border border-paper" />
        </button>

        <div className="h-6 w-px bg-ink/10" />

        {/* Profile */}
        <button className="flex items-center space-x-3 hover:opacity-80 transition-all p-1.5 rounded-full hover:bg-ink/5">
          <div className="w-9 h-9 rounded-full border-2 border-gold/20 bg-ink flex items-center justify-center text-paper font-bold text-xs shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase() || 'V'}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-[10px] font-ui font-bold uppercase tracking-widest text-ink">
              {user?.name || 'Vendor'}
            </p>
            <p className="text-[8px] font-body font-bold text-ink/40 uppercase tracking-[0.2em] mt-0.5">Partner Account</p>
          </div>
          <ChevronDown className="w-3 h-3 text-ink/30" />
        </button>
      </div>
    </header>
  )
}
