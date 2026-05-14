import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ShieldCheck, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import { vendorLoginSchema } from '../schemas/vendorSchemas'
import api from '../../../lib/axios'
import { motion } from 'framer-motion'

export default function VendorLoginPage() {
    const setAuth = useAuthStore((state) => state.setAuth)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(vendorLoginSchema)
    })

    const { mutate: handleLogin, isPending, error: loginError } = useMutation({
        mutationFn: async (data) => {
            const res = await api.post('/auth/login', data)
            return res.data
        },
        onSuccess: (data) => {
            if (data.user.role === 'VENDOR') {
                setAuth(data.accessToken, data.user)
                navigate('/vendor/dashboard')
            } else {
                alert("Restricted Access: Authorized Curators Only.")
            }
        }
    })

    const onSubmit = (data) => handleLogin(data)

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
                            <ShieldCheck className="w-7 h-7 text-gold" />
                        </div>
                        <span className="font-ui text-[9px] uppercase font-bold tracking-[0.5em] text-gold mb-2">Partner Access</span>
                        <h1 className="font-heading text-3xl font-bold text-ink tracking-tight">Curator Login</h1>
                        <div className="h-0.5 w-10 bg-gold/30 mt-3" />
                    </div>

                    {loginError && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8 p-4 bg-velvet/5 border-l-2 border-velvet text-[9px] font-bold uppercase text-velvet tracking-widest text-center"
                        >
                            {loginError.response?.data?.error || 'Invalid Credentials'}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2">
                            <label className="block font-ui text-[10px] uppercase font-bold tracking-widest text-ink/40 ml-1">Registry Email</label>
                            <div className="relative">
                                <Mail className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                                <input 
                                    {...register('email')} 
                                    type="email" 
                                    placeholder="curator@vendor.com" 
                                    className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none placeholder:text-ink/10" 
                                />
                            </div>
                            {errors.email && <p className="text-velvet text-[8px] font-bold uppercase mt-2 tracking-wide">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block font-ui text-[10px] uppercase font-bold tracking-widest text-ink/40 ml-1">Access Key</label>
                                <Link
                                    to="/vendor/forgot-password"
                                    className="text-[9px] font-bold uppercase tracking-widest text-gold hover:text-ink transition-colors"
                                >
                                    Recovery
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                                <input 
                                    {...register('password')} 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-4 bg-transparent border-b border-ink/10 focus:border-gold transition-all duration-500 font-body text-base text-ink outline-none placeholder:text-ink/10" 
                                />
                            </div>
                            {errors.password && <p className="text-velvet text-[8px] font-bold uppercase mt-2 tracking-wide">{errors.password.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isPending} 
                            className="w-full py-5 bg-ink text-white font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-ink/90 transition-all duration-500 shadow-2xl shadow-ink/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {isPending ? 'Verifying...' : 'Authorize Entry'}
                                {!isPending && <LogIn size={16} className="text-gold" />}
                            </span>
                            <div className="absolute inset-0 bg-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-ink/5 text-center flex flex-col gap-6">
                        <Link to="/" className="text-[10px] font-bold text-ink/40 hover:text-gold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors">
                            <ArrowLeft size={12} /> Back to Library
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-ink/[0.02] px-8 py-4 text-center border-t border-ink/5">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/20 flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                        Curator Portal • End-to-End Archival Security
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
