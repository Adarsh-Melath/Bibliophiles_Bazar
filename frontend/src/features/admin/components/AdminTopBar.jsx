import { Bell, Library, Settings, Search } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'

export default function AdminTopBar() {
    const { user } = useAuthStore()

    return (
        <div className="h-24 bg-paper/80 backdrop-blur-xl border-b border-ink/5 flex items-center
                        justify-between px-10 sticky top-0 z-10 font-ui">

            {/* Editorial Search */}
            <div className="relative group w-96">
                <input
                    placeholder="Search curated collections, members, or insights..."
                    className="w-full bg-transparent border-b border-ink/10 py-3 
                             font-body text-sm text-ink placeholder:text-ink/20 focus:border-gold focus:outline-none 
                             transition-all duration-300 pl-8"
                />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/10 group-focus-within:text-gold transition-colors duration-500">
                    <Search size={18} />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-focus-within:w-full transition-all duration-700 ease-in-out" />
            </div>

            {/* Right side Utility */}
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-4">
                    <button className="relative p-3 rounded-full hover:bg-ink/5 transition-all group">
                        <Bell size={20} className="text-ink/30 group-hover:text-ink transition-colors" />
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </button>
                    <button className="p-3 rounded-full hover:bg-ink/5 transition-all group">
                        <Settings size={20} className="text-ink/30 group-hover:text-ink transition-colors" />
                    </button>
                </div>

                <div className="flex items-center gap-5 pl-10 border-l border-ink/5">
                    <div className="text-right hidden sm:block">
                        <p className="font-heading text-base font-bold text-ink leading-none tracking-tight">
                            {user?.name}
                        </p>
                        <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-gold font-bold mt-1.5">
                            Executive Admin
                        </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center shadow-xl shadow-ink/20 border border-white/10 overflow-hidden">
                        <span className="font-heading text-lg font-bold">
                            {user?.name?.[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
