import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, BookOpen, ShieldCheck, KeyRound ,ArrowLeft} from 'lucide-react'
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
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden font-ui">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-ink"></div>
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-ink/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm editorial-card !p-0 overflow-hidden relative z-10"
            >
                <div className="p-10 md:p-12">
                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-14 h-14 bg-ink text-white rounded-full flex items-center justify-center shadow-2xl shadow-ink/20 mb-6 group transition-transform hover:scale-110">
                            <ShieldCheck size={28} className="text-gold" />
                        </div>
                        <h1 className="text-3xl font-bold text-ink mb-3 tracking-tight">Admin Portal</h1>
                        <div className="h-0.5 w-10 bg-gold/30 mt-3" />
                        <p className="font-ui text-[9px] text-ink/40 uppercase tracking-[0.4em] mt-6 text-center">Authorized Registry Access Only</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 bg-velvet/5 border-l-2 border-velvet text-[9px] font-bold uppercase tracking-widest px-6 py-4 rounded-sm text-center"
                        >
                            {error.response?.data?.error || 'Access Denied. Administrative clearance required.'}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                Registry Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="admin@bibliophiles.com"
                                className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none placeholder:text-ink/10"
                            />
                            {errors.email && (
                                <p className="text-velvet text-[8px] uppercase font-bold mt-2 tracking-widest">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                    Access Key
                                </label>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/forgot-password')}
                                    className="text-[9px] font-bold uppercase tracking-widest text-gold hover:text-ink transition-colors"
                                >
                                    Recovery
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="w-full px-1 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none pr-12 placeholder:text-ink/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/20 hover:text-gold transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-velvet text-[8px] uppercase font-bold mt-2 tracking-widest">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-5 bg-ink text-white font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-ink/90 transition-all duration-500 shadow-2xl shadow-ink/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {isPending ? 'Validating Clearance...' : (
                                    <>
                                        <KeyRound size={16} className="text-gold" />
                                        Authorize Access
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-12 pt-8 border-t border-ink/5">
                        <button
                            onClick={() => navigate('/')}
                            className="font-ui text-[10px] font-bold text-ink/40 uppercase tracking-widest hover:text-gold transition-colors flex items-center justify-center gap-3 w-full"
                        >
                            <ArrowLeft size={12} /> Return to Main Library
                        </button>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="bg-ink/[0.02] px-8 py-4 text-center border-t border-ink/5">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/20 flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                        Admin Control Center • Archival Security Protocol
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default AdminLoginPage

