package com.example.hospitalsystembackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "departments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    @Column(name = "parent_id")
    private Long parentId;
}
