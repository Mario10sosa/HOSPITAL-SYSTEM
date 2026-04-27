package com.example.hospitalsystembackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String description;
    private String dosage;
    private String sideEffects;
}
