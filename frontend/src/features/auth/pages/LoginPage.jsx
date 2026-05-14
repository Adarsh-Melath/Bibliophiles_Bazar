import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react'
import { loginSchema } from '../schemas/authSchemas'
import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { useAuthStore } from '../../../store/authStore'
import { useState } from 'react'
import { motion } from 'framer-motion'
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { setAuth } = useAuthStore()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const { mutate: login, isPending, error } = useMutation({
        mutationFn: (data) => api.post('/auth/login', data),
        onSuccess: (res) => {
            setAuth(res.data.accessToken, res.data.user)
            const role = res.data.user.role
            if (role === 'ADMIN') {
                navigate('/admin/dashboard')
            } else if (role === 'VENDOR') {
                navigate('/vendor/dashboard')
            } else {
                navigate('/')
            }
        },
    })

    const onSubmit = (data) => login(data)

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
                            <BookOpen size={28} className="text-gold" />
                        </div>
                        <h1 className="text-3xl font-bold text-ink mb-3 tracking-tight">Welcome Back</h1>
                        <div className="h-0.5 w-10 bg-gold/30 mt-3" />
                        <p className="font-ui text-[9px] text-ink/40 uppercase tracking-[0.4em] mt-6 text-center">Secure Portal Access</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 bg-velvet/5 border-l-2 border-velvet text-[9px] font-bold uppercase tracking-widest px-6 py-4 rounded-sm text-center"
                        >
                            {error.response?.data?.error || 'Access Denied. Please verify your credentials.'}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 block ml-1">
                                Registry Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="curator@bibliophiles.com"
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
                                <Link
                                    to="/forgot-password"
                                    className="text-[9px] font-bold uppercase tracking-widest text-gold hover:text-ink transition-colors"
                                >
                                    Recovery
                                </Link>
                            </div>

                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
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
                                {isPending ? 'Authenticating...' : 'Sign In'}
                                {!isPending && <ArrowRight size={16} className="text-gold" />}
                            </span>
                            <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </button>
                    </form>

                    {/* Social Auth */}
                    <div className="flex items-center gap-6 my-10">
                        <div className="flex-1 h-px bg-ink/5" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">Third Party</span>
                        <div className="flex-1 h-px bg-ink/5" />
                    </div>

                    <motion.a
                        href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}
                        whileHover={{ y: -2 }}
                        className="w-full py-4 border border-ink/10 rounded-full flex items-center justify-center gap-4 group transition-all duration-500 hover:border-gold hover:bg-gold/5"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-500">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60">Continue with Google</span>
                    </motion.a>

                    {/* Footer */}
                    <div className="text-center mt-12 pt-8 border-t border-ink/5">
                        <p className="font-ui text-[11px] text-ink/40 uppercase tracking-widest">
                            New to our community?{' '}
                            <Link to="/signup" className="text-gold font-bold hover:text-ink transition-colors ml-2">
                                Join Us
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-ink/[0.02] px-8 py-4 text-center border-t border-ink/5">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/20 flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                        End-to-End Architectural Security
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
