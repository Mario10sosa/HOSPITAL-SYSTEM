package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicationResponse {
    private Long id;
    private String name;
    private String description;
    private String dosage;
    private String sideEffects;
    private boolean fromCache;
    private int cacheSize;
}