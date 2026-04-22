import { forwardRef } from 'react'

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:scale-95',
  secondary: 'bg-white text-heading border border-accent hover:bg-background',
  outline: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'text-primary hover:bg-primary/10',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
  success: 'bg-green-500 text-white hover:bg-green-600 active:scale-95',
}

const buttonSizes = {
  xs: 'px-3 py-1 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
  full: 'w-full px-5 py-3',
}

const Button = forwardRef(
  ({ children, variant = 'primary', size = 'md', className = '', disabled = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-button font-semibold tracking-wide transition-smooth disabled:opacity-60 disabled:cursor-not-allowed'
    const variantClasses = buttonVariants[variant] || buttonVariants.primary
    const sizeClasses = buttonSizes[size] || buttonSizes.md

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
