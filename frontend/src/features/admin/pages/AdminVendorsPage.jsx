import { Store, Clock, CheckCheck, X, Eye } from 'lucide-react'
import { useVendorApplications, useApproveVendor, useRejectVendor } from '../hooks/useVendors'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function AdminVendorsPage() {
    const { data: applications } = useVendorApplications()
    const { mutate: approveVendor } = useApproveVendor()
    const { mutate: rejectVendor } = useRejectVendor()

    const [showRejectModal, setShowRejectModal] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState(null)
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [rejectReason, setRejectReason] = useState('')
    const [expandedAppId, setExpandedAppId] = useState(null)

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
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Curation Management</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-7xl font-bold text-ink tracking-tighter mb-4">
                        Vendor <span className="italic font-heading">Curations</span>
                    </h1>
                    <p className="text-ink/30 text-lg">Review and manage prestigious literary partnerships.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.19, 1, 0.22, 1], duration: 1 }} className="editorial-card group">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-2xl shadow-ink/20">
                                <Store size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20 mb-2">Total Submissions</p>
                                <p className="text-4xl font-bold text-ink tracking-tighter">{applications?.length || 0}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: [0.19, 1, 0.22, 1], duration: 1 }} className="editorial-card group">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-full bg-gold/10 text-gold border border-gold/20 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                                <Clock size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20 mb-2">Pending Review</p>
                                <p className="text-4xl font-bold text-ink tracking-tighter">{applications?.filter(a => a.status === 'PENDING').length || 0}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: [0.19, 1, 0.22, 1], duration: 1 }} className="editorial-card group">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-full bg-gold text-white flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-2xl shadow-gold/20">
                                <CheckCheck size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20 mb-2">Approved Partners</p>
                                <p className="text-4xl font-bold text-ink tracking-tighter">{applications?.filter(a => a.status === 'APPROVED').length || 0}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="editorial-card !p-0 overflow-hidden border border-ink/[0.03]">
                    <div className="p-10 border-b border-ink/[0.05] flex items-center justify-between bg-white/50 backdrop-blur-md">
                        <div className="flex items-center gap-10">
                            <span className="text-[10px] text-ink/20 uppercase tracking-[0.4em] font-bold italic">Curational Status:</span>
                            <div className="flex gap-4">
                                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                                            statusFilter === status ? 'bg-ink text-white shadow-xl shadow-ink/20' : 'bg-ink/[0.03] text-ink/30 hover:bg-ink/10'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-ink/[0.05]">
                        {applications
                            ?.filter((app) => statusFilter === 'ALL' || app.status === statusFilter)
                            .map((app, index) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
                                    className="p-10 hover:bg-ink/[0.01] transition-all duration-500 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-10">
                                            <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center font-heading text-2xl font-bold shadow-2xl shadow-ink/10 group-hover:scale-110 transition-transform duration-700">
                                                {app.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-ink group-hover:text-gold transition-colors duration-500">{app.name}</h3>
                                                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40 mt-1">{app.email}</p>
                                                <div className="flex items-center gap-6 mt-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] border ${
                                                        app.status === 'PENDING' ? 'border-gold text-gold bg-gold/5' : 
                                                        app.status === 'APPROVED' ? 'border-ink/20 text-ink bg-ink/5' : 'border-velvet/20 text-velvet bg-velvet/5'
                                                    }`}>
                                                        {app.status}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-ink/10" />
                                                        <span className="text-[9px] text-ink/20 uppercase tracking-[0.3em] font-bold italic">
                                                            Received {new Date(app?.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {app.status === 'PENDING' && (
                                                <div className="flex items-center gap-4 bg-ink/[0.02] p-2 rounded-full border border-ink/[0.05]">
                                                    <button
                                                        onClick={() => approveVendor(app.id)}
                                                        className="w-12 h-12 rounded-full bg-white text-gold border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-500 shadow-xl shadow-ink/5"
                                                        title="Approve Partner"
                                                    >
                                                        <CheckCheck size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedApplication(app)
                                                            setShowRejectModal(true)
                                                        }}
                                                        className="w-12 h-12 rounded-full bg-white text-velvet border border-velvet/20 flex items-center justify-center hover:bg-velvet hover:text-white transition-all duration-500 shadow-xl shadow-ink/5"
                                                        title="Reject Application"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => setExpandedAppId(expandedAppId === app.id ? null : app.id)}
                                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${expandedAppId === app.id ? 'bg-ink text-white shadow-2xl shadow-ink/20' : 'text-ink/20 hover:bg-ink/5 hover:text-ink'}`}
                                            >
                                                <Eye size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedAppId === app.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                                className="mt-12 pt-12 border-t border-ink/[0.05] overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] text-ink/20 uppercase tracking-[0.4em] font-bold">Business Identity</p>
                                                        <p className="text-xl font-bold text-ink">{app.businessName}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] text-ink/20 uppercase tracking-[0.4em] font-bold">Primary Contact</p>
                                                        <p className="text-sm font-bold text-ink/60">{app.phone}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] text-ink/20 uppercase tracking-[0.4em] font-bold">Established</p>
                                                        <p className="text-sm font-bold text-ink/60">{app.publishingSince || 'N/A'}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] text-ink/20 uppercase tracking-[0.4em] font-bold">Curation Dept</p>
                                                        <p className="text-sm font-bold text-ink/60">{app.category}</p>
                                                    </div>
                                                    <div className="col-span-1 md:col-span-4 bg-ink/[0.02] p-10 rounded-sm border border-ink/[0.05]">
                                                        <p className="text-[9px] text-ink/20 uppercase tracking-[0.4em] font-bold mb-6">Vision & Mission</p>
                                                        <p className="font-heading text-2xl text-ink/70 leading-relaxed italic text-pretty">"{app.businessDescription}"</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {showRejectModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-ink/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 30 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            className="editorial-card max-w-2xl w-full bg-paper !p-16"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-[1px] w-8 bg-velvet" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-velvet">Declination Notice</span>
                            </div>
                            <h3 className="text-5xl font-bold text-ink mb-6 tracking-tighter">Reject Application</h3>
                            <p className="text-ink/40 text-lg mb-12 leading-relaxed">Please provide a professional rationale for declining this partnership. This communication will be shared with the applicant.</p>
                            
                            <textarea
                                className="w-full bg-white border border-ink/[0.05] p-8 text-ink font-body text-lg mb-12 focus:border-gold outline-none min-h-[160px] transition-all duration-700 shadow-inner rounded-sm"
                                placeholder="EXPLAIN THE RATIONALE FOR DECLINATION..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                            
                            <div className="flex gap-8 justify-end">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 hover:text-ink transition-colors duration-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedApplication && rejectReason.trim()) {
                                            rejectVendor({ id: selectedApplication.id, reason: rejectReason })
                                            setShowRejectModal(false)
                                            setRejectReason('')
                                        }
                                    }}
                                    className="px-12 py-5 bg-ink text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-velvet transition-all duration-700 shadow-2xl shadow-ink/20"
                                >
                                    Confirm Rejection
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
