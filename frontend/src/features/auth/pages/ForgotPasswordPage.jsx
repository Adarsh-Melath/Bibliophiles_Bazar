import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, Mail, ArrowLeft, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../../../lib/axios'
import { forgotPasswordSchema } from '../schemas/authSchemas'

export default function ForgotPasswordPage() {
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
                                <Mail size={28} />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-shelf tracking-tight">
                                Forgot Password
                            </h1>
                            <div className="h-0.5 w-12 bg-burgundy mt-2 mb-4"></div>
                            <p className="font-body text-[11px] text-shelf/40 uppercase tracking-[0.2em] font-bold">
                                Security Check
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
                                        placeholder="reader@library.com"
                                        className="w-full px-5 py-4 bg-paper border border-shelf/15 text-shelf font-body placeholder:text-shelf/20
                                                   focus:outline-none focus:border-burgundy
                                                   transition-all duration-300"
                                    />
                                    {errors.email && (
                                        <p className="text-burgundy text-[10px] font-bold uppercase mt-2 tracking-wide">{errors.email.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isPending ? 'Sending...' : (
                                        <>
                                            <Send size={16} />
                                            Send Reset Code
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
                                        onClick={() => navigate(`/verify-reset-otp?email=${encodeURIComponent(sentEmail)}`)}
                                        className="w-full py-4 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-xs hover:bg-burgundy transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                                    >
                                        Enter Code
                                    </button>

                                    <button
                                        onClick={() => { setSent(false); setSentEmail('') }}
                                        className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-shelf/40 hover:text-burgundy transition-colors"
                                    >
                                        Use different email
                                    </button>
                                </div>
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