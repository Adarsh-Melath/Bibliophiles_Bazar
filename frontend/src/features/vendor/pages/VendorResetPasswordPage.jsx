import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '../../auth/schemas/authSchemas'
import api from '../../../lib/axios'
import { Eye, EyeOff, ShieldCheck, ArrowLeft, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VendorResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get('resetToken') || ''
    const isVerified = searchParams.get('verified') === 'true'
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const password = watch('password')
    const confirm = watch('confirmPassword')

    const { mutate: resetPassword, isPending, error } = useMutation({
        mutationFn: (data) =>
            api.post('/auth/reset-password', {
                resetToken,
                password: data.password
            }),
        onSuccess: () => {
            setSuccess(true)
            setTimeout(() => navigate('/vendor/login'), 2500)
        }
    })

    if (!isVerified || !resetToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-paper">
                <div className="text-center">
                    <p className="font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/40 mb-4">Your session ended.</p>
                    <Link to="/vendor/forgot-password" className="text-burgundy font-bold text-[10px] uppercase tracking-widest hover:text-shelf transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft size={12} />
                        Start Over
                    </Link>
                </div>
            </div>
        )
    }

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
                            <h1 className="font-heading text-2xl font-bold text-shelf">New Password</h1>
                            <div className="h-0.5 w-8 bg-burgundy/30 mt-1.5" />
                        </div>

                        {!success ? (
                            <>
                                {error && (
                                    <div className="mb-4 p-3 bg-burgundy/5 border-l-2 border-burgundy text-[9px] font-bold uppercase text-burgundy tracking-widest">
                                        {error.response?.data?.error || 'Something went wrong'}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(resetPassword)} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30">New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shelf/20" />
                                            <input
                                                {...register('password')}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Min 8 characters"
                                                className="w-full pl-11 pr-12 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 transition-all font-body text-sm text-shelf outline-none rounded-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.password.message}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shelf/20" />
                                            <input
                                                {...register('confirmPassword')}
                                                type={showConfirm ? 'text' : 'password'}
                                                placeholder="Repeat matching key"
                                                className="w-full pl-11 pr-12 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 transition-all font-body text-sm text-shelf outline-none rounded-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors"
                                            >
                                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {confirm && password === confirm && (
                                            <p className="text-green-600 text-[8px] font-bold uppercase mt-1 tracking-widest">Match Verified ✓</p>
                                        )}
                                        {errors.confirmPassword && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.confirmPassword.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2 mt-4 disabled:opacity-30"
                                    >
                                        {isPending ? 'Saving...' : 'Save New Password'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8 space-y-6">
                                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-sm flex items-center justify-center mx-auto shadow-inner">
                                    <ShieldCheck size={32} />
                                </div>
                                <h2 className="font-heading text-xl font-bold text-shelf">
                                    Successfully Saved
                                </h2>
                                <p className="font-ui text-[9px] font-bold text-shelf/30 uppercase tracking-widest">
                                    Redirecting to login...
                                </p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-shelf/5 text-center">
                            <Link to="/vendor/login" className="text-[9px] font-bold text-shelf/40 hover:text-burgundy uppercase tracking-widest flex items-center justify-center gap-2">
                                <ArrowLeft size={10} /> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
