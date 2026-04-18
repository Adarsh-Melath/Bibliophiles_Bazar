import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'

import { adminLoginSchema } from '../schemas/adminSchema'

function AdminLoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { setAuth } = useAuthStore()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(adminLoginSchema),
    })

    const { mutate: login, isPending, error } = useMutation({
        mutationFn: (data) => api.post('/auth/login', data),
        onSuccess: (res) => {
            const user = res.data.user
            if (user.role !== 'ADMIN') {
                alert('Access denied. Admin only.')
                return
            }
            setAuth(res.data.accessToken, user)
            navigate('/admin/dashboard')
        },
    })

    return (
        <div className="min-h-screen bg-[#EFEBE9] flex items-center justify-center p-4">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@500;600;700&display=swap');
                
                body, p, label, input, button, span {
                    font-family: 'Roboto', sans-serif;
                }
                
                h1, h2, h3 {
                    font-family: 'Merriweather', serif;
                }
                
                button {
                    font-family: 'Montserrat', sans-serif;
                }
            `}} />

            {/* Main Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Top Accent Line */}
                <div className="h-1 bg-[#9CAF88]"></div>

                {/* Content */}
                <div className="px-8 py-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-[#548C8C]" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Header */}
                    <h1 className="text-3xl font-bold text-[#548C8C] text-center mb-2">
                        Admin Portal
                    </h1>
                    <p className="text-sm text-[#9CAF88] text-center mb-8">
                        Sign in to manage the bookstore platform.
                    </p>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-lg">
                            {error.response?.data?.error || 'Invalid credentials'}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="admin@bookstore.com"
                                className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] text-[#2C3E50] placeholder-[#9CAF88]/50
                                           focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20
                                           transition-all duration-300"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-[#548C8C] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 rounded-lg bg-[#E8F4F8] border border-[#D7CCC8] text-[#2C3E50] placeholder-[#9CAF88]/50
                                               focus:outline-none focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20
                                               transition-all duration-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CAF88] hover:text-[#548C8C] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 px-4 rounded-lg bg-[#9CAF88] hover:bg-[#8FA078] text-white font-semibold text-sm
                                       transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Forgot Password Link */}
                    <div className="text-center mt-6">
                        <button onClick={() => navigate('/admin/forgot-password')}
                            type="button"
                            className="text-xs text-[#9CAF88] hover:text-[#548C8C] font-medium transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#F9F9F9] px-8 py-4 border-t border-[#D7CCC8] text-center">
                    <p className="text-xs text-[#9CAF88] font-medium tracking-wide">
                        Authorized administrators only.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginPage

