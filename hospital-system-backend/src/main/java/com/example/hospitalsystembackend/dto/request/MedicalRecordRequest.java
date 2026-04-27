package com.example.hospitalsystembackend.dto.request;

import lombok.Data;

@Data
public class MedicalRecordRequest {
    private String diagnosis;
    private String treatment;
    private String notes;
    private String requesterRole;
}