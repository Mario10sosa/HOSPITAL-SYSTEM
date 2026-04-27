package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.decorator.*;
import com.example.hospitalsystembackend.dto.request.ServiceRequest;
import com.example.hospitalsystembackend.dto.response.ServiceResponse;
import com.example.hospitalsystembackend.model.Patient;
import com.example.hospitalsystembackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalServiceDecoratorService {

    private final PatientRepository patientRepository;

    public ServiceResponse applyServices(ServiceRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException(
                        "Paciente no encontrado: " + request.getPatientId()));

        MedicalService service = new BaseConsultation(patient.getFullName());

        if (request.getExtras() != null) {
            for (String extra : request.getExtras()) {
                service = switch (extra.toUpperCase()) {
                    case "INSURANCE" -> new InsuranceDecorator(service);
                    case "LAB_TEST" -> new LabTestDecorator(service);
                    case "MEDICATION" -> new MedicationDecorator(service);
                    case "XRAY" -> new XRayDecorator(service);
                    default -> service;
                };
            }
        }

        System.out.println("=== Servicio médico aplicado ===");
        System.out.println("Descripción : " + service.getDescription());
        System.out.printf("Precio total: $%.2f%n", service.getPrice());

        return ServiceResponse.builder()
                .patientId(patient.getId())
                .patientName(patient.getFullName())
                .description(service.getDescription())
                .totalPrice(service.getPrice())
                .appliedExtras(request.getExtras() != null
                        ? request.getExtras()
                        : List.of())
                .build();
    }

    public ServiceResponse previewServices(ServiceRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException(
                        "Paciente no encontrado: " + request.getPatientId()));

        MedicalService service = new BaseConsultation(patient.getFullName());

        if (request.getExtras() != null) {
            for (String extra : request.getExtras()) {
                service = switch (extra.toUpperCase()) {
                    case "INSURANCE" -> new InsuranceDecorator(service);
                    case "LAB_TEST" -> new LabTestDecorator(service);
                    case "MEDICATION" -> new MedicationDecorator(service);
                    case "XRAY" -> new XRayDecorator(service);
                    default -> service;
                };
            }
        }

        return ServiceResponse.builder()
                .patientId(patient.getId())
                .patientName(patient.getFullName())
                .description(service.getDescription())
                .totalPrice(service.getPrice())
                .appliedExtras(request.getExtras() != null
                        ? request.getExtras()
                        : List.of())
                .build();
    }
}