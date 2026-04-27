package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.dto.request.MedicalRecordRequest;
import com.example.hospitalsystembackend.dto.response.MedicalRecordResponse;
import com.example.hospitalsystembackend.proxy.MedicalRecordDto;
import com.example.hospitalsystembackend.proxy.MedicalRecordProxy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordProxyService {

    private final MedicalRecordProxy proxy;

    public List<MedicalRecordResponse> getRecords(Long patientId,
            String role) {
        try {
            return proxy.getRecords(patientId, role)
                    .stream()
                    .map(dto -> toResponse(dto, "GRANTED"))
                    .collect(Collectors.toList());
        } catch (SecurityException e) {
            throw new SecurityException(e.getMessage());
        }
    }

    public MedicalRecordResponse createRecord(Long patientId,
            MedicalRecordRequest request) {
        try {
            MedicalRecordDto dto = MedicalRecordDto.builder()
                    .diagnosis(request.getDiagnosis())
                    .treatment(request.getTreatment())
                    .notes(request.getNotes())
                    .build();

            MedicalRecordDto saved = proxy.createRecord(
                    patientId, request.getRequesterRole(), dto);

            return toResponse(saved, "GRANTED");
        } catch (SecurityException e) {
            throw new SecurityException(e.getMessage());
        }
    }

    private MedicalRecordResponse toResponse(MedicalRecordDto dto,
            String status) {
        return MedicalRecordResponse.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .patientName(dto.getPatientName())
                .diagnosis(dto.getDiagnosis())
                .treatment(dto.getTreatment())
                .notes(dto.getNotes())
                .accessRole(dto.getAccessRole())
                .createdAt(dto.getCreatedAt())
                .accessStatus(status)
                .build();
    }
}