import { useState, useEffect } from 'react'
import { Plus, XCircle, CheckCircle, FlaskConical } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Table, TableRow, TableCell } from '../components/ui/Table'
import Badge, { PatternBadge } from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input, { Select, Textarea } from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Empty from '../components/ui/Empty'
import { TableSkeleton } from '../components/ui/Skeleton'
import type { Appointment, AppointmentStatus, NotificationChannel, CreateAppointmentDto, Patient, Doctor } from '../types'
import * as api from '../services/api'
import { toast } from 'sonner'

const statusFilters: { value: AppointmentStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Todas' },
  { value: 'PENDING', label: 'Pendientes' },
  { value: 'COMPLETED', label: 'Completadas' },
  { value: 'CANCELLED', label: 'Canceladas' },
]

const statusBadgeVariant: Record<AppointmentStatus, 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'danger',
}

export default function Appointments() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filter, setFilter] = useState<AppointmentStatus | 'ALL'>('ALL')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreateAppointmentDto>({
    patientId: 0,
    doctorId: 0,
    dateTime: '',
    reason: '',
    notificationChannel: 'EMAIL',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
        api.getAppointments(),
        api.getPatients(),
        api.getDoctors(),
      ])

      setAppointments(appointmentsRes.data)
      setPatients(patientsRes.data)
      setDoctors(doctorsRes.data)
    } catch (err) {
      console.error('Error conectando con el backend:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await api.createAppointment(formData)
      setAppointments([...appointments, response.data])
      toast.success('Cita creada exitosamente')
      setIsAddModalOpen(false)
      resetForm()
    } catch {
      const patient = patients.find(p => p.id === formData.patientId)
      const doctor = doctors.find(d => d.id === formData.doctorId)
      const newAppointment: Appointment = {
        id: Math.max(...appointments.map(a => a.id), 0) + 1,
        patientId: formData.patientId,
        patientName: patient?.fullName || 'Desconocido',
        doctorId: formData.doctorId,
        doctorName: doctor?.fullName || 'Desconocido',
        dateTime: formData.dateTime,
        reason: formData.reason,
        status: 'PENDING',
        channel: formData.notificationChannel,
      }
      setAppointments([...appointments, newAppointment])
      toast.success('Cita creada (modo demo)')
      setIsAddModalOpen(false)
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelAppointment = async (id: number) => {
    try {
      await api.cancelAppointment(id)
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: 'CANCELLED' as AppointmentStatus } : a
      ))
      toast.success('Cita cancelada')
    } catch {
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: 'CANCELLED' as AppointmentStatus } : a
      ))
      toast.success('Cita cancelada (modo demo)')
    }
  }

  const handleCompleteAppointment = async (id: number) => {
    try {
      await api.completeAppointment(id)
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: 'COMPLETED' as AppointmentStatus } : a
      ))
      toast.success('Cita completada')
    } catch {
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: 'COMPLETED' as AppointmentStatus } : a
      ))
      toast.success('Cita completada (modo demo)')
    }
  }

  const handleLabRequest = async (appointmentId: number) => {
    try {
      await api.requestLab(appointmentId)
      toast.success('Solicitud de laboratorio enviada')
    } catch {
      toast.success('Solicitud de laboratorio enviada (modo demo)')
    }
  }

  const resetForm = () => {
    setFormData({
      patientId: 0,
      doctorId: 0,
      dateTime: '',
      reason: '',
      notificationChannel: 'EMAIL',
    })
  }

  const filteredAppointments = filter === 'ALL' 
    ? appointments 
    : appointments.filter(a => a.status === filter)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Citas</h1>
        </div>
        <TableSkeleton rows={5} cols={8} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Citas</h1>
          <p className="text-[#64748b]">Gestionar citas medicas</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Nueva Cita
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {statusFilters.map((statusFilter) => (
          <button
            key={statusFilter.value}
            onClick={() => setFilter(statusFilter.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${filter === statusFilter.value
                ? 'bg-[#3b82f6] text-white'
                : 'bg-[#111827] text-[#64748b] hover:text-[#f1f5f9] border border-white/[0.08]'
              }
            `}
          >
            {statusFilter.label}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      {filteredAppointments.length === 0 ? (
        <Card>
          <Empty
            title="No hay citas"
            description={filter === 'ALL' ? 'Comienza creando tu primera cita' : `No hay citas con estado "${statusFilters.find(s => s.value === filter)?.label}"`}
            action={
              filter === 'ALL' && (
                <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                  Nueva Cita
                </Button>
              )
            }
          />
        </Card>
      ) : (
        <Table headers={['ID', 'Paciente', 'Doctor', 'Fecha/Hora', 'Razon', 'Estado', 'Canal', 'Acciones']}>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>#{appointment.id}</TableCell>
              <TableCell className="font-medium">{appointment.patientName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>
                {new Date(appointment.dateTime).toLocaleString('es-ES', { 
                  dateStyle: 'short', 
                  timeStyle: 'short' 
                })}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{appointment.reason}</TableCell>
              <TableCell>
                <Badge variant={statusBadgeVariant[appointment.status]}>
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Badge variant="info">{appointment.notificationChannel}</Badge>
                  <PatternBadge pattern="BRIDGE" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {appointment.status === 'PENDING' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCompleteAppointment(appointment.id)}
                        title="Completar"
                      >
                        <CheckCircle className="w-4 h-4 text-[#10b981]" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        title="Cancelar"
                      >
                        <XCircle className="w-4 h-4 text-[#ef4444]" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLabRequest(appointment.id)}
                        title="Solicitar Lab"
                      >
                        <FlaskConical className="w-4 h-4 text-[#3b82f6]" />
                        <PatternBadge pattern="ADAPTER" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* Add Appointment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nueva Cita"
        size="lg"
      >
        <form onSubmit={handleAddAppointment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Paciente"
              value={formData.patientId.toString()}
              onChange={(e) => setFormData({ ...formData, patientId: parseInt(e.target.value) })}
              options={patients.map(p => ({ value: p.id.toString(), label: p.fullName }))}
              required
            />
            <Select
              label="Doctor"
              value={formData.doctorId.toString()}
              onChange={(e) => setFormData({ ...formData, doctorId: parseInt(e.target.value) })}
              options={doctors.map(d => ({ value: d.id.toString(), label: d.fullName }))}
              required
            />
          </div>
          <Input
            label="Fecha y Hora"
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            required
          />
          <Textarea
            label="Razon de la Cita"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Describa el motivo de la consulta..."
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#f1f5f9]">
              Canal de Notificacion
            </label>
            <div className="flex items-center gap-2">
              <PatternBadge pattern="BRIDGE" />
              <span className="text-xs text-[#64748b]">Patron Bridge para multiples canales</span>
            </div>
            <div className="flex gap-4">
              {(['EMAIL', 'SMS'] as NotificationChannel[]).map((channel) => (
                <label 
                  key={channel}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all flex-1
                    ${formData.notificationChannel === channel
                      ? 'bg-[#3b82f6]/10 border-[#3b82f6]'
                      : 'bg-[#0d1528] border-white/[0.08] hover:border-white/[0.15]'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="channel"
                    value={channel}
                    checked={formData.notificationChannel === channel}
                    onChange={(e) => setFormData({ ...formData, notificationChannel: e.target.value as NotificationChannel })}
                    className="w-4 h-4 text-[#3b82f6] bg-[#0d1528] border-white/[0.08] focus:ring-[#3b82f6]"
                  />
                  <span className="text-[#f1f5f9]">{channel}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              Crear Cita
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
