import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`
      bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm
      ${hover ? 'card-hover cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color: 'blue' | 'green' | 'amber' | 'red'
  subtitle?: string
}

const colorClasses = {
  blue:  { bg: 'bg-[#eff6ff]',  text: 'text-[#2563eb]',  val: 'text-[#1d4ed8]' },
  green: { bg: 'bg-[#f0fdf4]',  text: 'text-[#059669]',  val: 'text-[#047857]' },
  amber: { bg: 'bg-[#fffbeb]',  text: 'text-[#d97706]',  val: 'text-[#b45309]' },
  red:   { bg: 'bg-[#fef2f2]',  text: 'text-[#dc2626]',  val: 'text-[#b91c1c]' },
}

export function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  const c = colorClasses[color]
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#64748b] text-sm font-500 mb-1">{title}</p>
          <p className={`text-4xl font-700 ${c.val} mt-1`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-[#94a3b8] mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${c.bg} ${c.text}`}>
          {icon}
        </div>
      </div>
    </Card>
  )
}