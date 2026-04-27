package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.dto.request.DoctorRequest;
import com.example.hospitalsystembackend.dto.response.DoctorResponse;
import com.example.hospitalsystembackend.model.Department;
import com.example.hospitalsystembackend.model.Doctor;
import com.example.hospitalsystembackend.repository.DepartmentRepository;
import com.example.hospitalsystembackend.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;

    public DoctorResponse create(DoctorRequest request) {
        Department dept = request.getDepartmentId() != null
                ? departmentRepository.findById(request.getDepartmentId())
                        .orElse(null)
                : null;

        Doctor doctor = Doctor.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .specialty(request.getSpecialty())
                .licenseNumber(request.getLicenseNumber())
                .department(dept)
                .build();

        return toResponse(doctorRepository.save(doctor));
    }

    public List<DoctorResponse> findAll() {
        return doctorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public DoctorResponse findById(Long id) {
        return doctorRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException(
                        "Doctor no encontrado: " + id));
    }

    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }

    public DoctorResponse toResponse(Doctor d) {
        return DoctorResponse.builder()
                .id(d.getId())
                .fullName(d.getFullName())
                .email(d.getEmail())
                .phone(d.getPhone())
                .specialty(d.getSpecialty())
                .licenseNumber(d.getLicenseNumber())
                .departmentId(d.getDepartment() != null
                        ? d.getDepartment().getId()
                        : null)
                .departmentName(d.getDepartment() != null
                        ? d.getDepartment().getName()
                        : null)
                .build();
    }
}