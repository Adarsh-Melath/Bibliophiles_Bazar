import { useState } from 'react'
import {
    Search, CheckCircle, XCircle, Eye,
    ChevronLeft, ChevronRight, Loader,
    Store, Clock, CheckCheck, X
} from 'lucide-react'
import AdminSidebar from '../components/AdminSideBar'
import AdminTopBar from '../components/AdminTopBar'
import { useVendorApplications, useApproveVendor, useRejectVendor } from '../hooks/useVendors'

const STATUS_TABS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED']

const statusStyle = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    APPROVED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-600 border-red-200',
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

    // Client-side filter for search + tab (when not using PENDING endpoint)
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
        <div className="flex min-h-screen bg-[#f5f5f0]">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopBar />

                <div className="flex-1 p-8 overflow-y-auto">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-heading text-2xl font-bold text-heading">
                            Vendor Management
                        </h1>
                        <p className="font-body text-sm text-gray-500 mt-1">
                            Review and manage publisher applications.
                        </p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Total Applications', value: counts.ALL, icon: Store, color: 'bg-blue-50 text-blue-600' },
                            { label: 'Pending Review', value: counts.PENDING, icon: Clock, color: 'bg-amber-50 text-amber-600' },
                            { label: 'Approved', value: counts.APPROVED, icon: CheckCheck, color: 'bg-green-50 text-green-600' },
                            { label: 'Rejected', value: counts.REJECTED, icon: XCircle, color: 'bg-red-50 text-red-500' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <p className="font-body text-xs text-gray-500">{stat.label}</p>
                                </div>
                                <p className="font-heading text-2xl font-bold text-heading">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tabs + Search */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Tabs */}
                        <div className="flex items-center justify-between px-6 pt-4 pb-0 border-b border-gray-100">
                            <div className="flex gap-1">
                                {STATUS_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2.5 text-sm font-body font-medium rounded-t-lg transition-all border-b-2 ${
                                            activeTab === tab
                                                ? 'border-primary text-primary bg-primary/5'
                                                : 'border-transparent text-gray-500 hover:text-heading'
                                        }`}
                                    >
                                        {tab}
                                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                                            activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {counts[tab]}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative mb-2">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search vendors..."
                                    className="pl-8 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-body text-heading placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all w-64"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        {['Publisher', 'Contact', 'Category', 'Registration No.', 'Website', 'Applied', 'Status', 'Actions'].map((h) => (
                                            <th key={h} className="text-left px-5 py-3.5 font-body text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
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
                                    ) : filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-16 font-body text-sm text-gray-400">
                                                No applications found
                                            </td>
                                        </tr>
                                    ) : filtered.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                                            {/* Publisher */}
                                            <td className="px-5 py-4">
                                                <p className="font-body text-sm font-semibold text-heading">{app.businessName}</p>
                                                <p className="font-body text-xs text-gray-400 mt-0.5">Since {app.publishingSince}</p>
                                            </td>
                                            {/* Contact */}
                                            <td className="px-5 py-4">
                                                <p className="font-body text-sm text-heading">{app.name}</p>
                                                <p className="font-body text-xs text-gray-400">{app.email}</p>
                                            </td>
                                            {/* Category */}
                                            <td className="px-5 py-4">
                                                <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-label font-medium rounded-full">
                                                    {app.category}
                                                </span>
                                            </td>
                                            {/* Reg No */}
                                            <td className="px-5 py-4">
                                                <span className="font-body text-xs text-gray-500 font-mono">
                                                    {app.businessRegistrationNumber}
                                                </span>
                                            </td>
                                            {/* Website */}
                                            <td className="px-5 py-4">
                                                <a
                                                    href={app.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-body text-xs text-primary hover:underline truncate max-w-[120px] block"
                                                >
                                                    {app.website?.replace('https://', '')}
                                                </a>
                                            </td>
                                            {/* Applied */}
                                            <td className="px-5 py-4">
                                                <span className="font-body text-xs text-gray-500">
                                                    {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-label font-semibold rounded-full border ${statusStyle[app.status]}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        onClick={() => setViewModal(app)}
                                                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-heading transition-colors"
                                                        title="View details"
                                                    >
                                                        <Eye size={15} />
                                                    </button>
                                                    {app.status === 'PENDING' && (
                                                        <>
                                                            <button
                                                                onClick={() => setApproveModal(app)}
                                                                className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
                                                                title="Approve"
                                                            >
                                                                <CheckCircle size={15} />
                                                            </button>
                                                            <button
                                                                onClick={() => setRejectModal(app)}
                                                                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={15} />
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
            {viewModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-heading text-lg font-bold text-heading">Application Details</h3>
                            <button onClick={() => setViewModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Publishing House', value: viewModal.businessName },
                                { label: 'Contact Person', value: viewModal.name },
                                { label: 'Email', value: viewModal.email },
                                { label: 'Phone', value: viewModal.phone },
                                { label: 'Registration No.', value: viewModal.businessRegistrationNumber },
                                { label: 'Website', value: viewModal.website },
                                { label: 'Publishing Since', value: viewModal.publishingSince },
                                { label: 'Primary Category', value: viewModal.category },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex gap-4">
                                    <span className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider w-36 shrink-0 pt-0.5">{label}</span>
                                    <span className="font-body text-sm text-heading">{value}</span>
                                </div>
                            ))}

                            <div className="flex gap-4">
                                <span className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider w-36 shrink-0 pt-0.5">Description</span>
                                <p className="font-body text-sm text-heading leading-6">{viewModal.businessDescription}</p>
                            </div>

                            {viewModal.rejectionReason && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                    <p className="font-body text-xs font-semibold text-red-600 mb-1">Rejection Reason</p>
                                    <p className="font-body text-sm text-red-700">{viewModal.rejectionReason}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setViewModal(null)}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-body text-sm text-heading hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            {viewModal.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => { setViewModal(null); setApproveModal(viewModal) }}
                                        className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-body text-sm font-semibold transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => { setViewModal(null); setRejectModal(viewModal) }}
                                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-body text-sm font-semibold transition-colors"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Approve Confirmation Modal */}
            {approveModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                <CheckCircle size={20} className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-heading text-base font-bold text-heading">Approve Vendor</h3>
                                <p className="font-body text-xs text-gray-400">{approveModal.businessName}</p>
                            </div>
                        </div>
                        <p className="font-body text-sm text-gray-500 mb-6">
                            A vendor account will be created and login credentials will be sent to{' '}
                            <span className="font-semibold text-heading">{approveModal.email}</span>.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setApproveModal(null)}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-body text-sm text-heading hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={isApproving}
                                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-body text-sm font-semibold transition-colors disabled:opacity-60"
                            >
                                {isApproving ? 'Approving...' : 'Approve'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <XCircle size={20} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-heading text-base font-bold text-heading">Reject Application</h3>
                                <p className="font-body text-xs text-gray-400">{rejectModal.businessName}</p>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="block font-body text-xs font-semibold text-gray-500 mb-2">
                                Reason for rejection *
                            </label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                rows={3}
                                placeholder="e.g. Unable to verify business registration number..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-body text-heading placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setRejectModal(null); setRejectReason('') }}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-body text-sm text-heading hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isRejecting || !rejectReason.trim()}
                                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-body text-sm font-semibold transition-colors disabled:opacity-60"
                            >
                                {isRejecting ? 'Rejecting...' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
