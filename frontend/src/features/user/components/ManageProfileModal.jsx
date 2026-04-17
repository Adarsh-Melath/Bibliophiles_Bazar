import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, User, Phone, Loader } from 'lucide-react'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { manageProfileSchema } from '../schemas/userSchema'

export default function ManageProfileModal({ user, onClose }) {
    const { mutate: updateProfile, isPending, error, isSuccess, reset } = useUpdateProfile()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(manageProfileSchema),
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        }
    })

    // Close modal on success
    useEffect(() => {
        if (isSuccess) {
            reset()
            onClose()
        }
    }, [isSuccess, onClose, reset])

    const onSubmit = (data) => {
        updateProfile({
            name: data.name,
            phone: data.phone || null,
        })
    }

    return (
        <div className="fixed inset-0 bg-[#f7f6f4]/90 backdrop-blur-md flex items-center justify-center z-50 px-4">
            <div className="glass-panel rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(84,140,140,0.12)] overflow-hidden relative animate-cinematic border border-white/50">

                {/* Minimalist Watermark */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />

                <div className="p-10 relative z-10">

                    {/* Header */}
                    <div className="flex items-center justify-between pb-6 mb-8 hairline-border-b">
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8fa2a2] mb-1 font-semibold block">Client Settings</span>
                            <h3 className="text-editorial text-[26px] text-[#3b5a5a] font-light tracking-tight leading-none">
                                Manage Profile
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isPending}
                            className="text-[#8fa2a2] hover:text-[#548C8C] transition-all hover:rotate-90 duration-all origin-center bg-white/50 rounded-full p-2 hover:bg-white hover:shadow-sm">
                            <X size={18} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50/50 backdrop-blur-sm border border-red-200 text-red-600/80 text-[13px] px-4 py-3 rounded-lg mb-6 font-medium tracking-wide">
                            {error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Something went wrong'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Name */}
                        <div className="group">
                            <label className="text-[10px] uppercase tracking-[0.25em] text-[#8fa2a2] mb-2 font-bold block transition-colors duration-500 group-focus-within:text-[#548C8C]">
                                Full Patron Name
                            </label>
                            <input
                                {...register('name')}
                                placeholder="Your full name"
                                className="w-full px-5 py-4 rounded-xl border border-[#548C8C]/15 bg-white/40 backdrop-blur-sm
                                           font-sans text-[15px] text-[#3b5a5a] placeholder-[#8fa2a2]/50 font-medium
                                           focus:outline-none focus:border-[#548C8C]/40 focus:bg-white/70 focus:shadow-[0_4px_20px_rgba(84,140,140,0.06)]
                                           transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            {errors.name && (
                                <p className="text-red-400/80 text-[11px] mt-2 px-1 font-semibold tracking-wide flex items-center gap-1 before:content-[''] before:w-1 before:h-1 before:bg-red-400 before:rounded-full">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="group">
                            <label className="text-[10px] uppercase tracking-[0.25em] text-[#8fa2a2] mb-2 font-bold block flex items-center gap-2 transition-colors duration-500 group-focus-within:text-[#548C8C]">
                                Contact Number <span className="opacity-50 lowercase tracking-normal font-normal bg-[#8fa2a2]/10 px-1.5 py-0.5 rounded text-[9px]">(optional)</span>
                            </label>
                            <input
                                {...register('phone')}
                                placeholder="10-digit phone number"
                                className="w-full px-5 py-4 rounded-xl border border-[#548C8C]/15 bg-white/40 backdrop-blur-sm
                                           font-sans text-[15px] text-[#3b5a5a] placeholder-[#8fa2a2]/50 font-medium
                                           focus:outline-none focus:border-[#548C8C]/40 focus:bg-white/70 focus:shadow-[0_4px_20px_rgba(84,140,140,0.06)]
                                           transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            {errors.phone && (
                                <p className="text-red-400/80 text-[11px] mt-2 px-1 font-semibold tracking-wide flex items-center gap-1 before:content-[''] before:w-1 before:h-1 before:bg-red-400 before:rounded-full">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isPending}
                                className="flex-1 py-4 rounded-full border border-[#8fa2a2]/30 text-[#8fa2a2] text-[10px] font-bold tracking-[0.2em] uppercase bg-white/20 backdrop-blur-md
                                           hover:bg-white hover:text-[#548C8C] hover:border-[#548C8C]/30 hover:shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                           disabled:opacity-50 disabled:cursor-not-allowed">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 py-4 rounded-full border border-transparent text-white text-[10px] font-bold tracking-[0.2em] uppercase bg-[#548C8C]
                                           hover:bg-[#3b5a5a] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(84,140,140,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                           disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isPending
                                    ? <><Loader size={14} className="animate-spin" /> Saving...</>
                                    : 'Save Changes'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}