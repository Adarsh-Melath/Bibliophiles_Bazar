import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, BookOpen, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react'
import { motion } from 'framer-motion'
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

    if (!resetToken) {
        return (
            <div className="h-screen flex items-center justify-center bg-paper">
                <div className="text-center">
                    <p className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-shelf/40 mb-4">Your session ended.</p>
                    <Link to="/admin/forgot-password" title="Start again" className="text-burgundy font-bold text-xs uppercase tracking-widest hover:text-shelf transition-colors">
                        Start Over
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden selection:bg-burgundy/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative"
            >
                <div className="library-panel bg-white shadow-shelf overflow-hidden border-shelf/10">
                    <div className="h-1.5 w-full bg-gradient-to-r from-burgundy via-shelf to-burgundy" />

                    <div className="px-10 py-10">
                        {/* Header */}
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-16 h-16 bg-shelf/5 rounded-full flex items-center justify-center mb-6 border border-shelf/5 shadow-inner">
                                <KeyRound size={28} className="text-burgundy" />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                New Password
                            </h1>
                            <p className="font-body text-[11px] text-shelf/40 uppercase tracking-[0.2em] mt-3 font-bold">
                                Create a secret key
                            </p>
                        </div>

                        {!success ? (
                            <>
                                {error && (
                                    <div className="mb-6 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest px-6 py-4">
                                        {error.response?.data?.error || 'Something went wrong'}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(resetPassword)} className="space-y-6">
                                    {/* New Password */}
                                    <div>
                                        <label className="block font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.3em] mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register('password')}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Min 8 characters"
                                                className="w-full px-5 py-4 bg-shelf/[0.02] border-b-2 border-shelf/10 text-shelf font-body placeholder-shelf/20
                                                           focus:outline-none focus:border-burgundy focus:bg-shelf/[0.04]
                                                           transition-all duration-300 pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-burgundy text-[10px] font-bold uppercase mt-2 tracking-wide">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.3em] mb-2">
                                            Repeat Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register('confirmPassword')}
                                                type={showConfirm ? 'text' : 'password'}
                                                placeholder="Repeat matching key"
                                                className="w-full px-5 py-4 bg-shelf/[0.02] border-b-2 border-shelf/10 text-shelf font-body placeholder-shelf/20
                                                           focus:outline-none focus:border-burgundy focus:bg-shelf/[0.04]
                                                           transition-all duration-300 pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy"
                                            >
                                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {confirmPassword && password === confirmPassword && (
                                            <p className="text-green-600 text-[10px] font-bold uppercase mt-2 tracking-widest">Match Verified ✓</p>
                                        )}
                                        {errors.confirmPassword && (
                                            <p className="text-burgundy text-[10px] font-bold uppercase mt-2 tracking-wide">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full library-button bg-shelf text-paper py-4 text-[11px] font-bold uppercase tracking-[0.4em]
                                                   flex items-center justify-center gap-3 shadow-shelf disabled:opacity-30 transition-all duration-500"
                                    >
                                        {isPending ? 'Saving...' : 'Save New Password'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-10 space-y-6">
                                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <ShieldCheck size={32} />
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-shelf">
                                    Successfully Saved
                                </h2>
                                <p className="font-ui text-[10px] font-bold text-shelf/30 uppercase tracking-[0.2em]">
                                    Redirecting you to login...
                                </p>
                            </div>
                        )}

                        <div className="text-center mt-10 p-4 border-t border-shelf/5">
                            <Link to="/admin/login" className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-shelf/40 hover:text-burgundy flex items-center justify-center gap-2 transition-colors">
                                <ArrowLeft size={14} />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
