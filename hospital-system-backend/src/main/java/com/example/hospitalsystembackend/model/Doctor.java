package com.example.hospitalsystembackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String specialty;
    private String licenseNumber;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
