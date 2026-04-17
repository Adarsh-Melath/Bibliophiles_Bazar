import { Pencil, Trash2, Check } from 'lucide-react'

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
    return (
        <div className={`bg-white rounded-2xl p-6 relative border transition-all duration-200
                        ${address.isDefault
                ? 'border-primary shadow-sm'
                : 'border-accent/40 hover:border-primary/40 hover:shadow-sm'
            }`}>

            {/* Default badge */}
            {address.isDefault && (
                <div className="absolute -top-3 left-5">
                    <span className="bg-primary text-white text-xs font-medium
                                     px-3 py-1 rounded-full font-body">
                        Default Address
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="mt-1">
                <h4 className="font-heading text-base font-semibold text-heading mb-1">
                    {address.fullName}
                </h4>
                <p className="font-body text-sm text-[#548C8C] mb-3">
                    +91 {address.phone}
                </p>
                <div className="font-body text-sm text-heading-muted space-y-0.5">
                    <p>{address.addressLine}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} – {address.pincode}</p>
                    <p>{address.country || 'India'}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-accent/40">
                <button
                    onClick={() => onEdit(address)}
                    className="flex items-center gap-1.5 text-sm font-body text-heading-muted
                               hover:text-primary transition-colors">
                    <Pencil size={14} />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(address.id)}
                    className="flex items-center gap-1.5 text-sm font-body text-heading-muted
                               hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                    Delete
                </button>
                {!address.isDefault && (
                    <button
                        onClick={() => onSetDefault(address)}
                        className="flex items-center gap-1.5 text-sm font-body text-[#548C8C]
                                   hover:text-primary transition-colors ml-auto">
                        <Check size={14} />
                        Set Default
                    </button>
                )}
            </div>
        </div>
    )
}