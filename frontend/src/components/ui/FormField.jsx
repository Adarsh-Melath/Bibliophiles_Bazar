const FormField = ({ 
  label, 
  error, 
  required = false, 
  children, 
  helperText,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="form-error">{error}</p>}
      {helperText && !error && <p className="text-xs text-library/60 mt-1">{helperText}</p>}
    </div>
  )
}

export default FormField
