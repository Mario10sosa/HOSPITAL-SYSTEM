package com.example.hospitalsystembackend.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class ServiceRequest {
    private Long patientId;
    private List<String> extras;
}