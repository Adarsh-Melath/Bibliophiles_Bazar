import { forwardRef } from 'react'

const Input = forwardRef(
  ({ 
    type = 'text', 
    placeholder = '', 
    error = false, 
    icon: Icon = null, 
    iconPosition = 'left',
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = 'w-full bg-transparent border-b border-shelf/10 py-3 font-body text-base text-shelf placeholder:text-shelf/20 focus:border-burgundy focus:outline-none transition-all duration-300'
    const errorClasses = error ? 'border-burgundy focus:border-burgundy' : ''
    const paddingClasses = Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''

    return (
      <div className="relative w-full group">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} ${paddingClasses} ${className}`}
          {...props}
        />
        {Icon && (
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
              iconPosition === 'left' ? 'left-2' : 'right-2'
            }`}>
            <Icon 
              size={16} 
              className={`text-shelf/20 group-focus-within:text-burgundy transition-colors`}
            />
          </div>
        )}
        
        {/* Subtle bottom highlight bar */}
        <div className="absolute bottom-0 left-0 w-0 h-px bg-burgundy group-focus-within:w-full transition-all duration-500 ease-out" />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
