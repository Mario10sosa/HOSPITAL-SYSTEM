import { ReactNode, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm hover:shadow-md',
  secondary: 'bg-white hover:bg-[#f8fafc] text-[#374151] border border-[#e2e8f0] hover:border-[#93c5fd] shadow-sm',
  danger:    'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-sm',
  ghost:     'hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#2563eb]',
  success:   'bg-[#059669] hover:bg-[#047857] text-white shadow-sm',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, icon, disabled, className = '', ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-500 rounded-xl
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon ? <span className="w-4 h-4">{icon}</span> : null}
      {children}
    </button>
  )
}