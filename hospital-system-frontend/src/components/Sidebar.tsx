import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Stethoscope,
  CalendarDays, Building2, Pill, Activity
} from 'lucide-react'

const navItems = [
  { path: '/',             label: 'Dashboard',     icon: LayoutDashboard },
  { path: '/patients',     label: 'Pacientes',     icon: Users },
  { path: '/doctors',      label: 'Doctores',      icon: Stethoscope },
  { path: '/appointments', label: 'Citas',         icon: CalendarDays },
  { path: '/departments',  label: 'Departamentos', icon: Building2 },
  { path: '/medications',  label: 'Medicamentos',  icon: Pill },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-white border-r border-[#e2e8f0] flex flex-col transition-all duration-300 z-20 shadow-sm"
      style={{ width: collapsed ? '72px' : '256px' }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-[#e2e8f0] flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 rounded-2xl bg-[#2563eb] flex items-center justify-center flex-shrink-0 shadow-sm">
          <Activity className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-base font-semibold text-[#0f172a] leading-tight">MediSystem</h1>
            <p className="text-xs text-[#64748b]">Hospital Management</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-[0.24em] px-3 mb-3">
            Menú principal
          </p>
        )}
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-150 group overflow-hidden ${
                    isActive
                      ? 'bg-[#eff6ff] text-[#2563eb] font-semibold shadow-sm'
                      : 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#2563eb]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#2563eb] rounded-r-full" />
                    )}
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                    )}
                    {collapsed && (
                      <div className="absolute left-16 bg-[#0f172a] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc]">
          <p className="text-[11px] text-[#94a3b8] text-center uppercase tracking-[0.18em]">
            v1.0.0 · Design Patterns
          </p>
        </div>
      )}
    </aside>
  )
}
