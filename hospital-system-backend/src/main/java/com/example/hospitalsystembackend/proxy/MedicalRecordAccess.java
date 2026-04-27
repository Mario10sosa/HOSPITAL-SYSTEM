package com.example.hospitalsystembackend.proxy;

import java.util.List;

public interface MedicalRecordAccess {
    List<MedicalRecordDto> getRecords(Long patientId, String requesterRole);

    MedicalRecordDto createRecord(Long patientId, String requesterRole,
            MedicalRecordDto dto);
}