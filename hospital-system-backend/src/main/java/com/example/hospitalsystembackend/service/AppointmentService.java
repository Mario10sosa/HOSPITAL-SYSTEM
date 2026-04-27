package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.dto.request.AppointmentRequest;
import com.example.hospitalsystembackend.dto.response.AppointmentResponse;
import com.example.hospitalsystembackend.model.Appointment;
import com.example.hospitalsystembackend.model.Doctor;
import com.example.hospitalsystembackend.model.Patient;
import com.example.hospitalsystembackend.repository.AppointmentRepository;
import com.example.hospitalsystembackend.repository.DoctorRepository;
import com.example.hospitalsystembackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentResponse create(AppointmentRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .dateTime(request.getDateTime())
                .reason(request.getReason())
                .status("PENDING")
                .notificationChannel(request.getNotificationChannel())
                .build();

        return toResponse(appointmentRepository.save(appointment));
    }

    public List<AppointmentResponse> findAll() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> findByStatus(String status) {
        return appointmentRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse cancel(Long id) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        apt.setStatus("CANCELLED");
        return toResponse(appointmentRepository.save(apt));
    }

    public AppointmentResponse complete(Long id) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        apt.setStatus("COMPLETED");
        return toResponse(appointmentRepository.save(apt));
    }

    public AppointmentResponse toResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .patientId(a.getPatient().getId())
                .patientName(a.getPatient().getFullName())
                .doctorId(a.getDoctor().getId())
                .doctorName(a.getDoctor().getFullName())
                .dateTime(a.getDateTime())
                .reason(a.getReason())
                .status(a.getStatus())
                .notificationChannel(a.getNotificationChannel())
                .build();
    }
}