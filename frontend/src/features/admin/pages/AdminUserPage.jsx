import { useState } from 'react'
import {
    Search, X, ShieldOff, ShieldCheck,
    ChevronLeft, ChevronRight, Loader,
    Eye, Pencil, Trash2, Users, UserCheck,
    UserX, UserPlus, Filter
} from 'lucide-react'
import { useToggleBlock, useAdminUsers } from '../hooks/useAdminUser'
import AdminSidebar from '../components/AdminSideBar'
import AdminTopBar from '../components/AdminTopBar'

const STAT_CARDS = (total, active, blocked) => [
    { label: 'Total Customers', value: total, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Customers', value: active, icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Blocked Accounts', value: blocked, icon: UserX, color: 'bg-red-50 text-red-500' },
    { label: 'New Registrations', value: 128, sub: 'This Week', icon: UserPlus, color: 'bg-purple-50 text-purple-600' },
]

export default function AdminUsersPage() {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(0)
    const [confirmModal, setConfirmModal] = useState(null)
    const SIZE = 10

    const { data, isLoading } = useAdminUsers({ search, page, size: SIZE })
    const { mutate: toggleBlock, isPending: isToggling } = useToggleBlock()

    const users = data?.content || []
    const totalPages = data?.totalPages || 0
    const totalElements = data?.totalElements || 0
    const activeCount = users.filter(u => !u.blocked).length
    const blockedCount = users.filter(u => u.blocked).length

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
        <div className="flex min-h-screen bg-[#f5f5f0]">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopBar />

                <div className="flex-1 p-8 overflow-y-auto">

                    {/* Page header */}
                    <div className="mb-6">
                        <h1 className="font-heading text-2xl font-bold text-heading">
                            Customer Management
                        </h1>
                        <p className="font-body text-sm text-gray-500 mt-1">
                            View, monitor, and manage bookstore customers.
                        </p>
                    </div>

                    {/* Search + Filters bar */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5
                                    flex items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <input
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="Search customers by name or email"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200
                                           bg-gray-50 font-body text-sm text-heading placeholder-gray-400
                                           focus:outline-none focus:ring-2 focus:ring-primary
                                           transition-all duration-200"
                            />
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            {searchInput && (
                                <button type="button" onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                                               hover:text-heading transition-colors">
                                    <X size={15} />
                                </button>
                            )}
                        </form>

                        {/* Filter dropdowns */}
                        {['Account Status', 'Order Activity', 'Registration Date'].map(f => (
                            <button key={f}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200
                                           bg-white font-body text-sm text-gray-600 hover:border-primary
                                           hover:text-primary transition-all duration-200 whitespace-nowrap">
                                <Filter size={13} />
                                {f}
                                <ChevronRight size={13} className="rotate-90" />
                            </button>
                        ))}
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {STAT_CARDS(totalElements, totalElements - blockedCount, blockedCount).map((stat, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <p className="font-body text-xs text-gray-500">{stat.label}</p>
                                </div>
                                <p className="font-heading text-2xl font-bold text-heading">{stat.value}</p>
                                {stat.sub && (
                                    <p className="font-body text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    {['Customer ID', 'Name', 'Email', 'Total Orders', 'Total Spent', 'Account Status', 'Joined Date', 'Actions'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 font-body text-xs
                                                               font-semibold text-gray-400 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16">
                                            <Loader size={24} className="animate-spin text-primary mx-auto" />
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 font-body text-sm text-gray-400">
                                            No customers found
                                        </td>
                                    </tr>
                                ) : users.map((user, idx) => (
                                    <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                                        {/* Customer ID */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm text-[#548C8C] font-medium">
                                                CUS-{String(1040 + idx + page * SIZE).padStart(4, '0')}
                                            </span>
                                        </td>
                                        {/* Name */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm font-semibold text-[#548C8C]
                                                             hover:underline cursor-pointer">
                                                {user.name}
                                            </span>
                                        </td>
                                        {/* Email */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm text-gray-500">{user.email}</span>
                                        </td>
                                        {/* Total Orders — static for now */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm text-heading">—</span>
                                        </td>
                                        {/* Total Spent — static for now */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm text-heading">—</span>
                                        </td>
                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span className={`font-body text-xs px-2.5 py-1 rounded-full font-medium
                                                ${user.blocked
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {user.blocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        {/* Joined */}
                                        <td className="px-5 py-4">
                                            <span className="font-body text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400
                                                                   hover:text-[#548C8C] transition-colors">
                                                    <Eye size={15} />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400
                                                                   hover:text-gray-600 transition-colors">
                                                    <Pencil size={15} />
                                                </button>
                                                {user.role !== 'ADMIN' && (
                                                    <button
                                                        onClick={() => setConfirmModal({
                                                            id: user.id,
                                                            name: user.name,
                                                            blocked: user.blocked
                                                        })}
                                                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400
                                                                   hover:text-red-500 transition-colors">
                                                        <Trash2 size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                                <p className="font-body text-sm text-gray-400">
                                    Page {page + 1} of {totalPages}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
                                        className="p-2 rounded-lg border border-gray-200 text-gray-400
                                                   hover:border-primary hover:text-primary transition-all
                                                   disabled:opacity-40 disabled:cursor-not-allowed">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
                                        className="p-2 rounded-lg border border-gray-200 text-gray-400
                                                   hover:border-primary hover:text-primary transition-all
                                                   disabled:opacity-40 disabled:cursor-not-allowed">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirm Block/Unblock Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center
                                justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                ${confirmModal.blocked ? 'bg-green-50' : 'bg-red-50'}`}>
                                {confirmModal.blocked
                                    ? <ShieldCheck size={18} className="text-green-600" />
                                    : <ShieldOff size={18} className="text-red-500" />
                                }
                            </div>
                            <div>
                                <h3 className="font-heading text-base font-bold text-heading">
                                    {confirmModal.blocked ? 'Unblock User' : 'Block User'}
                                </h3>
                                <p className="font-body text-xs text-gray-400">{confirmModal.name}</p>
                            </div>
                        </div>
                        <p className="font-body text-sm text-gray-500 mb-6">
                            {confirmModal.blocked
                                ? 'This user will be able to log in and use the platform again.'
                                : 'This user will be immediately logged out and unable to access the platform.'
                            }
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmModal(null)}
                                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200
                                           font-button text-sm font-medium text-heading
                                           hover:border-primary hover:text-primary transition-all">
                                Cancel
                            </button>
                            <button onClick={handleToggleBlock} disabled={isToggling}
                                className={`flex-1 py-2.5 rounded-xl font-button text-sm font-semibold
                                            text-white transition-all disabled:opacity-60 active:scale-95
                                            ${confirmModal.blocked
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-500 hover:bg-red-600'
                                    }`}>
                                {isToggling ? 'Processing...' : confirmModal.blocked ? 'Unblock' : 'Block'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
