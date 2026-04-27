package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class MedicalRecordResponse {
    private Long id;
    private Long patientId;
    private String patientName;
    private String diagnosis;
    private String treatment;
    private String notes;
    private String accessRole;
    private LocalDateTime createdAt;
    private String accessStatus;
}