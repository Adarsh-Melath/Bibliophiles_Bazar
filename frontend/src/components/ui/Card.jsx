import { forwardRef } from 'react'

const cardVariants = {
  default: 'border-shelf/5 bg-paper/50 shadow-soft backdrop-blur-sm',
  elevated: 'border-shelf/10 bg-paper shadow-medium hover:shadow-shelf/5 transition-all duration-500',
  flat: 'border-shelf/5 bg-transparent shadow-none',
  gradient: 'border-burgundy/10 bg-gradient-to-br from-paper via-paper to-burgundy/5',
}

const Card = forwardRef(
  ({ children, variant = 'default', className = '', ...props }, ref) => {
    const baseClasses = 'relative overflow-hidden rounded-sm border p-8 transition-smooth'
    const variantClasses = cardVariants[variant] || cardVariants.default

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {/* Subtle Archival Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03]" />
        
        {/* Decorative Corner Trim */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-burgundy/10" />
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-burgundy/10" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-8 flex flex-col gap-2 border-b border-shelf/5 pb-6 ${className}`}>
    {children}
  </div>
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-heading text-xl font-bold text-shelf tracking-tight ${className}`}>
    {children}
  </h3>
)
CardTitle.displayName = 'CardTitle'

const CardDescription = ({ children, className = '' }) => (
  <p className={`font-ui text-[10px] font-bold text-shelf/30 uppercase tracking-[0.2em] ${className}`}>
    {children}
  </p>
)
CardDescription.displayName = 'CardDescription'

const CardContent = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    {children}
  </div>
)
CardContent.displayName = 'CardContent'

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-8 flex items-center gap-4 border-t border-shelf/5 pt-6 ${className}`}>
    {children}
  </div>
)
CardFooter.displayName = 'CardFooter'

export default Card
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
