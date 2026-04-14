import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Mail, X, RotateCcw, ShieldCheck } from 'lucide-react'
import api from '../../../lib/axios'

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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative overflow-hidden">

                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#9CAF88] to-[#548C8C]" />

                <div className="p-8">

                    {/* Close */}
                    <button onClick={onClose}
                        className="absolute top-5 right-5 text-[#D7CCC8] hover:text-[#548C8C] transition-colors">
                        <X size={20} />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-[#EFEBE9] flex items-center justify-center">
                            <Mail size={28} className="text-[#9CAF88]" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h3 className="font-heading text-xl text-[#548C8C] font-bold mb-1">
                            Verify your email
                        </h3>
                        <p className="font-body text-sm text-[#548C8C]/60">
                            We sent a 6-digit code to
                        </p>
                        <p className="font-body text-sm text-[#548C8C] font-semibold mt-0.5">
                            {email}
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-500 text-sm text-center px-4 py-2 rounded-xl mb-4">
                            {error.response?.data?.error || 'Invalid OTP. Please try again.'}
                        </div>
                    )}

                    {/* OTP Boxes */}
                    <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
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
                                className="w-11 h-12 rounded-lg border-2 text-center text-xl font-bold font-body
                           text-[#548C8C] bg-[#EFEBE9] outline-none
                           transition-all duration-200"
                                style={{
                                    borderColor: digit ? '#9CAF88' : '#D7CCC8',
                                    background: digit ? '#f0f5ed' : '#EFEBE9',
                                }}
                            />
                        ))}
                    </div>

                    {/* Verify button */}
                    <button
                        onClick={() => verify({ email, code: otpValue })}
                        disabled={isPending || otpValue.length !== 6}
                        className="w-full py-3 rounded-xl bg-[#9CAF88] text-white font-button
                       font-semibold flex items-center justify-center gap-2
                       hover:bg-[#8a9d76] active:scale-95 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <ShieldCheck size={18} />
                        {isPending ? 'Verifying...' : 'Verify Email'}
                    </button>

                    {/* Resend */}
                    <div className="text-center mt-5">
                        {countdown > 0 ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex-1 bg-[#EFEBE9] rounded-full h-1">
                                    <div className="bg-[#9CAF88] h-1 rounded-full transition-all duration-1000"
                                        style={{ width: `${(countdown / 60) * 100}%` }} />
                                </div>
                                <span className="font-body text-xs text-[#548C8C]/50 whitespace-nowrap">
                                    {countdown}s
                                </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => resend()}
                                disabled={isResending}
                                className="font-body text-sm text-[#9CAF88] font-medium
                           flex items-center justify-center gap-1.5 mx-auto
                           hover:text-[#548C8C] transition-colors">
                                <RotateCcw size={14} />
                                {isResending ? 'Sending...' : 'Resend OTP'}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
