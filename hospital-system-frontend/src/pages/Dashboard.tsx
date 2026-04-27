import { useState, useEffect } from 'react'
import { Users, Stethoscope, CalendarDays, Building2, Pill } from 'lucide-react'
import { Card, StatCard } from '../components/ui/Card'
import { Table, TableRow, TableCell } from '../components/ui/Table'
import Badge, { PatternBadge } from '../components/ui/Badge'
import { CardSkeleton, TableSkeleton, Skeleton } from '../components/ui/Skeleton'
import * as api from '../services/api'

interface DashboardStats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  pendingAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  totalDepartments: number
  totalMedications: number
  medicationCacheSize: number
}

interface Appointment {
  id: number
  patientName: string
  doctorName: string
  dateTime: string
  reason: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  notificationChannel: string
}

interface Department {
  id: number
  name: string
  type: 'GROUP' | 'LEAF'
  parentId: number | null
  children?: Department[]
  memberCount?: number
}

interface Medication {
  id: number
  name: string
  dosage: string
}

const statusBadgeVariant: Record<string, 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'danger',
}

function DepartmentTree({ departments, level = 0 }: {
  departments: Department[]
  level?: number
}) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-1">
      {departments.map((dept) => (
        <div key={dept.id}>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/[0.05] transition-colors"
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => dept.children && toggleExpand(dept.id)}
          >
            {dept.type === 'GROUP' ? (
              <span className="text-[#3b82f6]">
                {dept.children && dept.children.length > 0
                  ? (expanded[dept.id] ? '📂' : '📁')
                  : '📦'}
              </span>
            ) : (
              <span className="text-[#10b981]">👤</span>
            )}
            <span className="text-sm text-[#f1f5f9] flex-1">{dept.name}</span>
            {dept.type === 'GROUP' && dept.memberCount !== undefined && (
              <Badge variant="info">{dept.memberCount}</Badge>
            )}
          </div>
          {dept.children && expanded[dept.id] && (
            <DepartmentTree departments={dept.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [medications, setMedications] = useState<Medication[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appointmentsRes, deptRes, medsRes] = await Promise.all([
          api.getDashboardStats(),
          api.getAppointments(),
          api.getDepartmentTree(),
          api.getMedications(),
        ])
        setStats(statsRes.data)
        setAppointments(appointmentsRes.data.slice(0, 5))
        setDepartments(deptRes.data)
        setMedications(medsRes.data.slice(0, 5))
      } catch (err) {
        console.error('Error conectando con el backend:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TableSkeleton rows={5} cols={5} />
          </div>
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f1f5f9]">Dashboard</h1>
        <p className="text-[#64748b]">Bienvenido al sistema de gestión hospitalaria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pacientes"
          value={stats?.totalPatients ?? 0}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Doctores"
          value={stats?.totalDoctors ?? 0}
          icon={<Stethoscope className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Citas Pendientes"
          value={stats?.pendingAppointments ?? 0}
          icon={<CalendarDays className="w-6 h-6" />}
          color="amber"
        />
        <StatCard
          title="Departamentos"
          value={stats?.totalDepartments ?? 0}
          icon={<Building2 className="w-6 h-6" />}
          color="red"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#f1f5f9]">Citas Recientes</h2>
            <PatternBadge pattern="FACADE" />
          </div>
          {appointments.length === 0 ? (
            <p className="text-[#64748b] text-center py-8">
              No hay citas aún. Crea la primera desde Postman.
            </p>
          ) : (
            <Table headers={['Paciente', 'Doctor', 'Fecha', 'Razón', 'Estado']}>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.patientName}
                  </TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>
                    {new Date(appointment.dateTime).toLocaleString('es-ES', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[appointment.status]}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </Card>

        {/* Department Tree */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#f1f5f9]">Estructura</h2>
            <PatternBadge pattern="COMPOSITE" />
          </div>
          {departments.length === 0 ? (
            <p className="text-[#64748b] text-center py-8">Sin departamentos</p>
          ) : (
            <DepartmentTree departments={departments} />
          )}
        </Card>
      </div>

      {/* Medications */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Pill className="w-5 h-5 text-[#3b82f6]" />
            <h2 className="text-lg font-semibold text-[#f1f5f9]">
              Medicamentos Más Usados
            </h2>
          </div>
          <PatternBadge pattern="FLYWEIGHT" />
        </div>
        {medications.length === 0 ? (
          <p className="text-[#64748b] text-center py-4">Sin medicamentos</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {medications.map((med, index) => (
              <div
                key={med.id}
                className="p-4 bg-[#0d1528] rounded-lg border border-white/[0.08] hover:border-[#3b82f6]/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-[#3b82f6]">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-[#f1f5f9]">{med.name}</span>
                </div>
                <p className="text-xs text-[#64748b]">{med.dosage}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
