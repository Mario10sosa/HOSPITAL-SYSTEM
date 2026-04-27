import { InputHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-500 text-[#374151]">{label}</label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 text-sm text-[#0f172a]
          bg-white border border-[#e2e8f0] rounded-xl
          placeholder-[#94a3b8] outline-none
          focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]
          transition-all duration-150
          disabled:bg-[#f8fafc] disabled:text-[#94a3b8]
          ${error ? 'border-[#dc2626]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-[#dc2626]">{error}</p>}
    </div>
  )
)

Input.displayName = 'Input'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-500 text-[#374151]">{label}</label>
      )}
      <select
        className={`
          w-full px-4 py-2.5 text-sm text-[#0f172a]
          bg-white border border-[#e2e8f0] rounded-xl
          outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]
          transition-all duration-150
          ${className}
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-500 text-[#374151]">{label}</label>
      )}
      <textarea
        className={`
          w-full px-4 py-2.5 text-sm text-[#0f172a]
          bg-white border border-[#e2e8f0] rounded-xl resize-none
          outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]
          transition-all duration-150
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-[#dc2626]">{error}</p>}
    </div>
  )
}

export default Input