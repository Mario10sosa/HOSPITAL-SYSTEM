package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String specialty;
    private String licenseNumber;
    private Long departmentId;
    private String departmentName;
}