import { useState } from 'react'
import { User, Phone, Mail, Edit } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'
import ManageProfileModal from './ManageProfileModal'

export default function PersonalInfo() {
    const { data: user, isLoading } = useProfile()
    const [showModal, setShowModal] = useState(false)

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-accent/20 rounded-lg mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-accent/20 rounded-xl"></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-heading">
                        Personal Information
                    </h1>
                    <p className="font-body text-sm text-heading-muted mt-1">
                        Manage your account details and preferences.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white
                             font-button text-sm font-medium hover:bg-primary-dark transition-all duration-200"
                >
                    <Edit size={16} />
                    Edit Profile
                </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <User size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-heading">Full Name</h3>
                            <p className="font-body text-xs text-heading-muted">Your display name</p>
                        </div>
                    </div>
                    <p className="font-body text-lg font-medium text-heading">
                        {user?.name || 'Not provided'}
                    </p>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Mail size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-heading">Email Address</h3>
                            <p className="font-body text-xs text-heading-muted">Your login email</p>
                        </div>
                    </div>
                    <p className="font-body text-lg font-medium text-heading">
                        {user?.email || 'Not provided'}
                    </p>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Phone size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-heading">Phone Number</h3>
                            <p className="font-body text-xs text-heading-muted">For order updates</p>
                        </div>
                    </div>
                    <p className="font-body text-lg font-medium text-heading">
                        {user?.phone ? `+91 ${user.phone}` : 'Not provided'}
                    </p>
                </div>

                {/* Role Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <User size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading text-sm font-semibold text-heading">Account Type</h3>
                            <p className="font-body text-xs text-heading-muted">Your account role</p>
                        </div>
                    </div>
                    <p className="font-body text-lg font-medium text-heading capitalize">
                        {user?.role || 'User'}
                    </p>
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <ManageProfileModal
                    user={user}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}