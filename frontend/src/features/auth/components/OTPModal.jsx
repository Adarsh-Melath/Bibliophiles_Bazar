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
            <div className="fixed inset-0 bg-shelf/40 backdrop-blur-[2px] flex items-center justify-center z-[100] px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="library-panel bg-paper w-full max-w-sm relative p-0 overflow-hidden shadow-shelf"
                >
                    {/* Archival Header Decoration */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-burgundy via-shelf to-burgundy" />

                    <div className="p-8">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            disabled={isPending}
                            className="absolute top-6 right-6 text-shelf/30 hover:text-burgundy transition-all duration-300"
                        >
                            <X size={20} />
                        </button>

                        {/* Icon/Identity Header */}
                        <div className="w-14 h-14 rounded-sm bg-shelf/5 flex items-center justify-center mb-4 border border-shelf/5 shadow-inner">
                            <Mail size={24} className="text-burgundy" />
                        </div>
                        <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-2">Verification Required</span>
                        <h3 className="font-heading text-2xl font-bold text-shelf tracking-tight">
                            Registry Audit
                        </h3>
                        <div className="mt-2 p-3 bg-shelf/[0.02] border border-shelf/5 rounded-sm w-full">
                            <p className="font-body text-[11px] text-shelf/40 italic leading-relaxed">
                                A 6-digit access sequence has been dispatched to:
                                <span className="block text-shelf font-medium not-italic mt-1 break-all">{email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Error Handling */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-burgundy/5 border-l-4 border-burgundy text-burgundy text-[10px] font-bold uppercase tracking-widest px-6 py-4 mb-6"
                        >
                            {error.response?.data?.error || 'Authorization Sequence Failed'}
                        </motion.div>
                    )}

                    {/* OTP Input Registry */}
                    <div className="flex justify-between gap-3 mb-6" onPaste={handlePaste}>
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
                                               text-center text-3xl font-heading font-bold
                                               border-shelf/10 text-shelf
                                               focus:outline-none focus:border-burgundy
                                               transition-all duration-300 placeholder:text-shelf/10"
                                placeholder="0"
                            />
                        ))}
                    </div>

                    {/* Dynamic Progress/Action Button */}
                    <button
                        onClick={() => verify({ email, code: otpValue })}
                        disabled={isPending || otpValue.length !== 6}
                        className="w-full library-button bg-shelf text-paper py-4 rounded-sm shadow-shelf 
                                       flex items-center justify-center gap-3 group disabled:opacity-30 disabled:grayscale transition-all duration-500"
                    >
                        <ShieldCheck size={18} className="group-hover:text-burgundy transition-colors" />
                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold">
                            {isPending ? 'Validating Sequence...' : 'Authorize Access'}
                        </span>
                    </button>

                    {/* Resend Protocol */}
                    <div className="mt-6 text-center">
                        {countdown > 0 ? (
                            <div className="flex items-center justify-center gap-3 text-shelf/40 font-ui text-[10px] uppercase font-bold tracking-widest">
                                <Timer size={14} className="animate-spin-slow" />
                                <span>Protocol refresh in {countdown}s</span>
                            </div>
                        ) : (
                            <button
                                onClick={() => resend()}
                                disabled={isResending}
                                className="text-burgundy font-ui text-[10px] uppercase font-bold tracking-[0.25em] 
                                               flex items-center justify-center gap-2 mx-auto hover:text-shelf transition-colors group"
                            >
                                <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                                {isResending ? 'Redispatching...' : 'Request New Sequence'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence >
    )
}
