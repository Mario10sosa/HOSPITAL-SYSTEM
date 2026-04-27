import { useState, useMemo, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'

interface LayoutProps { children: ReactNode }

const pageMetadata: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Visión general del hospital: pacientes, doctores, citas y departamentos en un solo lugar.',
  },
  '/patients': {
    title: 'Pacientes',
    subtitle: 'Administra tu historial de pacientes, registra nuevos ingresos y revisa detalles clínicos.',
  },
  '/doctors': {
    title: 'Doctores',
    subtitle: 'Gestiona el equipo médico, sus especialidades y disponibilidad en el hospital.',
  },
  '/appointments': {
    title: 'Citas',
    subtitle: 'Consulta, filtra y programa citas médicas con total claridad y control.',
  },
  '/departments': {
    title: 'Departamentos',
    subtitle: 'Visualiza la estructura hospitalaria y administra grupos de trabajo fácilmente.',
  },
  '/medications': {
    title: 'Medicamentos',
    subtitle: 'Revisa el inventario farmacéutico y el estado de caché con el patrón Flyweight.',
  },
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const currentPage = useMemo(
    () => pageMetadata[location.pathname] ?? {
      title: 'Hospital',
      subtitle: 'Navega por las funciones del sistema de gestión hospitalaria.',
    },
    [location.pathname]
  )

  return (
    <div className="flex min-h-screen bg-[#edf2f7] text-[#0f172a]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className="flex-1 transition-all duration-300 min-h-screen"
        style={{ marginLeft: collapsed ? '72px' : '256px' }}
      >
        <div className="sticky top-0 z-10 bg-[#ffffffee] backdrop-blur-md border-b border-[#e2e8f0] px-8 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748b] mb-1">
              {currentPage.title === 'Dashboard' ? 'Inicio' : currentPage.title}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
              {currentPage.title}
            </h1>
            <p className="mt-1 text-sm text-[#475569] max-w-2xl">
              {currentPage.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl bg-[#f8fafc] border border-[#e2e8f0] px-4 py-3 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#64748b]">Sección activa</p>
              <p className="font-semibold text-[#0f172a]">{currentPage.title}</p>
            </div>
          </div>
        </div>
        <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  )
}
