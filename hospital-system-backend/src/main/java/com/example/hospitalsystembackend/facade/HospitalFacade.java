package com.example.hospitalsystembackend.facade;

import com.example.hospitalsystembackend.adapter.LabSystem;
import com.example.hospitalsystembackend.dto.request.*;
import com.example.hospitalsystembackend.dto.response.*;
import com.example.hospitalsystembackend.flyweight.MedicationFactory;
import com.example.hospitalsystembackend.repository.*;
import com.example.hospitalsystembackend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalFacade {

    private final PatientService patientService;
    private final DoctorService doctorService;
    private final AppointmentService appointmentService;
    private final DepartmentCompositeService departmentService;
    private final MedicalServiceDecoratorService decoratorService;
    private final MedicationFlyweightService medicationService;
    private final MedicalRecordProxyService medicalRecordService;
    private final NotificationBridgeService notificationService;
    private final LabSystem labSystem;
    private final MedicationFactory medicationFactory;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final DepartmentRepository departmentRepository;
    private final MedicationRepository medicationRepository;

    public PatientResponse registerPatient(PatientRequest request) {
        System.out.println("[FACADE] Registrando nuevo paciente...");
        PatientResponse patient = patientService.create(request);
        System.out.println("[FACADE] Paciente registrado: "
                + patient.getFullName());
        return patient;
    }

    public List<PatientResponse> getAllPatients() {
        return patientService.findAll();
    }

    public void deletePatient(Long id) {
        patientService.delete(id);
    }

    public DoctorResponse registerDoctor(DoctorRequest request) {
        System.out.println("[FACADE] Registrando nuevo médico...");
        DoctorResponse doctor = doctorService.create(request);
        System.out.println("[FACADE] Médico registrado: "
                + doctor.getFullName());
        return doctor;
    }

    public List<DoctorResponse> getAllDoctors() {
        return doctorService.findAll();
    }

    public void deleteDoctor(Long id) {
        doctorService.delete(id);
    }

    public AppointmentResponse scheduleAppointment(
            AppointmentRequest request) {

        System.out.println("[FACADE] Agendando cita médica...");

        AppointmentResponse appointment = appointmentService.create(request);

        PatientResponse patient = patientService
                .findById(request.getPatientId());

        String details = String.format(
                "Dr. %s | Fecha: %s | Motivo: %s",
                appointment.getDoctorName(),
                appointment.getDateTime(),
                appointment.getReason());

        notificationService.sendNotification(
                "APPOINTMENT",
                request.getNotificationChannel(),
                patient.getEmail(),
                details);

        System.out.println("[FACADE] Cita agendada y notificación enviada");
        return appointment;
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentService.findAll();
    }

    public List<AppointmentResponse> getAppointmentsByStatus(String status) {
        return appointmentService.findByStatus(status);
    }

    public AppointmentResponse cancelAppointment(Long id) {
        System.out.println("[FACADE] Cancelando cita ID: " + id);
        return appointmentService.cancel(id);
    }

    public AppointmentResponse completeAppointment(Long id) {
        System.out.println("[FACADE] Completando cita ID: " + id);
        return appointmentService.complete(id);
    }

    public String requestLabExam(Long patientId, String examType) {
        System.out.println("[FACADE] Solicitando examen de laboratorio...");
        String examId = labSystem.requestExam(patientId, examType);
        System.out.println("[FACADE] Examen solicitado. ID: " + examId);
        return examId;
    }

    public String getLabResult(String examId) {
        return labSystem.getExamResult(examId);
    }

    public DepartmentResponse createDepartment(DepartmentRequest request) {
        System.out.println("[FACADE] Creando departamento: "
                + request.getName());
        return departmentService.create(request);
    }

    public List<DepartmentResponse> getDepartmentTree() {
        return departmentService.getTree();
    }

    public ServiceResponse applyMedicalServices(ServiceRequest request) {
        System.out.println("[FACADE] Aplicando servicios médicos...");
        return decoratorService.applyServices(request);
    }

    public ServiceResponse previewMedicalServices(ServiceRequest request) {
        return decoratorService.previewServices(request);
    }

    public MedicationResponse getMedication(MedicationRequest request) {
        System.out.println("[FACADE] Buscando medicamento via Flyweight...");
        return medicationService.getOrCreate(request);
    }

    public List<MedicationResponse> getAllMedications() {
        return medicationService.findAll();
    }

    public List<MedicalRecordResponse> getMedicalRecord(
            Long patientId, String role) {
        System.out.println("[FACADE] Accediendo a historial médico...");
        return medicalRecordService.getRecords(patientId, role);
    }

    public MedicalRecordResponse createMedicalRecord(
            Long patientId, MedicalRecordRequest request) {
        System.out.println("[FACADE] Creando registro médico...");
        return medicalRecordService.createRecord(patientId, request);
    }

    public DashboardResponse getDashboardStats() {
        System.out.println("[FACADE] Generando estadísticas del dashboard...");
        return DashboardResponse.builder()
                .totalPatients(patientRepository.count())
                .totalDoctors(doctorRepository.count())
                .totalAppointments(appointmentRepository.count())
                .pendingAppointments(
                        appointmentRepository.countByStatus("PENDING"))
                .completedAppointments(
                        appointmentRepository.countByStatus("COMPLETED"))
                .cancelledAppointments(
                        appointmentRepository.countByStatus("CANCELLED"))
                .totalDepartments(departmentRepository.count())
                .totalMedications(medicationRepository.count())
                .medicationCacheSize(medicationFactory.getCacheSize())
                .build();
    }
}