import { useState } from 'react'
import {
    Search, CheckCircle, XCircle, Eye,
    ChevronLeft, ChevronRight, Loader,
    Store, Clock, CheckCheck, X
} from 'lucide-react'
import AdminSidebar from '../components/AdminSideBar'
import AdminTopBar from '../components/AdminTopBar'
import { useVendorApplications, useApproveVendor, useRejectVendor } from '../hooks/useVendors'
import { motion, AnimatePresence } from 'framer-motion'

const STATUS_TABS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED']

const statusStyle = {
    PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
    APPROVED: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    REJECTED: 'bg-burgundy/5 text-burgundy border-burgundy/10',
}

export default function AdminVendorsPage() {
    const [activeTab, setActiveTab] = useState('ALL')
    const [search, setSearch] = useState('')
    const [viewModal, setViewModal] = useState(null)
    const [approveModal, setApproveModal] = useState(null)
    const [rejectModal, setRejectModal] = useState(null)
    const [rejectReason, setRejectReason] = useState('')

    const { data: applications = [], isLoading } = useVendorApplications(
        activeTab === 'PENDING' ? 'PENDING' : ''
    )
    const { mutate: approve, isPending: isApproving } = useApproveVendor()
    const { mutate: reject, isPending: isRejecting } = useRejectVendor()

    const filtered = applications.filter((app) => {
        const matchesTab = activeTab === 'ALL' || app.status === activeTab
        const matchesSearch =
            !search ||
            app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.email.toLowerCase().includes(search.toLowerCase()) ||
            app.businessName.toLowerCase().includes(search.toLowerCase())
        return matchesTab && matchesSearch
    })

    const counts = {
        ALL: applications.length,
        PENDING: applications.filter((a) => a.status === 'PENDING').length,
        APPROVED: applications.filter((a) => a.status === 'APPROVED').length,
        REJECTED: applications.filter((a) => a.status === 'REJECTED').length,
    }

    const handleApprove = () => {
        approve(approveModal.id, {
            onSuccess: () => setApproveModal(null),
        })
    }

    const handleReject = () => {
        if (!rejectReason.trim()) return
        reject(
            { id: rejectModal.id, reason: rejectReason },
            {
                onSuccess: () => {
                    setRejectModal(null)
                    setRejectReason('')
                },
            }
        )
    }

    return (
        <div className="flex min-h-screen bg-paper">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopBar />

                <div className="flex-1 p-8 overflow-y-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-1 h-1 rounded-full bg-burgundy animate-pulse" />
                             <span className="font-ui text-[10px] font-bold uppercase tracking-[0.4em] text-shelf/40">Network Management</span>
                        </div>
                        <h1 className="font-heading text-4xl font-bold text-shelf">
                            Vendor Registry
                        </h1>
                        <p className="font-body text-sm text-shelf/40 mt-1 max-w-lg">
                            Oversee and moderate applications from book curators and stores joining the network.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: 'Total App', value: counts.ALL, icon: Store, color: 'bg-shelf text-paper' },
                            { label: 'Pending', value: counts.PENDING, icon: Clock, color: 'bg-amber-100 text-amber-700' },
                            { label: 'Approved', value: counts.APPROVED, icon: CheckCheck, color: 'bg-emerald-100 text-emerald-700' },
                            { label: 'Rejected', value: counts.REJECTED, icon: XCircle, color: 'bg-burgundy text-paper' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-soft border border-shelf/5 hover:border-burgundy/10 transition-all group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${stat.color}`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-ui text-[9px] font-bold uppercase tracking-widest text-shelf/30">{stat.label}</p>
                                        <p className="font-heading text-2xl font-bold text-shelf">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter + Search */}
                    <div className="bg-white rounded-2xl shadow-soft border border-shelf/5 overflow-hidden">

                        {/* Tabs */}
                        <div className="flex items-center justify-between px-8 pt-6 pb-0 border-b border-shelf/5">
                            <div className="flex gap-6">
                                {STATUS_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-[10px] font-ui font-bold uppercase tracking-[0.2em] transition-all relative ${
                                            activeTab === tab
                                                ? 'text-burgundy'
                                                : 'text-shelf/30 hover:text-shelf'
                                        }`}
                                    >
                                        {tab}
                                        <span className={`ml-2 text-[9px] px-1.5 py-0.5 rounded-full ${
                                            activeTab === tab ? 'bg-burgundy/10 text-burgundy' : 'bg-shelf/5 text-shelf/30'
                                        }`}>
                                            {counts[tab]}
                                        </span>
                                        {activeTab === tab && (
                                            <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-shelf/20" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="pl-10 pr-6 py-2.5 rounded-full border border-shelf/5 bg-shelf/[0.02] text-[10px] font-ui uppercase tracking-widest text-shelf placeholder:text-shelf/20 focus:outline-none focus:border-burgundy/20 focus:bg-white transition-all w-64"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-shelf/[0.01] border-b border-shelf/5">
                                        {['Vendor info', 'Category', 'Registration', 'Date', 'Status', 'Actions'].map((h) => (
                                            <th key={h} className="text-left px-8 py-5 text-[9px] font-ui font-bold text-shelf/30 uppercase tracking-[0.3em]">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-shelf/5">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-20">
                                                <Loader size={24} className="animate-spin text-burgundy mx-auto" />
                                            </td>
                                        </tr>
                                    ) : filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-20 font-ui text-[10px] font-bold uppercase tracking-widest text-shelf/20">
                                                No curators found
                                            </td>
                                        </tr>
                                    ) : filtered.map((app) => (
                                        <tr key={app.id} className="hover:bg-shelf/[0.01] transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="font-heading text-sm font-bold text-shelf group-hover:text-burgundy transition-colors">{app.businessName}</p>
                                                <p className="font-body text-[10px] text-shelf/40 mt-1">{app.email}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-shelf/5 text-shelf/60 text-[9px] font-ui font-bold uppercase tracking-widest rounded-full">
                                                    {app.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-ui text-[9px] font-bold text-shelf/40 uppercase tracking-widest">{app.businessRegistrationNumber}</p>
                                                <a href={app.website} target="_blank" className="font-body text-[10px] text-burgundy hover:underline mt-1 block">Visit Site</a>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-ui text-[10px] font-bold text-shelf/30 uppercase tracking-widest">
                                                    {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 text-[9px] font-ui font-bold uppercase tracking-widest rounded-full border ${statusStyle[app.status]}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setViewModal(app)}
                                                        className="p-2.5 rounded-full hover:bg-shelf hover:text-white text-shelf/20 transition-all border border-transparent hover:shadow-lg"
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    {app.status === 'PENDING' && (
                                                        <>
                                                            <button
                                                                onClick={() => setApproveModal(app)}
                                                                className="p-2.5 rounded-full hover:bg-emerald-600 hover:text-white text-shelf/20 transition-all border border-transparent hover:shadow-lg"
                                                            >
                                                                <CheckCircle size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => setRejectModal(app)}
                                                                className="p-2.5 rounded-full hover:bg-burgundy hover:text-white text-shelf/20 transition-all border border-transparent hover:shadow-lg"
                                                            >
                                                                <XCircle size={14} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Details Modal */}
            <AnimatePresence>
                {viewModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewModal(null)} className="absolute inset-0 bg-shelf/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-lg bg-white rounded-sm shadow-2xl relative z-10 overflow-hidden">
                            <div className="h-1.5 w-full bg-burgundy" />
                            <div className="p-10">
                                <h3 className="font-heading text-2xl font-bold text-shelf mb-8 border-b border-shelf/5 pb-4">Curator Profile</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Vendor Name', value: viewModal.businessName },
                                        { label: 'Representative', value: viewModal.name },
                                        { label: 'Contact', value: viewModal.email },
                                        { label: 'Phone', value: viewModal.phone },
                                        { label: 'Registration', value: viewModal.businessRegistrationNumber },
                                        { label: 'Category', value: viewModal.category },
                                        { label: 'Since', value: viewModal.publishingSince },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex border-b border-shelf/[0.03] pb-4">
                                            <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-shelf/30 w-32 shrink-0">{label}</span>
                                            <span className="font-body text-sm text-shelf font-semibold">{value}</span>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-shelf/30 block mb-2">Description</span>
                                        <p className="font-body text-sm text-shelf/60 leading-relaxed italic">"{viewModal.businessDescription}"</p>
                                    </div>
                                </div>
                                <button onClick={() => setViewModal(null)} className="w-full mt-10 py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-burgundy transition-all">Close Entry</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Approve Modal */}
                {approveModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setApproveModal(null)} className="absolute inset-0 bg-shelf/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-sm bg-white rounded-sm shadow-2xl relative z-10 p-10 text-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCheck className="text-emerald-600" size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-shelf mb-4">Confirm Partner</h3>
                            <p className="font-body text-sm text-shelf/50 mb-8">Granting access will allow <span className="font-bold text-shelf">{approveModal.businessName}</span> to list collections on the network.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setApproveModal(null)} className="flex-1 py-4 border border-shelf/10 font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-shelf/5 transition-all text-shelf/40">Cancel</button>
                                <button onClick={handleApprove} disabled={isApproving} className="flex-1 py-4 bg-emerald-600 text-white font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-700 transition-all shadow-lg active:scale-95 disabled:opacity-50">Approve</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Reject Modal */}
                {rejectModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRejectModal(null)} className="absolute inset-0 bg-shelf/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-sm bg-white rounded-sm shadow-2xl relative z-10 p-10 text-center">
                            <div className="w-16 h-16 bg-burgundy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-burgundy">
                                <X size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-shelf mb-4">Deny Access</h3>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="State reason for rejection..."
                                className="w-full p-4 bg-shelf/[0.02] border border-shelf/10 rounded-sm mb-6 font-body text-sm outline-none focus:border-burgundy h-32 resize-none"
                            />
                            <div className="flex gap-4">
                                <button onClick={() => setRejectModal(null)} className="flex-1 py-4 border border-shelf/10 font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-shelf/5 transition-all text-shelf/40">Cancel</button>
                                <button onClick={handleReject} disabled={isRejecting || !rejectReason.trim()} className="flex-1 py-4 bg-burgundy text-white font-ui font-bold uppercase tracking-widest text-[10px] hover:bg-shelf transition-all shadow-lg active:scale-95 disabled:opacity-50">Confirm</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
