package com.example.hospitalsystembackend.dto.request;

import lombok.Data;

@Data
public class DoctorRequest {
    private String fullName;
    private String email;
    private String phone;
    private String specialty;
    private String licenseNumber;
    private Long departmentId;
}