import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Table, TableRow, TableCell } from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input, { Select } from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Empty from '../components/ui/Empty'
import { TableSkeleton } from '../components/ui/Skeleton'
import type { Doctor, Specialty, CreateDoctorDto } from '../types'
import * as api from '../services/api'
import { toast } from 'sonner'

const specialtyOptions = [
  { value: 'CARDIOLOGY', label: 'Cardiologia' },
  { value: 'NEUROLOGY', label: 'Neurologia' },
  { value: 'PEDIATRICS', label: 'Pediatria' },
  { value: 'ORTHOPEDICS', label: 'Ortopedia' },
  { value: 'GENERAL', label: 'General' },
]

const departmentOptions = [
  { value: '2', label: 'Cardiologia' },
  { value: '3', label: 'Neurologia' },
  { value: '4', label: 'Pediatria' },
  { value: '5', label: 'Ortopedia' },
  { value: '6', label: 'Medicina General' },
]

const specialtyColors: Record<Specialty, 'info' | 'success' | 'warning' | 'danger' | 'default'> = {
  CARDIOLOGY: 'danger',
  NEUROLOGY: 'info',
  PEDIATRICS: 'success',
  ORTHOPEDICS: 'warning',
  GENERAL: 'default',
}

export default function Doctors() {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreateDoctorDto>({
    fullName: '',
    email: '',
    phone: '',
    specialty: 'GENERAL',
    licenseNumber: '',
    departmentId: 0,
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await api.getDoctors()
      setDoctors(response.data)
    } catch (err) {
      console.error('Error conectando con el backend:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await api.createDoctor(formData)
      setDoctors([...doctors, response.data])
      toast.success('Doctor agregado exitosamente')
      setIsAddModalOpen(false)
      resetForm()
    } catch {
      const newDoctor: Doctor = {
        ...formData,
        id: Math.max(...doctors.map(d => d.id), 0) + 1,
        departmentName: departmentOptions.find(d => d.value === formData.departmentId.toString())?.label,
      }
      setDoctors([...doctors, newDoctor])
      toast.success('Doctor agregado (modo demo)')
      setIsAddModalOpen(false)
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteDoctor = async () => {
    if (!selectedDoctor) return
    setSubmitting(true)
    try {
      await api.deleteDoctor(selectedDoctor.id)
      setDoctors(doctors.filter(d => d.id !== selectedDoctor.id))
      toast.success('Doctor eliminado exitosamente')
    } catch {
      setDoctors(doctors.filter(d => d.id !== selectedDoctor.id))
      toast.success('Doctor eliminado (modo demo)')
    } finally {
      setSubmitting(false)
      setIsDeleteModalOpen(false)
      setSelectedDoctor(null)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      specialty: 'GENERAL',
      licenseNumber: '',
      departmentId: 0,
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Doctores</h1>
        </div>
        <TableSkeleton rows={5} cols={7} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Doctores</h1>
          <p className="text-[#64748b]">Gestionar personal medico del hospital</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Agregar Doctor
        </Button>
      </div>

      {/* Doctors Table */}
      {doctors.length === 0 ? (
        <Card>
          <Empty
            title="No hay doctores"
            description="Comienza agregando tu primer doctor al sistema"
            action={
              <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Agregar Doctor
              </Button>
            }
          />
        </Card>
      ) : (
        <Table headers={['ID', 'Nombre Completo', 'Email', 'Especialidad', 'Departamento', 'Licencia', 'Acciones']}>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>#{doctor.id}</TableCell>
              <TableCell className="font-medium">{doctor.fullName}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                <Badge variant={specialtyColors[doctor.specialty]}>
                  {specialtyOptions.find(s => s.value === doctor.specialty)?.label || doctor.specialty}
                </Badge>
              </TableCell>
              <TableCell>{doctor.departmentName}</TableCell>
              <TableCell className="font-mono text-xs">{doctor.licenseNumber}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedDoctor(doctor)
                    setIsDeleteModalOpen(true)
                  }}
                >
                  <Trash2 className="w-4 h-4 text-[#ef4444]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Nuevo Doctor"
      >
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <Input
            label="Nombre Completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ej: Dr. Carlos Mendez"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Ej: cmendez@hospital.com"
            required
          />
          <Input
            label="Telefono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ej: +34 612 345 678"
            required
          />
          <Select
            label="Especialidad"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value as Specialty })}
            options={specialtyOptions}
            required
          />
          <Input
            label="Numero de Licencia"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="Ej: MD-001"
            required
          />
          <Select
            label="Departamento"
            value={formData.departmentId.toString()}
            onChange={(e) => setFormData({ ...formData, departmentId: parseInt(e.target.value) })}
            options={departmentOptions}
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              Agregar Doctor
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminacion"
        size="sm"
      >
        <p className="text-[#64748b] mb-6">
          Estas seguro que deseas eliminar al doctor <strong className="text-[#f1f5f9]">{selectedDoctor?.fullName}</strong>? Esta accion no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteDoctor} loading={submitting}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
