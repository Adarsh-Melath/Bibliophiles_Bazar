import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(
  ({ 
    options = [], 
    placeholder = 'Select an option', 
    error = false,
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = 'input-base appearance-none pr-10 cursor-pointer'
    const errorClasses = error ? 'border-red-500 focus:ring-red-200' : ''
    
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent"
        />
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
