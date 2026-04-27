package com.example.hospitalsystembackend.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientRequest {
    private String fullName;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String bloodType;
}