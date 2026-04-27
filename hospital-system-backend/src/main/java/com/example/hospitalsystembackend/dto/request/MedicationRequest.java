package com.example.hospitalsystembackend.dto.request;

import lombok.Data;

@Data
public class MedicationRequest {
    private String name;
    private String description;
    private String dosage;
    private String sideEffects;
}