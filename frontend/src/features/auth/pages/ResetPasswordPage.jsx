import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '../schemas/authSchemas'
import api from '../../../lib/axios'
import { Eye, EyeOff, KeyRound, ShieldCheck, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResetPasswordPage() {
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
            setTimeout(() => navigate('/login'), 2500)
        }
    })

    if (!isVerified || !resetToken) {
        return (
            <div className="h-screen flex items-center justify-center bg-paper">
                <div className="text-center group">
                    <p className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-shelf/40 mb-4">Your session ended.</p>
                    <Link to="/forgot-password" title="Start again" className="text-burgundy font-bold text-xs uppercase tracking-widest hover:text-shelf transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft size={14} />
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
                <div className="bg-white border border-shelf/10 shadow-shelf rounded-sm overflow-hidden">
                    <div className="h-1.5 w-full bg-shelf" />

                    <div className="px-10 py-10">
                        {/* Header */}
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-16 h-16 bg-shelf text-paper rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <KeyRound size={28} />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                New Password
                            </h1>
                            <div className="h-0.5 w-12 bg-burgundy mt-2 mb-4"></div>
                            <p className="font-body text-[11px] text-shelf/40 uppercase tracking-[0.2em] font-bold">
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
                                                className="w-full px-5 py-4 bg-paper border border-shelf/15 text-shelf font-body placeholder:text-shelf/20
                                                           focus:outline-none focus:border-burgundy
                                                           transition-all duration-300 pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors"
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
                                                className="w-full px-5 py-4 bg-paper border border-shelf/15 text-shelf font-body placeholder:text-shelf/20
                                                           focus:outline-none focus:border-burgundy
                                                           transition-all duration-300 pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(p => !p)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-shelf/20 hover:text-burgundy transition-colors"
                                            >
                                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {confirm && password === confirm && (
                                            <p className="text-green-600 text-[10px] font-bold uppercase mt-2 tracking-widest">Match Verified ✓</p>
                                        )}
                                        {errors.confirmPassword && (
                                            <p className="text-burgundy text-[10px] font-bold uppercase mt-2 tracking-wide">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg disabled:opacity-30 flex items-center justify-center gap-3"
                                    >
                                        {isPending ? 'Saving...' : 'Save New Password'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-10 space-y-6">
                                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <ShieldCheck size={32} />
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-shelf">
                                    Successfully Saved
                                </h2>
                                <p className="font-ui text-[10px] font-bold text-shelf/30 uppercase tracking-[0.2em]">
                                    Redirecting to login...
                                </p>
                            </div>
                        )}

                        <div className="text-center mt-10 p-4 border-t border-shelf/5">
                            <Link to="/login" className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-shelf/40 hover:text-burgundy flex items-center justify-center gap-2 transition-colors">
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