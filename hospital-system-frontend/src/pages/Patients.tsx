import { useState, useEffect } from 'react'
import { Plus, FileText, Package, Trash2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Table, TableRow, TableCell } from '../components/ui/Table'
import Badge, { PatternBadge } from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input, { Select } from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Empty from '../components/ui/Empty'
import { TableSkeleton } from '../components/ui/Skeleton'
import type { Patient, BloodType, CreatePatientDto, MedicalRecord, ServiceOption } from '../types'
import * as api from '../services/api'
import { toast } from 'sonner'

const bloodTypeOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
]

const initialServices: ServiceOption[] = [
  { id: 'insurance', name: 'Seguro', price: 50, selected: false },
  { id: 'lab', name: 'Prueba de Laboratorio', price: 80, selected: false },
  { id: 'medication', name: 'Medicamentos', price: 30, selected: false },
]

export default function Patients() {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState<Patient[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false)
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null)
  const [services, setServices] = useState<ServiceOption[]>(initialServices)
  const [submitting, setSubmitting] = useState(false)
  const [loadingRecord, setLoadingRecord] = useState(false)

  const [formData, setFormData] = useState<CreatePatientDto>({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    bloodType: 'A+',
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await api.getPatients()
      setPatients(response.data)
    } catch (err) {
      console.error('Error conectando con el backend:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await api.createPatient(formData)
      setPatients([...patients, response.data])
      toast.success('Paciente agregado exitosamente')
      setIsAddModalOpen(false)
      resetForm()
    } catch {
      // Demo mode: add locally
      const newPatient: Patient = {
        ...formData,
        id: Math.max(...patients.map(p => p.id), 0) + 1,
      }
      setPatients([...patients, newPatient])
      toast.success('Paciente agregado (modo demo)')
      setIsAddModalOpen(false)
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePatient = async () => {
    if (!selectedPatient) return
    setSubmitting(true)
    try {
      await api.deletePatient(selectedPatient.id)
      setPatients(patients.filter(p => p.id !== selectedPatient.id))
      toast.success('Paciente eliminado exitosamente')
    } catch {
      setPatients(patients.filter(p => p.id !== selectedPatient.id))
      toast.success('Paciente eliminado (modo demo)')
    } finally {
      setSubmitting(false)
      setIsDeleteModalOpen(false)
      setSelectedPatient(null)
    }
  }

  const handleViewMedicalRecord = async (patient: Patient) => {
    setSelectedPatient(patient)
    setLoadingRecord(true)
    setIsMedicalRecordModalOpen(true)
    
    try {
      const response = await api.getMedicalRecord(patient.id)
      setMedicalRecord(response.data)
    } catch {
      // Mock data for demo
      setMedicalRecord({
        id: 1,
        patientId: patient.id,
        diagnosis: 'Hipertension arterial leve',
        treatment: 'Losartan 50mg diario, dieta baja en sodio',
        notes: 'Paciente con buena evolucion. Proxima revision en 3 meses.',
        createdAt: '2024-01-10T10:30:00',
      })
    } finally {
      setLoadingRecord(false)
    }
  }

  const handleOpenServices = (patient: Patient) => {
    setSelectedPatient(patient)
    setServices(initialServices.map(s => ({ ...s, selected: false })))
    setIsServicesModalOpen(true)
  }

  const toggleService = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, selected: !s.selected } : s
    ))
  }

  const handleAddServices = async () => {
    if (!selectedPatient) return
    const selectedServices = services.filter(s => s.selected).map(s => s.id)
    
    setSubmitting(true)
    try {
      await api.addPatientServices(selectedPatient.id, selectedServices)
      toast.success('Servicios agregados exitosamente')
    } catch {
      toast.success('Servicios agregados (modo demo)')
    } finally {
      setSubmitting(false)
      setIsServicesModalOpen(false)
    }
  }

  const totalPrice = services.filter(s => s.selected).reduce((sum, s) => sum + s.price, 0)

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      birthDate: '',
      bloodType: 'A+',
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Pacientes</h1>
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
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Pacientes</h1>
          <p className="text-[#64748b]">Gestionar pacientes del hospital</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Agregar Paciente
        </Button>
      </div>

      {/* Patients Table */}
      {patients.length === 0 ? (
        <Card>
          <Empty
            title="No hay pacientes"
            description="Comienza agregando tu primer paciente al sistema"
            action={
              <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Agregar Paciente
              </Button>
            }
          />
        </Card>
      ) : (
        <Table headers={['ID', 'Nombre Completo', 'Email', 'Telefono', 'Fecha Nacimiento', 'Tipo Sangre', 'Acciones']}>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>#{patient.id}</TableCell>
              <TableCell className="font-medium">{patient.fullName}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{new Date(patient.birthDate).toLocaleDateString('es-ES')}</TableCell>
              <TableCell>
                <Badge variant="info">{patient.bloodType}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewMedicalRecord(patient)}
                    title="Ver Expediente Medico"
                  >
                    <FileText className="w-4 h-4" />
                    <PatternBadge pattern="PROXY" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleOpenServices(patient)}
                    title="Agregar Servicios"
                  >
                    <Package className="w-4 h-4" />
                    <PatternBadge pattern="DECORATOR" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setIsDeleteModalOpen(true)
                    }}
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-[#ef4444]" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* Add Patient Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Nuevo Paciente"
      >
        <form onSubmit={handleAddPatient} className="space-y-4">
          <Input
            label="Nombre Completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ej: Maria Garcia"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Ej: maria@email.com"
            required
          />
          <Input
            label="Telefono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ej: +34 612 345 678"
            required
          />
          <Input
            label="Fecha de Nacimiento"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            required
          />
          <Select
            label="Tipo de Sangre"
            value={formData.bloodType}
            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value as BloodType })}
            options={bloodTypeOptions}
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              Agregar Paciente
            </Button>
          </div>
        </form>
      </Modal>

      {/* Medical Record Modal (Proxy Pattern) */}
      <Modal
        isOpen={isMedicalRecordModalOpen}
        onClose={() => {
          setIsMedicalRecordModalOpen(false)
          setMedicalRecord(null)
        }}
        title={`Expediente Medico - ${selectedPatient?.fullName}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <PatternBadge pattern="PROXY" />
          <span className="text-xs text-[#64748b]">Acceso protegido al expediente</span>
        </div>
        
        {loadingRecord ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        ) : medicalRecord ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#0d1528] rounded-lg">
              <h4 className="text-sm font-medium text-[#64748b] mb-1">Diagnostico</h4>
              <p className="text-[#f1f5f9]">{medicalRecord.diagnosis}</p>
            </div>
            <div className="p-4 bg-[#0d1528] rounded-lg">
              <h4 className="text-sm font-medium text-[#64748b] mb-1">Tratamiento</h4>
              <p className="text-[#f1f5f9]">{medicalRecord.treatment}</p>
            </div>
            <div className="p-4 bg-[#0d1528] rounded-lg">
              <h4 className="text-sm font-medium text-[#64748b] mb-1">Notas</h4>
              <p className="text-[#f1f5f9]">{medicalRecord.notes}</p>
            </div>
            <p className="text-xs text-[#64748b]">
              Ultima actualizacion: {new Date(medicalRecord.createdAt).toLocaleString('es-ES')}
            </p>
          </div>
        ) : (
          <p className="text-[#64748b]">No se encontro expediente medico</p>
        )}
      </Modal>

      {/* Services Modal (Decorator Pattern) */}
      <Modal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        title={`Agregar Servicios - ${selectedPatient?.fullName}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <PatternBadge pattern="DECORATOR" />
          <span className="text-xs text-[#64748b]">Servicios adicionales con calculo de precio</span>
        </div>
        
        <div className="space-y-3">
          {services.map((service) => (
            <label 
              key={service.id}
              className={`
                flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all
                ${service.selected 
                  ? 'bg-[#3b82f6]/10 border-[#3b82f6]' 
                  : 'bg-[#0d1528] border-white/[0.08] hover:border-white/[0.15]'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={service.selected}
                  onChange={() => toggleService(service.id)}
                  className="w-4 h-4 rounded border-white/[0.08] bg-[#0d1528] text-[#3b82f6] focus:ring-[#3b82f6]"
                />
                <span className="text-[#f1f5f9]">{service.name}</span>
              </div>
              <span className="text-[#10b981] font-medium">+${service.price}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#0d1528] rounded-lg border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[#64748b]">Total:</span>
            <span className="text-2xl font-bold text-[#10b981]">${totalPrice}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={() => setIsServicesModalOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAddServices} 
            loading={submitting}
            disabled={totalPrice === 0}
          >
            Agregar Servicios
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminacion"
        size="sm"
      >
        <p className="text-[#64748b] mb-6">
          Estas seguro que deseas eliminar al paciente <strong className="text-[#f1f5f9]">{selectedPatient?.fullName}</strong>? Esta accion no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeletePatient} loading={submitting}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
