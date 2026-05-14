import { Users, Search, Check, X, Ban, Eye } from 'lucide-react'
import { useToggleBlock, useAdminUsers } from '../hooks/useAdminUser'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const STAT_CARDS = (total, active, blocked) => [
    { label: 'Total Users', value: total, icon: Users, color: 'text-blue' },
    { label: 'Active Users', value: active, icon: Check, color: 'text-green' },
    { label: 'Blocked Users', value: blocked, icon: Ban, color: 'text-red' },
]

function AdminUserPage() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { mutate: toggleBlock } = useToggleBlock()
    const { data: users } = useAdminUsers({ search: debouncedSearch, role: '', page: 0, size: 10 })
    
    const stats = STAT_CARDS(
        users?.totalElements || 0,
        users?.content?.filter(u => !u.blocked).length || 0,
        users?.content?.filter(u => u.blocked).length || 0
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    },[search])

    const handleToggleBlock = (userId) => {
        toggleBlock(userId, {
            onError: (error) => {
                if (error.isAuthError) {
                    alert('Your session has expired. Please log in again.');
                    window.location.href = '/login';
                } else {
                    alert(error.response?.data?.message || 'Failed to update user status. Please try again.');
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-paper font-ui selection:bg-gold/20">
            <main className="section-container py-16">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-gold" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Membership Directory</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-7xl font-bold text-ink tracking-tighter mb-4">
                        User <span className="italic font-heading">Registry</span>
                    </h1>
                    <p className="text-ink/30 text-lg">Manage and monitor your community of bibliophiles.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, ease: [0.19, 1, 0.22, 1], duration: 1 }}
                            className="editorial-card group"
                        >
                            <div className="flex items-center gap-8">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110 ${
                                    stat.color === 'text-blue' ? 'bg-ink text-white shadow-xl shadow-ink/20' : 
                                    stat.color === 'text-green' ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-velvet/10 text-velvet border border-velvet/20'
                                }`}>
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20 mb-2">{stat.label}</p>
                                    <p className="text-4xl font-bold text-ink tracking-tighter">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="editorial-card !p-0 overflow-hidden border border-ink/[0.03]">
                    <div className="p-10 border-b border-ink/[0.05] flex items-center justify-between bg-white/50 backdrop-blur-md">
                        <div className="relative group max-w-xl w-full">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors duration-500" size={20} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="SEARCH ARCHIVAL RECORDS..."
                                className="w-full pl-10 pr-6 py-4 bg-transparent font-ui text-[11px] uppercase tracking-[0.3em] font-bold text-ink outline-none border-b border-ink/5 focus:border-gold transition-all duration-700"
                            />
                            {search && (
                                <X 
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/20 hover:text-velvet cursor-pointer transition-colors" 
                                    size={18} 
                                    onClick={() => setSearch('')} 
                                />
                            )}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-ink/20 italic">
                            * Real-time metrics based on current view
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-ink/[0.02]">
                                    <th className="text-left py-8 px-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Member Profile</th>
                                    <th className="text-left py-8 px-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Identity</th>
                                    <th className="text-left py-8 px-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Clearance</th>
                                    <th className="text-left py-8 px-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Standing</th>
                                    <th className="text-right py-8 px-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Management</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ink/[0.05]">
                                {users?.content?.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
                                        className="hover:bg-ink/[0.01] transition-all duration-500 group"
                                    >
                                        <td className="py-8 px-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center font-heading text-xl font-bold shadow-2xl shadow-ink/20 group-hover:scale-110 transition-transform duration-700">
                                                    {user.name?.charAt(0)}
                                                </div>
                                                <span className="text-xl font-bold text-ink group-hover:text-gold transition-colors duration-500">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 px-10">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40">{user.email}</p>
                                        </td>
                                        <td className="py-8 px-10">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] border ${
                                                user.role === 'ADMIN' ? 'border-gold text-gold bg-gold/5' : 'border-ink/10 text-ink/30'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-8 px-10">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${user.blocked ? 'bg-velvet shadow-[0_0_10px_rgba(142,45,45,0.5)] animate-pulse' : 'bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]'}`} />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60">
                                                    {user.blocked ? 'Restricted' : 'Active'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-8 px-10 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="p-4 rounded-full text-ink/40 hover:bg-ink/5 hover:text-gold transition-all duration-700"
                                                    title="View Details"
                                                >
                                                    <Eye size={22} />
                                                </button>
                                                {user.role !== 'ADMIN' ? (
                                                    <button
                                                        onClick={() => handleToggleBlock(user.id)}
                                                        className={`p-4 rounded-full transition-all duration-700 ${
                                                            user.blocked ? 'text-gold hover:bg-gold/10' : 'text-velvet hover:bg-velvet/10'
                                                        }`}
                                                        title={user.blocked ? 'Unblock User' : 'Block User'}
                                                    >
                                                        {user.blocked ? <Check size={22} /> : <Ban size={22} />}
                                                    </button>
                                                ) : (
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ink/20 italic px-4">
                                                        Protected
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* User Details Modal */}
                <AnimatePresence>
                    {selectedUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-ink/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
                            onClick={() => setSelectedUser(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                className="editorial-card max-w-3xl w-full bg-paper !p-16"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-[1px] w-8 bg-gold" />
                                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Member Dossier</span>
                                </div>
                                
                                <div className="flex items-center gap-8 mb-12">
                                    <div className="w-24 h-24 rounded-full bg-ink text-white flex items-center justify-center font-heading text-4xl font-bold shadow-2xl shadow-ink/20">
                                        {selectedUser.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-5xl font-bold text-ink mb-2 tracking-tighter">{selectedUser.name}</h3>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] border ${
                                                selectedUser.role === 'ADMIN' ? 'border-gold text-gold bg-gold/5' : 'border-ink/10 text-ink/30'
                                            }`}>
                                                {selectedUser.role}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${selectedUser.blocked ? 'bg-velvet shadow-[0_0_10px_rgba(142,45,45,0.5)]' : 'bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]'}`} />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60">
                                                    {selectedUser.blocked ? 'Restricted' : 'Active'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 mb-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Email Address</label>
                                            <p className="text-lg font-body text-ink">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Contact Number</label>
                                            <p className="text-lg font-body text-ink">{selectedUser.phone || 'Not provided'}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Authentication Method</label>
                                            <p className="text-lg font-body text-ink">{selectedUser.provider || 'LOCAL'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Account Status</label>
                                            <p className="text-lg font-body text-ink">{selectedUser.enabled ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 border-t border-ink/[0.05]">
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="px-16 py-5 bg-ink text-white font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-gold shadow-2xl shadow-ink/20 transition-all duration-700"
                                    >
                                        Close Registry
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}


export default AdminUserPage
