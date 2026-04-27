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
        <div className="min-h-screen bg-paper flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
                <div className="library-panel border-shelf/10 shadow-shelf overflow-hidden bg-white">
                    <div className="h-1 w-full bg-burgundy" />

                    <div className="p-8">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 bg-shelf text-paper rounded-sm flex items-center justify-center shadow-lg mb-3">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="font-ui text-[8px] uppercase font-bold tracking-[0.4em] text-burgundy mb-1">Partner Access</span>
                            <h1 className="font-heading text-2xl font-bold text-shelf">Curator Login</h1>
                        </div>

                        {loginError && (
                            <div className="mb-4 p-3 bg-burgundy/5 border-l-2 border-burgundy text-[9px] font-bold uppercase text-burgundy tracking-widest">
                                {loginError.response?.data?.error || 'Invalid Credentials'}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shelf/20" />
                                    <input {...register('email')} type="email" placeholder="curator@vendor.com" className="w-full pl-11 pr-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 transition-all font-body text-sm text-shelf outline-none rounded-sm" />
                                </div>
                                {errors.email && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30">Entry Key</label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shelf/20" />
                                    <input {...register('password')} type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 transition-all font-body text-sm text-shelf outline-none rounded-sm" />
                                </div>
                                {errors.password && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.password.message}</p>}
                            </div>

                            <button type="submit" disabled={isPending} className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2 mt-4">
                                {isPending ? 'Verifying...' : 'Authorize Entry'}
                                {!isPending && <LogIn size={14} />}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-shelf/5 text-center flex flex-col gap-4">
                            <Link to="/" className="text-[9px] font-bold text-shelf/40 hover:text-burgundy uppercase tracking-widest flex items-center justify-center gap-2">
                                <ArrowLeft size={10} /> Back to Library
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
