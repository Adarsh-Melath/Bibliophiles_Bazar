import { Search, Bell, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'

export default function VendorTopNavbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="h-20 bg-offwhite border-b border-tan flex items-center justify-between px-8 z-10 sticky top-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal/50 group-focus-within:text-sage transition-colors" />
          <input
            type="text"
            placeholder="Search books, orders, or customers..."
            className="w-full bg-white border border-tan rounded-full py-2.5 pl-10 pr-4 text-sm font-body text-teal placeholder:text-teal/50 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 text-teal hover:text-sage transition-colors rounded-full hover:bg-tan/30">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-offwhite" />
        </button>

        <div className="h-8 w-px bg-tan" />

        {/* Profile */}
        <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full border-2 border-sage bg-sage/20 flex items-center justify-center text-teal font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'V'}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-label font-semibold text-teal">
              {user?.name || 'Vendor'}
            </p>
            <p className="text-xs font-body text-teal/70">Vendor Account</p>
          </div>
          <ChevronDown className="w-4 h-4 text-teal/70" />
        </button>
      </div>
    </header>
  )
}
