import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Mail, X, RotateCcw, ShieldCheck, Timer } from 'lucide-react'
import api from '../../../lib/axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function OtpModal({ email, onVerified, onClose }) {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [countdown, setCountdown] = useState(60)
    const inputs = useRef([])

    const otpValue = otp.join('')

    const { mutate: verify, isPending, error } = useMutation({
        mutationFn: (data) => api.post('/auth/verifyotp', data),
        onSuccess: onVerified,
    })

    const { mutate: resend, isPending: isResending } = useMutation({
        mutationFn: () => api.post('/auth/resend-otp', { email }),
        onSuccess: () => {
            setCountdown(60)
            setOtp(['', '', '', '', '', ''])
        },
    })

    useEffect(() => {
        if (countdown === 0) return
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [countdown])

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 5) inputs.current[index + 1]?.focus()
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        if (pasted.length === 6) {
            setOtp(pasted.split(''))
            inputs.current[5]?.focus()
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-ink/80 backdrop-blur-md flex items-center justify-center z-[100] px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="editorial-card w-full max-w-md relative !p-0 overflow-hidden shadow-2xl shadow-ink/40 bg-paper"
                >
                    {/* Archival Header Decoration */}
                    <div className="h-1.5 w-full bg-ink" />

                    <div className="p-10 md:p-12">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            disabled={isPending}
                            className="absolute top-8 right-8 text-ink/20 hover:text-gold transition-all duration-500"
                        >
                            <X size={22} />
                        </button>

                        {/* Icon/Identity Header */}
                        <div className="w-16 h-16 rounded-full bg-ink/[0.03] border border-ink/[0.05] flex items-center justify-center mb-8 shadow-inner">
                            <Mail size={28} className="text-gold" />
                        </div>
                        
                        <div className="space-y-2 mb-10">
                            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.5em] text-gold block">Identity Audit</span>
                            <h3 className="text-4xl font-bold text-ink tracking-tighter">
                                Verification Required
                            </h3>
                        </div>

                        <div className="mb-10 p-6 bg-ink/[0.02] border border-ink/[0.05] rounded-sm">
                            <p className="font-ui text-[11px] text-ink/40 uppercase tracking-widest font-bold leading-relaxed">
                                A 6-digit access sequence has been dispatched to your registry:
                                <span className="block text-ink font-bold not-italic mt-2 break-all text-sm">{email}</span>
                            </p>
                        </div>

                        {/* Error Handling */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-velvet/5 border border-velvet/10 text-velvet text-[10px] font-bold uppercase tracking-widest px-6 py-4 mb-8 text-center"
                            >
                                {error.response?.data?.error || 'Authorization Sequence Failed'}
                            </motion.div>
                        )}

                        {/* OTP Input Registry */}
                        <div className="flex justify-between gap-4 mb-10" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => inputs.current[i] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(e.target.value, i)}
                                    onKeyDown={e => handleKeyDown(e, i)}
                                    className="w-full aspect-[4/5] bg-transparent border-b-2 
                                                   text-center text-4xl font-heading font-bold
                                                   border-ink/10 text-ink
                                                   focus:outline-none focus:border-gold
                                                   transition-all duration-500 placeholder:text-ink/5"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        {/* Dynamic Progress/Action Button */}
                        <button
                            onClick={() => verify({ email, code: otpValue })}
                            disabled={isPending || otpValue.length !== 6}
                            className="w-full py-5 bg-ink text-white font-ui font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-gold transition-all duration-700 shadow-2xl shadow-ink/20 disabled:opacity-20 disabled:grayscale group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                                {isPending ? 'Validating Sequence...' : 'Authorize Access'}
                            </span>
                        </button>

                        {/* Resend Protocol */}
                        <div className="mt-10 text-center">
                            {countdown > 0 ? (
                                <div className="flex items-center justify-center gap-3 text-ink/20 font-ui text-[9px] uppercase font-bold tracking-[0.3em]">
                                    <Timer size={14} className="animate-spin-slow" />
                                    <span>Sequence refresh in {countdown}s</span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => resend()}
                                    disabled={isResending}
                                    className="text-gold font-ui text-[10px] uppercase font-bold tracking-[0.3em] 
                                                   flex items-center justify-center gap-2 mx-auto hover:text-ink transition-all duration-500 group"
                                >
                                    <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
                                    {isResending ? 'Redispatching...' : 'Request New Sequence'}
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Bottom Aesthetic Accent */}
                    <div className="bg-ink/[0.02] py-4 border-t border-ink/[0.05] text-center">
                        <p className="text-[8px] uppercase tracking-[0.5em] font-bold text-ink/10">Archive Security Protocol v2.4</p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence >
    )
}
