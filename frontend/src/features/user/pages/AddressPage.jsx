import { useState } from 'react'
import { Plus, MapPin } from 'lucide-react'
import ProfileSidebar from '../components/ProfileSidebar'
import AddressCard from '../components/AddressCard'
import AddressFormModal from '../components/AddressFormModal'
import { useAddresses } from '../hooks/useAddresses'
import { useDeleteAddress } from '../hooks/useDeleteAddress'
import { useSetDefaultAddress } from '../hooks/useSetDefaultAddress'

export default function AddressPage() {
    const { data: addresses = [], isLoading } = useAddresses()
    const { mutate: deleteAddress } = useDeleteAddress()
    const { mutate: setDefault } = useSetDefaultAddress()

    const [showModal, setShowModal] = useState(false)
    const [editingAddress, setEditingAddress] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    const handleEdit = (address) => {
        setEditingAddress(address)
        setShowModal(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Delete this address?')) {
            deleteAddress(id)
        }
    }

    const handleSetDefault = (address) => {
        setDefault({ id: address.id, address })
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingAddress(null)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="h-16 bg-white border-b border-accent shadow-sm" />

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

                <ProfileSidebar />

                <div className="flex-1 min-w-0">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="font-heading text-2xl font-bold text-heading">
                                Your Addresses
                            </h1>
                            <p className="font-body text-sm text-heading-muted mt-1">
                                Manage the addresses used for book deliveries.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                                       bg-primary text-white font-button text-sm font-medium
                                       shadow-sm hover:bg-primary-dark active:scale-95
                                       transition-all duration-200">
                            <Plus size={16} />
                            Add New Address
                        </button>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Empty state */}
                    {!isLoading && addresses.length === 0 && (
                        <div className="text-center py-20">
                            <MapPin size={40} className="text-accent mx-auto mb-4" />
                            <h3 className="font-heading text-lg font-semibold text-heading mb-2">
                                No addresses yet
                            </h3>
                            <p className="font-body text-sm text-heading-muted mb-6">
                                Add your first delivery address to get started.
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2.5 rounded-xl bg-primary text-white
                                           font-button text-sm font-medium hover:bg-primary-dark
                                           transition-all duration-200">
                                Add Address
                            </button>
                        </div>
                    )}

                    {/* Address grid */}
                    {!isLoading && addresses.length > 0 && (
                        <div className="grid grid-cols-2 gap-6">
                            {addresses.map(address => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onSetDefault={handleSetDefault}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <AddressFormModal
                    address={editingAddress}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}