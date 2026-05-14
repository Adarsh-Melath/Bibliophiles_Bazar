import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ShieldCheck, Mail, ArrowLeft, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../../../lib/axios'
import { forgotPasswordSchema } from '../../auth/schemas/authSchemas'

export default function VendorForgotPasswordPage() {
    const [sentEmail, setSentEmail] = useState('')
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
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
                            <h1 className="font-heading text-2xl font-bold text-shelf">Forgot Password</h1>
                            <div className="h-0.5 w-8 bg-burgundy/30 mt-1.5" />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-burgundy/5 border-l-2 border-burgundy text-[9px] font-bold uppercase text-burgundy tracking-widest">
                                {error.response?.data?.error || 'Email Not Found'}
                            </div>
                        )}

                        {!sent ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block font-ui text-[9px] uppercase font-bold tracking-widest text-shelf/30">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shelf/20" />
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="curator@vendor.com"
                                            className="w-full pl-11 pr-4 py-3 bg-shelf/[0.02] border border-shelf/10 focus:border-burgundy/30 transition-all font-body text-sm text-shelf outline-none rounded-sm"
                                        />
                                    </div>
                                    {errors.email && <p className="text-burgundy text-[8px] font-bold uppercase mt-1">{errors.email.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2 mt-4"
                                >
                                    {isPending ? 'Sending...' : (
                                        <>
                                            <Send size={14} />
                                            Send Reset Code
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-4 bg-shelf/[0.02] border border-shelf/5 rounded-sm">
                                    <p className="font-body text-[10px] text-shelf/40 italic leading-relaxed text-center">
                                        We sent a reset code to:
                                        <span className="block text-shelf font-medium not-italic mt-1 break-all uppercase tracking-wider text-[11px]">{sentEmail}</span>
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate(`/vendor/verify-reset-otp?email=${encodeURIComponent(sentEmail)}`)}
                                        className="w-full library-button py-4 text-[10px] flex items-center justify-center gap-2"
                                    >
                                        Enter Code
                                    </button>

                                    <button
                                        onClick={() => { setSent(false); setSentEmail('') }}
                                        className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-shelf/40 hover:text-burgundy transition-colors"
                                    >
                                        Use different email
                                    </button>
                                </div>
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
