import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'pattern'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#f1f5f9] text-[#64748b]',
  success: 'bg-[#f0fdf4] text-[#059669] border border-[#bbf7d0]',
  warning: 'bg-[#fffbeb] text-[#d97706] border border-[#fde68a]',
  danger:  'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]',
  info:    'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]',
  pattern: 'bg-[#f5f3ff] text-[#7c3aed] border border-[#ddd6fe]',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-600
      ${variantClasses[variant]} ${className}
    `}>
      {children}
    </span>
  )
}

type PatternType = 'FACADE' | 'ADAPTER' | 'BRIDGE' | 'COMPOSITE' | 'DECORATOR' | 'FLYWEIGHT' | 'PROXY'

const patternColors: Record<PatternType, string> = {
  FACADE:    'bg-[#f5f3ff] text-[#7c3aed] border border-[#ddd6fe]',
  ADAPTER:   'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]',
  BRIDGE:    'bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]',
  COMPOSITE: 'bg-[#f0fdf4] text-[#059669] border border-[#bbf7d0]',
  DECORATOR: 'bg-[#fefce8] text-[#ca8a04] border border-[#fef08a]',
  FLYWEIGHT: 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]',
  PROXY:     'bg-[#fdf4ff] text-[#9333ea] border border-[#e9d5ff]',
}

interface PatternBadgeProps { pattern: PatternType }

export function PatternBadge({ pattern }: PatternBadgeProps) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-700 uppercase tracking-wider
      ${patternColors[pattern]}
    `}>
      {pattern}
    </span>
  )
}