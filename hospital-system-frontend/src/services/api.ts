import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

// Dashboard
export const getDashboardStats = () =>
  api.get('/dashboard/stats')

// Patients
export const getPatients = () =>
  api.get('/patients')

export const createPatient = (data: any) =>
  api.post('/patients', data)

export const deletePatient = (id: number) =>
  api.delete(`/patients/${id}`)

export const getMedicalRecord = (patientId: number, role = 'DOCTOR') =>
  api.get(`/patients/${patientId}/medical-record`, {
    headers: { 'X-Role': role },
  })

export const addPatientServices = (patientId: number, extras: string[]) =>
  api.post(`/patients/${patientId}/services`, { extras })

// Doctors
export const getDoctors = () =>
  api.get('/doctors')

export const createDoctor = (data: any) =>
  api.post('/doctors', data)

export const deleteDoctor = (id: number) =>
  api.delete(`/doctors/${id}`)

// Appointments
export const getAppointments = (status?: string) =>
  status
    ? api.get(`/appointments?status=${status}`)
    : api.get('/appointments')

export const createAppointment = (data: any) =>
  api.post('/appointments', data)

export const cancelAppointment = (id: number) =>
  api.put(`/appointments/${id}/cancel`)

export const completeAppointment = (id: number) =>
  api.put(`/appointments/${id}/complete`)

// Departments
export const getDepartmentTree = () =>
  api.get('/departments/tree')

export const createDepartment = (data: any) =>
  api.post('/departments', data)

export const deleteDepartment = (id: number) =>
  api.delete(`/departments/${id}`)

// Medications
export const getMedications = () =>
  api.get('/medications')

export const createMedication = (data: any) =>
  api.post('/medications', data)

export const searchMedications = (name: string) =>
  api.get(`/medications/search/list?name=${encodeURIComponent(name)}`)

// Lab
export const requestLab = (patientId: number, examType: string) =>
  api.post(`/lab/request/${patientId}?examType=${examType}`)

export default api
