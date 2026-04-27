import { useState, useEffect } from 'react'
import { Plus, ChevronRight, ChevronDown, Building2, User, FolderOpen, Folder } from 'lucide-react'
import { Card } from '../components/ui/Card'
import Badge, { PatternBadge } from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input, { Select } from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Empty from '../components/ui/Empty'
import { Skeleton } from '../components/ui/Skeleton'
import type { Department, DepartmentType, CreateDepartmentDto } from '../types'
import * as api from '../services/api'
import { toast } from 'sonner'

interface DepartmentNodeProps {
  department: Department
  level: number
  expanded: Record<number, boolean>
  onToggle: (id: number) => void
}

function DepartmentNode({ department, level, expanded, onToggle }: DepartmentNodeProps) {
  const hasChildren = department.children && department.children.length > 0
  const isExpanded = expanded[department.id]
  const isGroup = department.type === 'GROUP'

  return (
    <div>
      <div 
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
          hover:bg-white/[0.05] transition-all border border-transparent
          hover:border-white/[0.08]
        `}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => hasChildren && onToggle(department.id)}
      >
        {/* Expand/Collapse Icon */}
        <div className="w-5 h-5 flex items-center justify-center">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-[#64748b]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#64748b]" />
            )
          ) : (
            <div className="w-4" />
          )}
        </div>

        {/* Icon */}
        <div className={`
          w-8 h-8 rounded-lg flex items-center justify-center
          ${isGroup 
            ? isExpanded 
              ? 'bg-[#3b82f6]/20 text-[#3b82f6]' 
              : 'bg-[#f59e0b]/20 text-[#f59e0b]'
            : 'bg-[#10b981]/20 text-[#10b981]'
          }
        `}>
          {isGroup ? (
            isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>

        {/* Name */}
        <span className="text-[#f1f5f9] font-medium flex-1">{department.name}</span>

        {/* Type Badge */}
        <Badge variant={isGroup ? 'info' : 'success'}>
          {isGroup ? 'GRUPO' : 'HOJA'}
        </Badge>

        {/* Member Count */}
        {isGroup && department.memberCount !== undefined && department.memberCount > 0 && (
          <span className="text-xs text-[#64748b] bg-[#0d1528] px-2 py-1 rounded">
            {department.memberCount} miembros
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {department.children!.map((child) => (
            <DepartmentNode
              key={child.id}
              department={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function flattenDepartments(departments: Department[], result: { value: string; label: string }[] = []): { value: string; label: string }[] {
  for (const dept of departments) {
    if (dept.type === 'GROUP') {
      result.push({ value: dept.id.toString(), label: dept.name })
      if (dept.children) {
        flattenDepartments(dept.children, result)
      }
    }
  }
  return result
}

export default function Departments() {
  const [loading, setLoading] = useState(true)
  const [departments, setDepartments] = useState<Department[]>([])
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreateDepartmentDto>({
    name: '',
    type: 'LEAF',
    parentId: null,
  })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await api.getDepartmentTree()
      setDepartments(response.data)
    } catch (err) {
      console.error('Error conectando con el backend:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const expandAll = () => {
    const allIds: Record<number, boolean> = {}
    const collectIds = (depts: Department[]) => {
      for (const dept of depts) {
        if (dept.type === 'GROUP') {
          allIds[dept.id] = true
          if (dept.children) collectIds(dept.children)
        }
      }
    }
    collectIds(departments)
    setExpanded(allIds)
  }

  const collapseAll = () => {
    setExpanded({ 1: true })
  }

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createDepartment(formData)
      await fetchDepartments()
      toast.success('Departamento agregado exitosamente')
      setIsAddModalOpen(false)
      resetForm()
    } catch {
      toast.success('Departamento agregado (modo demo)')
      setIsAddModalOpen(false)
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'LEAF',
      parentId: null,
    })
  }

  const parentOptions = flattenDepartments(departments)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Departamentos</h1>
        </div>
        <Card>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f1f5f9]">Departamentos</h1>
            <p className="text-[#64748b]">Estructura organizacional del hospital</p>
          </div>
          <PatternBadge pattern="COMPOSITE" />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={expandAll}>
            Expandir Todo
          </Button>
          <Button variant="secondary" onClick={collapseAll}>
            Colapsar
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Agregar
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#3b82f6]/10">
            <Building2 className="w-6 h-6 text-[#3b82f6]" />
          </div>
          <div>
            <h3 className="font-medium text-[#f1f5f9] mb-1">Patron Composite</h3>
            <p className="text-sm text-[#64748b]">
              La estructura del hospital utiliza el patron Composite para representar jerarquias.
              Los nodos GROUP pueden contener otros nodos, mientras que los nodos LEAF son elementos finales (doctores).
            </p>
          </div>
        </div>
      </Card>

      {/* Department Tree */}
      {departments.length === 0 ? (
        <Card>
          <Empty
            title="No hay departamentos"
            description="Comienza agregando la estructura organizacional"
            action={
              <Button onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Agregar Departamento
              </Button>
            }
          />
        </Card>
      ) : (
        <Card>
          <div className="space-y-1">
            {departments.map((department) => (
              <DepartmentNode
                key={department.id}
                department={department}
                level={0}
                expanded={expanded}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#3b82f6]/20" />
          <span className="text-sm text-[#64748b]">Grupo (expandido)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#f59e0b]/20" />
          <span className="text-sm text-[#64748b]">Grupo (colapsado)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#10b981]/20" />
          <span className="text-sm text-[#64748b]">Hoja (Doctor)</span>
        </div>
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Departamento"
      >
        <form onSubmit={handleAddDepartment} className="space-y-4">
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Cirugia General"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#f1f5f9]">Tipo</label>
            <div className="flex gap-4">
              {(['GROUP', 'LEAF'] as DepartmentType[]).map((type) => (
                <label 
                  key={type}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all flex-1
                    ${formData.type === type
                      ? 'bg-[#3b82f6]/10 border-[#3b82f6]'
                      : 'bg-[#0d1528] border-white/[0.08] hover:border-white/[0.15]'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as DepartmentType })}
                    className="w-4 h-4 text-[#3b82f6] bg-[#0d1528] border-white/[0.08] focus:ring-[#3b82f6]"
                  />
                  <div>
                    <span className="text-[#f1f5f9] block">{type === 'GROUP' ? 'Grupo' : 'Hoja'}</span>
                    <span className="text-xs text-[#64748b]">
                      {type === 'GROUP' ? 'Puede contener otros' : 'Nodo final (doctor)'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <Select
            label="Departamento Padre"
            value={formData.parentId?.toString() || ''}
            onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? parseInt(e.target.value) : null })}
            options={parentOptions}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              Agregar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
