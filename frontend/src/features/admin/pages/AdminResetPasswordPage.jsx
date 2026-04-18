import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { z } from 'zod'
import api from '../../../lib/axios'
import { resetPasswordSchema } from '../schemas/adminSchema'



export default function AdminResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get('resetToken') || ''
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    })

    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    const { mutate: resetPassword, isPending, error } = useMutation({
        mutationFn: (data) =>
            api.post('/auth/reset-password', { resetToken, password: data.password }),
        onSuccess: () => {
            setSuccess(true)
            setTimeout(() => navigate('/admin/login'), 2500)
        },
    })

    // Guard — no token means they navigated here directly
    if (!resetToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#EFEBE9]">
                <div className="text-center">
                    <p className="text-sm text-[#548C8C] mb-4">Invalid or expired session.</p>
                    <Link to="/admin/forgot-password" className="text-[#9CAF88] text-sm hover:underline">
                        Start again
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="h-1 bg-[#9CAF88]" />

                <div className="px-8 py-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-[#548C8C]" strokeWidth={1.5} />
                        </div>
                    </div>

                    {!success ? (
                        <>
                            <h1 className="text-2xl font-bold text-[#548C8C] text-center mb-2">
                                Reset Password
                            </h1>
                            <p className="text-sm text-[#9CAF88] text-center mb-8">
                                Enter a new password for your admin account
                            </p>

                            {error && (
                                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
                                    {error.response?.data?.error || 'Something went wrong'}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(resetPassword)} className="space-y-5">
                                {/* New Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Min 8 chars, 1 uppercase, 1 number"
                                            className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] pr-10 focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CAF88]"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('confirmPassword')}
                                            type={showConfirm ? 'text' : 'password'}
                                            placeholder="Repeat your new password"
                                            className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] pr-10 focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(p => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CAF88]"
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {confirmPassword && password === confirmPassword && (
                                        <p className="text-green-600 text-xs mt-1">Passwords match ✓</p>
                                    )}
                                    {errors.confirmPassword && (
                                        <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all disabled:opacity-60"
                                >
                                    {isPending ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-[#548C8C] mb-2">
                                Password Updated ✓
                            </h2>
                            <p className="text-sm text-[#9CAF88]">
                                Redirecting to admin login...
                            </p>
                        </div>
                    )}

                    <div className="text-center mt-6">
                        <Link to="/admin/login" className="text-xs text-[#9CAF88] hover:text-[#548C8C]">
                            Back to Admin Login
                        </Link>
                    </div>
                </div>

                <div className="bg-[#F9F9F9] px-8 py-4 border-t border-[#D7CCC8] text-center">
                    <p className="text-xs text-[#9CAF88] font-medium tracking-wide">
                        Authorized administrators only.
                    </p>
                </div>
            </div>
        </div>
    )
}
