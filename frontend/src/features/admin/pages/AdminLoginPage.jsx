import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, BookOpen, ShieldCheck, KeyRound } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'
import { motion } from 'framer-motion'
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
                alert('Access denied. Administrator credentials required.')
                return
            }
            setAuth(res.data.accessToken, user)
            navigate('/admin/dashboard')
        },
    })

    return (
        <div className="h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden selection:bg-burgundy/10">

            {/* Subtle background texture/vignette */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-shelf/5 via-transparent to-burgundy/5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full max-w-lg relative"
            >
                {/* Decorative Elements */}
                <div className="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-burgundy/20 pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-burgundy/20 pointer-events-none" />

                <div className="library-panel bg-paper shadow-shelf overflow-hidden border-shelf/10">
                    {/* Top Archival Accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-burgundy via-shelf to-burgundy" />

                    <div className="px-8 py-4 md:px-10">
                        {/* Icon/Identity */}
                        <div className="flex flex-col items-center mb-4">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="w-16 h-16 bg-shelf text-paper rounded-sm flex items-center justify-center shadow-lg mb-4 group transition-all duration-500 hover:rotate-3"
                            >
                                <BookOpen size={28} className="group-hover:text-burgundy transition-colors" />
                            </motion.div>
                            <span className="font-ui text-[9px] uppercase font-bold tracking-[0.5em] text-burgundy mb-1">Admin Access</span>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-shelf text-center tracking-tight leading-none">
                                Admin Login
                            </h1>
                            <div className="h-0.5 w-10 bg-burgundy/30 mt-2" />
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-4 bg-burgundy/5 border-l-4 border-burgundy text-[9px] font-bold uppercase tracking-widest px-5 py-3 text-burgundy"
                            >
                                {error.response?.data?.error || 'Login Failed'}
                            </motion.div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit((data) => login(data))} className="space-y-4">
                            <div>
                                <label className="block font-ui text-[9px] font-bold text-shelf/40 uppercase tracking-[0.2em] mb-1.5">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="admin@email.com"
                                    className="w-full px-4 py-3 bg-shelf/[0.02] border-b-2 border-shelf/10 text-shelf font-body placeholder-shelf/20
                                               focus:outline-none focus:border-burgundy focus:bg-shelf/[0.04]
                                               transition-all duration-300 text-sm"
                                />
                                {errors.email && (
                                    <p className="text-burgundy text-[9px] font-bold uppercase mt-1 tracking-wide">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-ui text-[9px] font-bold text-shelf/40 uppercase tracking-[0.2em] mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••••"
                                        className="w-full px-4 py-3 bg-shelf/[0.02] border-b-2 border-shelf/10 text-shelf font-body placeholder-shelf/20
                                                   focus:outline-none focus:border-burgundy focus:bg-shelf/[0.04]
                                                   transition-all duration-300 pr-12 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-burgundy text-[9px] font-bold uppercase mt-1 tracking-wide">{errors.password.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full library-button bg-shelf text-paper py-4 text-[10px] font-bold uppercase tracking-[0.3em]
                                           flex items-center justify-center gap-3 group disabled:opacity-30 transition-all duration-500 shadow-shelf"
                            >
                                {isPending ? (
                                    <span className="animate-pulse">Signing in...</span>
                                ) : (
                                    <>
                                        <ShieldCheck size={16} className="group-hover:text-burgundy transition-colors" />
                                        Login
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-6 flex items-center justify-center gap-4">
                            <span className="h-px w-6 bg-shelf/10" />
                            <button onClick={() => navigate('/admin/forgot-password')}
                                type="button"
                                className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-shelf/40 hover:text-burgundy transition-colors px-4"
                            >
                                Forgot Password?
                            </button>
                            <span className="h-px w-6 bg-shelf/10" />
                        </div>
                    </div>

                    <div className="bg-shelf/[0.03] px-8 py-3 border-t border-shelf/5 text-center flex items-center justify-center gap-2">
                        <KeyRound size={11} className="text-burgundy/40" />
                        <p className="font-ui text-[8px] text-shelf/30 font-bold uppercase tracking-[0.3em]">
                            Admin Portal • Secure Access
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AdminLoginPage

