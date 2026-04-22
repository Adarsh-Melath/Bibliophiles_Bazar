const badgeVariants = {
  default: 'bg-shelf/5 text-shelf/60 border-shelf/5',
  success: 'bg-green-800/5 text-green-900 border-green-800/10',
  warning: 'bg-amber-900/5 text-amber-900 border-amber-900/10',
  error: 'bg-burgundy/10 text-burgundy border-burgundy/10',
  info: 'bg-shelf text-paper border-shelf',
  outline: 'bg-transparent border-shelf/20 text-shelf/40',
}

const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-sm border text-[9px] font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap'
  const variantClasses = badgeVariants[variant] || badgeVariants.default

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
