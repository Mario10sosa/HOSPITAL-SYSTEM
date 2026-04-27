export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type Specialty = 
  | 'CARDIOLOGY' 
  | 'NEUROLOGY' 
  | 'PEDIATRICS' 
  | 'ORTHOPEDICS' 
  | 'GENERAL'

export type AppointmentStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'

export type NotificationChannel = 'EMAIL' | 'SMS'

export type DepartmentType = 'GROUP' | 'LEAF'

export interface Patient {
  id: number
  fullName: string
  email: string
  phone: string
  birthDate: string
  bloodType: BloodType
}

export interface Doctor {
  id: number
  fullName: string
  email: string
  phone: string
  specialty: Specialty
  licenseNumber: string
  departmentId: number
  departmentName?: string
}

export interface Appointment {
  id: number
  patientId: number
  patientName: string
  doctorId: number
  doctorName: string
  dateTime: string
  reason: string
  status: AppointmentStatus
  notificationChannel: NotificationChannel
}

export interface Department {
  id: number
  name: string
  type: DepartmentType
  parentId: number | null
  children?: Department[]
  memberCount?: number
}

export interface Medication {
  id: number
  name: string
  description: string
  dosage: string
  sideEffects: string
  fromCache?: boolean
}

export interface MedicalRecord {
  id: number
  patientId: number
  diagnosis: string
  treatment: string
  notes: string
  createdAt: string
}

export interface ServiceOption {
  id: string
  name: string
  price: number
  selected: boolean
}

export interface DashboardStats {
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

export interface CreatePatientDto {
  fullName: string
  email: string
  phone: string
  birthDate: string
  bloodType: BloodType
}

export interface CreateDoctorDto {
  fullName: string
  email: string
  phone: string
  specialty: Specialty
  licenseNumber: string
  departmentId: number
}

export interface CreateAppointmentDto {
  patientId: number
  doctorId: number
  dateTime: string
  reason: string
  notificationChannel: NotificationChannel
}

export interface CreateDepartmentDto {
  name: string
  type: DepartmentType
  parentId: number | null
}

export interface CreateMedicationDto {
  name: string
  description: string
  dosage: string
  sideEffects: string
}
