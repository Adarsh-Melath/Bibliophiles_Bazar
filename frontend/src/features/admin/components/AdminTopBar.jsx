import { Bell, Library, Settings } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'

export default function AdminTopBar() {
    const { user } = useAuthStore()

    return (
        <div className="h-24 bg-paper/80 backdrop-blur-md border-b border-shelf/5 flex items-center
                        justify-between px-10 sticky top-0 z-10">

            {/* Archival Search */}
            <div className="relative group w-96">
                <input
                    placeholder="Search ledger entries, manuscripts, or curators..."
                    className="w-full bg-transparent border-b border-shelf/10 py-3 
                             font-body text-sm text-shelf placeholder:text-shelf/20 focus:border-burgundy focus:outline-none 
                             transition-all duration-300 pl-8"
                />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-shelf/10 group-focus-within:text-burgundy transition-colors">
                    <Library size={16} />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-burgundy group-focus-within:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Right side Utility */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                    <button className="relative p-3 rounded-sm hover:bg-shelf/5 transition-all group">
                        <Bell size={18} className="text-shelf/40 group-hover:text-shelf transition-colors" />
                        <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-burgundy shadow-shelf" />
                    </button>
                    <button className="p-3 rounded-sm hover:bg-shelf/5 transition-all group">
                        <Settings size={18} className="text-shelf/40 group-hover:text-shelf transition-colors" />
                    </button>
                </div>

                <div className="flex items-center gap-4 pl-8 border-l border-shelf/5">
                    <div className="text-right hidden sm:block">
                        <p className="font-heading text-sm font-bold text-shelf leading-none tracking-tight">
                            {user?.name}
                        </p>
                        <p className="font-ui text-[8px] uppercase tracking-[0.2em] text-burgundy font-bold mt-1">
                            Archival Authority
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-sm bg-shelf text-paper flex items-center justify-center shadow-shelf border border-shelf/10">
                        <span className="font-heading text-base font-bold">
                            {user?.name?.[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
