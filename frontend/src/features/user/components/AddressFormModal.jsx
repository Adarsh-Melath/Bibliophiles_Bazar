import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useAddAddress } from '../hooks/useAddAddress'
import { useUpdateAddress } from '../hooks/useUpdateAddress'

const addressSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be 10 digits'),
    addressLine: z.string().min(5, 'Address line must be at least 5 characters'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    pincode: z.string().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
    country: z.string().min(2, 'Country must be at least 2 characters').default('India'),
    isDefault: z.boolean().default(false)
})

export default function AddressFormModal({ isOpen, onClose, address = null }) {
    const isEditing = !!address

    const addAddressMutation = useAddAddress()
    const updateAddressMutation = useUpdateAddress()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            addressLine: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India',
            isDefault: false
        }
    })

    // Set form values when editing
    React.useEffect(() => {
        if (address && isOpen) {
            setValue('fullName', address.fullName || '')
            setValue('phone', address.phone || '')
            setValue('addressLine', address.addressLine || '')
            setValue('addressLine2', address.addressLine2 || '')
            setValue('city', address.city || '')
            setValue('state', address.state || '')
            setValue('pincode', address.pincode || '')
            setValue('country', address.country || 'India')
            setValue('isDefault', address.isDefault || false)
        } else if (!address && isOpen) {
            reset()
        }
    }, [address, isOpen, setValue, reset])

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                await updateAddressMutation.mutateAsync({
                    id: address.id,
                    ...data
                })
            } else {
                await addAddressMutation.mutateAsync(data)
            }
            onClose()
            reset()
        } catch (error) {
            console.error('Address operation failed:', error)
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-heading text-lg font-semibold text-heading">
                            {isEditing ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-accent/20 rounded-full transition-colors">
                            <X size={20} className="text-heading-muted" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block font-body text-sm font-medium text-heading mb-1">
                                Full Name *
                            </label>
                            <input
                                {...register('fullName')}
                                type="text"
                                className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                         font-body text-sm focus:border-primary focus:outline-none
                                         transition-colors"
                                placeholder="Enter full name"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block font-body text-sm font-medium text-heading mb-1">
                                Phone Number *
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                         font-body text-sm focus:border-primary focus:outline-none
                                         transition-colors"
                                placeholder="Enter 10-digit phone number"
                                maxLength={10}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Address Line 1 */}
                        <div>
                            <label className="block font-body text-sm font-medium text-heading mb-1">
                                Address Line 1 *
                            </label>
                            <input
                                {...register('addressLine')}
                                type="text"
                                className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                         font-body text-sm focus:border-primary focus:outline-none
                                         transition-colors"
                                placeholder="Street address, building, apartment"
                            />
                            {errors.addressLine && (
                                <p className="text-red-500 text-xs mt-1">{errors.addressLine.message}</p>
                            )}
                        </div>

                        {/* Address Line 2 */}
                        <div>
                            <label className="block font-body text-sm font-medium text-heading mb-1">
                                Address Line 2
                            </label>
                            <input
                                {...register('addressLine2')}
                                type="text"
                                className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                         font-body text-sm focus:border-primary focus:outline-none
                                         transition-colors"
                                placeholder="Landmark, area (optional)"
                            />
                        </div>

                        {/* City and State */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-body text-sm font-medium text-heading mb-1">
                                    City *
                                </label>
                                <input
                                    {...register('city')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                             font-body text-sm focus:border-primary focus:outline-none
                                             transition-colors"
                                    placeholder="City"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block font-body text-sm font-medium text-heading mb-1">
                                    State *
                                </label>
                                <input
                                    {...register('state')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                             font-body text-sm focus:border-primary focus:outline-none
                                             transition-colors"
                                    placeholder="State"
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Pincode and Country */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-body text-sm font-medium text-heading mb-1">
                                    Pincode *
                                </label>
                                <input
                                    {...register('pincode')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                             font-body text-sm focus:border-primary focus:outline-none
                                             transition-colors"
                                    placeholder="6-digit pincode"
                                    maxLength={6}
                                />
                                {errors.pincode && (
                                    <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block font-body text-sm font-medium text-heading mb-1">
                                    Country *
                                </label>
                                <input
                                    {...register('country')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-accent/40 rounded-xl
                                             font-body text-sm focus:border-primary focus:outline-none
                                             transition-colors"
                                    placeholder="Country"
                                    defaultValue="India"
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Default Address Checkbox */}
                        <div className="flex items-center gap-3">
                            <input
                                {...register('isDefault')}
                                type="checkbox"
                                id="isDefault"
                                className="w-4 h-4 text-primary border-accent/40 rounded
                                         focus:ring-primary focus:ring-2"
                            />
                            <label htmlFor="isDefault" className="font-body text-sm text-heading">
                                Set as default address
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 py-3 border border-accent/40 text-heading
                                         rounded-xl font-body text-sm font-medium
                                         hover:bg-accent/20 transition-colors">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={addAddressMutation.isPending || updateAddressMutation.isPending}
                                className="flex-1 py-3 bg-primary text-white rounded-xl
                                         font-body text-sm font-medium hover:bg-primary/90
                                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                {addAddressMutation.isPending || updateAddressMutation.isPending
                                    ? 'Saving...'
                                    : isEditing ? 'Update Address' : 'Add Address'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}