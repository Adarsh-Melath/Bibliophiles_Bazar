import { useState } from 'react'
import { Search, X, ShieldOff, ShieldCheck, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { useToggleBlock, useAdminUsers } from '../hooks/useAdminUser'

export default function AdminUsersPage() {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(0)
    const [confirmModal, setConfirmModal] = useState(null) // { id, name, blocked }
    const SIZE = 10

    const { data, isLoading } = useAdminUsers({ search, page, size: SIZE })
    const { mutate: toggleBlock, isPending: isToggling } = useToggleBlock()

    const users = data?.content || []
    const totalPages = data?.totalPages || 0
    const totalElements = data?.totalElements || 0

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(searchInput)
        setPage(0)
    }

    const handleClearSearch = () => {
        setSearchInput('')
        setSearch('')
        setPage(0)
    }

    const handleToggleBlock = () => {
        if (!confirmModal) return
        toggleBlock(confirmModal.id, { onSuccess: () => setConfirmModal(null) })
    }

    return (
        <div className="min-h-screen bg-[#EFEBE9] relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#9CAF88]/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-[#D7CCC8]/30 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 hidden md:block">
                {/* Admin Navbar */}
                <div className="h-20 glass-panel border-b border-white/50 shadow-sm flex items-center px-10 justify-between sticky top-0 z-40 bg-white/40 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/60 shadow-sm flex items-center justify-center border border-white/80">
                            <ShieldCheck size={20} className="text-[#548C8C]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8fa2a2] mb-0.5 block font-bold">Administration</span>
                            <span className="text-editoral text-lg tracking-tight text-[#3b5a5a] font-medium leading-none">Curator Collection</span>
                        </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] bg-white/50 px-4 py-2 rounded-full border border-white/40 font-bold shadow-sm">Patron Directory</span>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 relative z-10 animate-cinematic">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <h1 className="text-editorial text-[32px] lg:text-[40px] text-[#3b5a5a] font-light tracking-tight leading-none mb-2">Member Directory</h1>
                        <p className="text-[13px] text-[#8fa2a2] font-medium tracking-wide">
                            Managing <span className="font-bold text-[#548C8C]">{totalElements}</span> registered patrons globally.
                        </p>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex items-center gap-3">
                        <div className="relative group">
                            <input
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="Search via identity or email..."
                                className="w-full md:w-80 pl-11 pr-10 py-3.5 rounded-2xl border border-[#548C8C]/15 bg-white/40 backdrop-blur-md
                                           font-sans text-[14px] text-[#3b5a5a] placeholder-[#8fa2a2]/60 font-medium
                                           focus:outline-none focus:border-[#548C8C]/40 focus:bg-white/70 focus:shadow-[0_4px_20px_rgba(84,140,140,0.06)]
                                           transition-all duration-500 ease-out"
                            />
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8fa2a2] group-focus-within:text-[#548C8C] transition-colors duration-500" strokeWidth={1.5} />
                            {searchInput && (
                                <button type="button" onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa2a2] hover:text-[#548C8C] hover:rotate-90 transition-all duration-300 p-1">
                                    <X size={16} strokeWidth={1.5} />
                                </button>
                            )}
                        </div>
                        <button type="submit"
                            className="px-6 py-3.5 rounded-2xl bg-[#548C8C] text-white text-[11px] font-bold tracking-[0.15em] uppercase
                                       hover:bg-[#3b5a5a] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(84,140,140,0.25)]
                                       transition-all duration-500 ease-out shadow-sm border border-transparent">
                            Locate
                        </button>
                    </form>
                </div>

                {/* Table Container */}
                <div className="glass-panel p-2 rounded-[2rem] shadow-[0_20px_60px_rgba(84,140,140,0.06)] border border-white/60 backdrop-blur-xl mb-10 overflow-hidden">
                    <div className="bg-white/40 rounded-[1.5rem] overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-[#548C8C]/10 bg-white/50">
                                    <th className="text-left px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Patron Identity</th>
                                    <th className="text-left px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Clearance</th>
                                    <th className="text-left px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Inducted</th>
                                    <th className="text-left px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Status</th>
                                    <th className="text-right px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#548C8C]/10">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-24">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader size={28} className="animate-spin text-[#548C8C]" strokeWidth={1.5} />
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8fa2a2] font-bold">Retrieving records...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-24">
                                            <div className="flex flex-col items-center gap-2 text-[#8fa2a2]">
                                                <Search size={32} strokeWidth={1} className="mb-2 opacity-50" />
                                                <span className="text-[12px] uppercase tracking-[0.15em] font-medium">No matching records found</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/60 transition-colors duration-300 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#EFEBE9] border border-white shadow-sm flex items-center justify-center text-[#548C8C] font-bold text-[14px]">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-sans text-[15px] font-semibold text-[#3b5a5a] group-hover:text-[#548C8C] transition-colors">
                                                        {user.name}
                                                    </p>
                                                    <p className="font-sans text-[13px] text-[#8fa2a2] mt-0.5 font-medium">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {user.role === 'ADMIN' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3b5a5a] text-white text-[9px] uppercase tracking-[0.15em] font-bold shadow-sm">
                                                    <ShieldCheck size={10} strokeWidth={2.5} /> Curator
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1.5 rounded-full bg-[#8fa2a2]/15 text-[#8fa2a2] text-[9px] uppercase tracking-[0.15em] font-bold">
                                                    Member
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="font-sans text-[14px] text-[#548C8C] font-medium">
                                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-bold
                                                ${user.blocked ? 'text-red-500' : 'text-[#548C8C]'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.blocked ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-[#548C8C] shadow-[0_0_8px_rgba(84,140,140,0.5)]'}`}></span>
                                                {user.blocked ? 'Suspended' : 'Operational'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {user.role !== 'ADMIN' && (
                                                <button
                                                    onClick={() => setConfirmModal({
                                                        id: user.id,
                                                        name: user.name,
                                                        blocked: user.blocked
                                                    })}
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-[0.15em] border transition-all duration-300 ml-auto
                                                        ${user.blocked
                                                            ? 'bg-white/50 text-[#548C8C] border-[#548C8C]/20 hover:bg-[#548C8C] hover:text-white hover:border-[#548C8C] hover:shadow-sm'
                                                            : 'bg-white/50 text-[#8fa2a2] border-[#8fa2a2]/20 hover:bg-white hover:text-red-500 hover:border-red-500/30 hover:shadow-sm'
                                                        }`}>
                                                    {user.blocked
                                                        ? <><ShieldCheck size={12} strokeWidth={2} /> Restore Access</>
                                                        : <><ShieldOff size={12} strokeWidth={2} /> Suspend</>
                                                    }
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-8 py-5 border-t border-[#548C8C]/10 bg-white/40">
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#8fa2a2] font-semibold">
                                    Page {page + 1} of {totalPages}
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setPage(p => p - 1)}
                                        disabled={page === 0}
                                        className="w-8 h-8 rounded-full flex items-center justify-center border border-[#8fa2a2]/30 text-[#8fa2a2] hover:text-[#548C8C] hover:border-[#548C8C] hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white/50">
                                        <ChevronLeft size={16} strokeWidth={2} />
                                    </button>
                                    <button
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={page >= totalPages - 1}
                                        className="w-8 h-8 rounded-full flex items-center justify-center border border-[#8fa2a2]/30 text-[#8fa2a2] hover:text-[#548C8C] hover:border-[#548C8C] hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white/50">
                                        <ChevronRight size={16} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirm Block/Unblock Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-[#f7f6f4]/90 backdrop-blur-md flex items-center justify-center z-50 px-4 py-12">
                    <div className="glass-panel rounded-2xl w-full max-w-sm shadow-[0_20px_60px_rgba(84,140,140,0.12)] relative animate-cinematic border border-white/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/80 ${confirmModal.blocked ? 'bg-[#548C8C]' : 'bg-red-500'}`}>
                                {confirmModal.blocked
                                    ? <ShieldCheck size={20} className="text-white" strokeWidth={2} />
                                    : <ShieldOff size={20} className="text-white" strokeWidth={2} />
                                }
                            </div>
                            <button onClick={() => setConfirmModal(null)} className="text-[#8fa2a2] hover:text-[#3b5a5a] transition-all hover:rotate-90 duration-500 p-2 bg-white/50 rounded-full">
                                <X size={16} strokeWidth={2} />
                            </button>
                        </div>

                        <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8fa2a2] mb-1 font-bold block">Authorization Change</span>
                            <h3 className="text-editorial text-[24px] text-[#3b5a5a] font-light tracking-tight leading-none mb-1">
                                {confirmModal.blocked ? 'Restore Access' : 'Suspend Patron'}
                            </h3>
                            <p className="font-sans text-[14px] text-[#548C8C] font-semibold mb-5">
                                {confirmModal.name}
                            </p>
                            <p className="text-[13px] text-[#8fa2a2] font-medium leading-relaxed mb-8 bg-white/30 p-4 rounded-xl border border-white/50">
                                {confirmModal.blocked
                                    ? 'Restoring access will immediately allow this patron to log in and resume standard platform activities.'
                                    : 'Suspending this patron will instantly revoke their session and block all future attempts to authenticate.'
                                }
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setConfirmModal(null)}
                                className="flex-1 py-3.5 rounded-full border border-[#8fa2a2]/30 text-[#8fa2a2] text-[10px] font-bold tracking-[0.2em] uppercase bg-white/20 hover:bg-white hover:text-[#548C8C] transition-all">
                                Cancel
                            </button>
                            <button onClick={handleToggleBlock} disabled={isToggling}
                                className={`flex-1 py-3.5 rounded-full text-white text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm border border-transparent transition-all hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2
                                    ${confirmModal.blocked ? 'bg-[#548C8C] hover:bg-[#3b5a5a] hover:shadow-[0_10px_20px_rgba(84,140,140,0.2)]' : 'bg-red-500 hover:bg-red-600 hover:shadow-[0_10px_20px_rgba(239,68,68,0.2)]'}
                                    disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed`}>
                                {isToggling ? <Loader size={14} className="animate-spin" /> : confirmModal.blocked ? 'Confirm Restore' : 'Confirm Suspend'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
