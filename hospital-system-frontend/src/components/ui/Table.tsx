import { ReactNode } from 'react'

interface TableProps {
  headers: string[]
  children: ReactNode
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#e2e8f0]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 text-xs font-600 text-[#94a3b8] uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {children}
        </tbody>
      </table>
    </div>
  )
}

interface TableRowProps {
  children: ReactNode
  onClick?: () => void
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={`
        transition-colors duration-100
        hover:bg-[#f8fafc]
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {children}
    </tr>
  )
}

interface TableCellProps {
  children: ReactNode
  className?: string
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`py-3.5 px-4 text-[#374151] text-sm ${className}`}>
      {children}
    </td>
  )
}