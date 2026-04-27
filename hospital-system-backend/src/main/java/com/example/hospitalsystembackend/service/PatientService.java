package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.dto.request.PatientRequest;
import com.example.hospitalsystembackend.dto.response.PatientResponse;
import com.example.hospitalsystembackend.model.Patient;
import com.example.hospitalsystembackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository repository;

    public PatientResponse create(PatientRequest request) {
        Patient patient = Patient.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .birthDate(request.getBirthDate())
                .bloodType(request.getBloodType())
                .build();
        return toResponse(repository.save(patient));
    }

    public List<PatientResponse> findAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public PatientResponse findById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException(
                        "Paciente no encontrado: " + id));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PatientResponse toResponse(Patient p) {
        return PatientResponse.builder()
                .id(p.getId())
                .fullName(p.getFullName())
                .email(p.getEmail())
                .phone(p.getPhone())
                .birthDate(p.getBirthDate())
                .bloodType(p.getBloodType())
                .build();
    }
}