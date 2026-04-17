import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Lock, ShieldCheck, AlertTriangle, Loader } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import ProfileSidebar from '../components/ProfileSidebar'
import { changePasswordSchema } from '../schemas/userSchema'

export default function SecurityPage() {
    const [show, setShow] = useState({ current: false, new: false, confirm: false })
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(changePasswordSchema),
    })

    const { mutate: changePassword, isPending, error } = useMutation({
        mutationFn: (data) => api.put('/user/change-password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }),
        onSuccess: () => {
            setSuccess(true)
            reset()
            setTimeout(() => setSuccess(false), 4000)
        },
    })

    const toggle = (field) => setShow(s => ({ ...s, [field]: !s[field] }))

    const inputClass = `w-full pl-11 pr-11 py-3 rounded-xl border border-accent bg-white
                        font-body text-sm text-heading placeholder-accent
                        focus:outline-none focus:ring-2 focus:ring-primary
                        transition-all duration-200`

    return (
        <div className="min-h-screen bg-background">
            <div className="h-16 bg-white border-b border-accent shadow-sm" />

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

                <ProfileSidebar />

                <div className="flex-1 min-w-0 max-w-2xl flex flex-col gap-6">

                    {/* Page header */}
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-heading">
                            Security Settings
                        </h1>
                        <p className="font-body text-sm text-heading-muted mt-1">
                            Manage your password and account security.
                        </p>
                    </div>

                    {/* Change Password card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-accent/40">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/10
                                            flex items-center justify-center">
                                <Lock size={18} className="text-primary" />
                            </div>
                            <div>
                                <h2 className="font-heading text-base font-semibold text-heading">
                                    Change Password
                                </h2>
                                <p className="font-body text-xs text-heading-muted">
                                    Use a strong password to keep your account secure
                                </p>
                            </div>
                        </div>

                        {/* Success message */}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700
                                            text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                                <ShieldCheck size={16} />
                                Password changed successfully
                            </div>
                        )}

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600
                                            text-sm px-4 py-3 rounded-xl mb-4">
                                {error.response?.data?.error || 'Something went wrong'}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(d => changePassword(d))}
                            className="space-y-4">

                            {/* Current Password */}
                            <div>
                                <label className="font-body text-sm text-heading font-medium mb-1 block">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('currentPassword')}
                                        type={show.current ? 'text' : 'password'}
                                        placeholder="Your current password"
                                        className={inputClass}
                                    />
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                                    <button type="button" onClick={() => toggle('current')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-heading transition-colors">
                                        {show.current ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.currentPassword && (
                                    <p className="text-red-400 text-xs mt-1">{errors.currentPassword.message}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="font-body text-sm text-heading font-medium mb-1 block">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('newPassword')}
                                        type={show.new ? 'text' : 'password'}
                                        placeholder="Min 8 characters"
                                        className={inputClass}
                                    />
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                                    <button type="button" onClick={() => toggle('new')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-heading transition-colors">
                                        {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="font-body text-sm text-heading font-medium mb-1 block">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('confirmPassword')}
                                        type={show.confirm ? 'text' : 'password'}
                                        placeholder="Repeat new password"
                                        className={inputClass}
                                    />
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                                    <button type="button" onClick={() => toggle('confirm')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-heading transition-colors">
                                        {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={isPending}
                                    className="px-6 py-3 rounded-xl bg-primary text-white
                                               font-button text-sm font-semibold shadow-sm
                                               hover:bg-primary-dark active:scale-95
                                               transition-all duration-200
                                               disabled:opacity-60 disabled:cursor-not-allowed
                                               flex items-center gap-2">
                                    {isPending
                                        ? <><Loader size={15} className="animate-spin" /> Updating...</>
                                        : 'Update Password'
                                    }
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50
                                            flex items-center justify-center">
                                <AlertTriangle size={18} className="text-red-500" />
                            </div>
                            <div>
                                <h2 className="font-heading text-base font-semibold text-heading">
                                    Danger Zone
                                </h2>
                                <p className="font-body text-xs text-heading-muted">
                                    Irreversible actions for your account
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl
                                        bg-red-50 border border-red-100">
                            <div>
                                <p className="font-body text-sm font-medium text-heading">
                                    Delete Account
                                </p>
                                <p className="font-body text-xs text-heading-muted mt-0.5">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <button className="px-4 py-2 rounded-xl border-2 border-red-300
                                               text-red-500 font-button text-sm font-medium
                                               hover:bg-red-500 hover:text-white
                                               transition-all duration-200">
                                Delete Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

