package com.example.hospitalsystembackend.proxy;

import com.example.hospitalsystembackend.model.MedicalRecord;
import com.example.hospitalsystembackend.model.Patient;
import com.example.hospitalsystembackend.repository.MedicalRecordRepository;
import com.example.hospitalsystembackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RealMedicalRecordAccess implements MedicalRecordAccess {

    private final MedicalRecordRepository recordRepository;
    private final PatientRepository patientRepository;

    @Override
    public List<MedicalRecordDto> getRecords(Long patientId,
            String requesterRole) {
        return recordRepository.findByPatientId(patientId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecordDto createRecord(Long patientId,
            String requesterRole,
            MedicalRecordDto dto) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException(
                        "Paciente no encontrado: " + patientId));

        MedicalRecord record = MedicalRecord.builder()
                .patient(patient)
                .diagnosis(dto.getDiagnosis())
                .treatment(dto.getTreatment())
                .notes(dto.getNotes())
                .accessRole(requesterRole)
                .createdAt(LocalDateTime.now())
                .build();

        return toDto(recordRepository.save(record));
    }

    private MedicalRecordDto toDto(MedicalRecord r) {
        return MedicalRecordDto.builder()
                .id(r.getId())
                .patientId(r.getPatient().getId())
                .patientName(r.getPatient().getFullName())
                .diagnosis(r.getDiagnosis())
                .treatment(r.getTreatment())
                .notes(r.getNotes())
                .accessRole(r.getAccessRole())
                .createdAt(r.getCreatedAt())
                .build();
    }
}