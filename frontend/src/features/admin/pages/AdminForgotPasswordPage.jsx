import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, Mail, ArrowLeft, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../../../lib/axios'
import { adminForgotPasswordSchema } from '../schemas/adminSchema'

export default function AdminForgotPasswordPage() {
    const [sentEmail, setSentEmail] = useState('')
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(adminForgotPasswordSchema),
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
        <div className="h-screen bg-paper flex items-center justify-center p-6 relative overflow-hidden selection:bg-burgundy/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, var(--shelf) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative"
            >
                <div className="library-panel bg-paper shadow-shelf overflow-hidden border-shelf/10">
                    <div className="h-1.5 w-full bg-gradient-to-r from-burgundy via-shelf to-burgundy" />

                    <div className="px-10 py-10">
                        {/* Header */}
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="w-16 h-16 bg-shelf/5 rounded-full flex items-center justify-center mb-6 border border-shelf/5 shadow-inner">
                                <Mail size={28} className="text-burgundy" />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                Forgot Password
                            </h1>
                            <p className="font-body text-[11px] text-shelf/40 uppercase tracking-[0.2em] mt-3 font-bold">
                                Admin Access Recovery
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest px-6 py-4">
                                {error.response?.data?.error || 'Email Not Found'}
                            </div>
                        )}

                        {!sent ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block font-ui text-[10px] font-bold text-shelf/40 uppercase tracking-[0.3em] mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="admin@email.com"
                                        className="w-full px-5 py-4 bg-shelf/[0.02] border-b-2 border-shelf/10 text-shelf font-body placeholder-shelf/20
                                                   focus:outline-none focus:border-burgundy focus:bg-shelf/[0.04]
                                                   transition-all duration-300"
                                    />
                                    {errors.email && (
                                        <p className="text-burgundy text-[10px] font-bold uppercase mt-2 tracking-wide">{errors.email.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full library-button bg-shelf text-paper py-4 text-[11px] font-bold uppercase tracking-[0.4em]
                                               flex items-center justify-center gap-3 group disabled:opacity-30 transition-all duration-500 shadow-shelf"
                                >
                                    {isPending ? 'Sending...' : (
                                        <>
                                            <Send size={16} className="group-hover:text-burgundy transition-colors" />
                                            Get Reset Code
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-8">
                                <div className="p-6 bg-shelf/[0.02] border border-shelf/5 rounded-sm">
                                    <p className="font-body text-[11px] text-shelf/40 italic leading-relaxed">
                                        We sent a reset code to:
                                        <span className="block text-shelf font-medium not-italic mt-1 break-all uppercase tracking-wider">{sentEmail}</span>
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => navigate(`/admin/verify-reset-otp?email=${encodeURIComponent(sentEmail)}`)}
                                        className="w-full library-button bg-shelf text-paper py-4 text-[11px] font-bold uppercase tracking-[0.4em]
                                                   flex items-center justify-center gap-3 shadow-shelf"
                                    >
                                        Enter Reset Code
                                    </button>

                                    <button
                                        onClick={() => { setSent(false); setSentEmail('') }}
                                        className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-shelf/40 hover:text-burgundy transition-colors"
                                    >
                                        Use different email
                                    </button>
                                </div>
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
