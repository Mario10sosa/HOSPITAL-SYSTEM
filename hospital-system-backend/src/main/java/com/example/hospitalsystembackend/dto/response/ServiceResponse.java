package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ServiceResponse {
    private Long patientId;
    private String patientName;
    private String description;
    private double totalPrice;
    private List<String> appliedExtras;
}