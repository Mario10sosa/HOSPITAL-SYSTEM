import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Table, TableRow, TableCell } from '../components/ui/Table'
import { PatternBadge } from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Empty from '../components/ui/Empty'
import { TableSkeleton } from '../components/ui/Skeleton'
import * as api from '../services/api'
import { toast } from 'sonner'

interface Medication {
  id: number
  name: string
  description: string
  dosage: string
  sideEffects: string
  fromCache?: boolean
  cacheSize?: number
}

interface CreateMedicationDto {
  name: string
  description: string
  dosage: string
  sideEffects: string
}

export default function Medications() {
  const [loading, setLoading] = useState(true)
  const [medications, setMedications] = useState<Medication[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreateMedicationDto>({
    name: '',
    description: '',
    dosage: '',
    sideEffects: '',
  })

  useEffect(() => {
    fetchMedications()
  }, [])

  const fetchMedications = async () => {
    try {
      const response = await api.getMedications()
      setMedications(response.data)
    } catch (err) {
      console.error('Error cargando medicamentos:', err)
      toast.error('Error al cargar medicamentos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMedications()
      return
    }
    try {
      const response = await api.searchMedications(searchQuery)
      setMedications(response.data)
    } catch (err) {
      toast.error('Medicamento no encontrado')
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createMedication(formData)
      toast.success('Medicamento creado correctamente')
      setIsAddModalOpen(false)
      setFormData({ name: '', description: '', dosage: '', sideEffects: '' })
      fetchMedications()
    } catch (err) {
      toast.error('Error al crear medicamento')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Medicamentos</h1>
          <p className="text-[#64748b]">Gestión de medicamentos con caché Flyweight</p>
        </div>
        <div className="flex items-center gap-3">
          <PatternBadge pattern="FLYWEIGHT" />
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Nuevo Medicamento
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar medicamento por nombre..."
            className="flex-1 px-4 py-2 bg-[#0d1528] border border-white/[0.08] rounded-lg text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6]"
          />
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" /> Buscar
          </Button>
          {searchQuery && (
            <Button
              variant="secondary"
              onClick={() => { setSearchQuery(''); fetchMedications() }}
            >
              Limpiar
            </Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#f1f5f9]">
            Lista de Medicamentos
          </h2>
          <span className="text-sm text-[#64748b]">
            {medications.length} medicamento{medications.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={4} />
        ) : medications.length === 0 ? (
          <Empty message="No hay medicamentos registrados" />
        ) : (
          <Table headers={['Nombre', 'Descripción', 'Dosis', 'Efectos Secundarios', 'Caché']}>
            {medications.map(med => (
              <TableRow key={med.id}>
                <TableCell className="font-medium text-[#f1f5f9]">
                  💊 {med.name}
                </TableCell>
                <TableCell>{med.description}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded text-xs">
                    {med.dosage}
                  </span>
                </TableCell>
                <TableCell className="text-[#64748b] text-sm">
                  {med.sideEffects}
                </TableCell>
                <TableCell>
                  {med.fromCache ? (
                    <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-xs font-medium">
                      ✅ Caché
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-[#64748b]/10 text-[#64748b] rounded-full text-xs font-medium">
                      🗄️ DB
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nuevo Medicamento"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm text-[#64748b] mb-1">Nombre</label>
            <input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Ibuprofeno"
              required
              className="w-full px-4 py-2 bg-[#0d1528] border border-white/[0.08] rounded-lg text-[#f1f5f9] outline-none focus:border-[#3b82f6]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#64748b] mb-1">Descripción</label>
            <input
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ej: Antiinflamatorio no esteroideo"
              required
              className="w-full px-4 py-2 bg-[#0d1528] border border-white/[0.08] rounded-lg text-[#f1f5f9] outline-none focus:border-[#3b82f6]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#64748b] mb-1">Dosis</label>
            <input
              value={formData.dosage}
              onChange={e => setFormData({ ...formData, dosage: e.target.value })}
              placeholder="Ej: 400mg cada 8 horas"
              required
              className="w-full px-4 py-2 bg-[#0d1528] border border-white/[0.08] rounded-lg text-[#f1f5f9] outline-none focus:border-[#3b82f6]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#64748b] mb-1">Efectos Secundarios</label>
            <input
              value={formData.sideEffects}
              onChange={e => setFormData({ ...formData, sideEffects: e.target.value })}
              placeholder="Ej: Molestias gástricas"
              required
              className="w-full px-4 py-2 bg-[#0d1528] border border-white/[0.08] rounded-lg text-[#f1f5f9] outline-none focus:border-[#3b82f6]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? 'Creando...' : 'Crear Medicamento'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
