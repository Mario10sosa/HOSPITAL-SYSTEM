package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class PatientResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String bloodType;
}