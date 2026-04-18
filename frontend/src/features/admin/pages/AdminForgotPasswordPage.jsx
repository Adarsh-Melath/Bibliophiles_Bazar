import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { z } from 'zod'
import api from '../../../lib/axios'
import { adminForgotPasswordSchema } from '../schemas/adminSchema'



export default function AdminForgotPasswordPage() {
    const [sentEmail, setSentEmail] = useState('')
    const [sent, setSent] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(adminForgotPasswordSchema),
    })

    const { mutate: sendOtp, isPending, error } = useMutation({
        mutationFn: (email) => api.post('/auth/forgot-password', { email }),
        onSuccess: (_, email) => {
            setSentEmail(email)
            setSent(true)
        },
    })

    const onSubmit = (data) => sendOtp(data.email)

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

                    <h1 className="text-2xl font-bold text-[#548C8C] text-center mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-[#9CAF88] text-center mb-8">
                        Enter your admin email to receive a reset code
                    </p>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg">
                            {error.response?.data?.error || 'Something went wrong'}
                        </div>
                    )}

                    {!sent ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                                    Email Address
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="admin@bookstore.com"
                                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 transition-all"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm transition-all disabled:opacity-60"
                            >
                                {isPending ? 'Sending...' : 'Send Reset Code'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-[#548C8C] mb-2">
                                Check your email
                            </h2>
                            <p className="text-sm text-[#9CAF88] mb-2">
                                We sent a reset code to
                            </p>
                            <p className="font-medium text-[#2C3E50] mb-6">{sentEmail}</p>

                            <Link
                                to={`/admin/verify-reset-otp?email=${encodeURIComponent(sentEmail)}`}
                                className="block w-full py-3 rounded-lg bg-[#9CAF88] text-white font-semibold text-sm text-center mb-3"
                            >
                                Enter Reset Code
                            </Link>

                            <button
                                onClick={() => { setSent(false); setSentEmail('') }}
                                className="w-full py-3 rounded-lg border border-[#D7CCC8] text-sm text-[#548C8C]"
                            >
                                Use different email
                            </button>
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
