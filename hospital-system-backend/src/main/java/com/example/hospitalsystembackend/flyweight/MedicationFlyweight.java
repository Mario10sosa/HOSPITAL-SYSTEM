package com.example.hospitalsystembackend.flyweight;

import lombok.Getter;

@Getter
public class MedicationFlyweight {

    private final String name;
    private final String description;
    private final String dosage;
    private final String sideEffects;

    public MedicationFlyweight(String name, String description,
            String dosage, String sideEffects) {
        this.name = name;
        this.description = description;
        this.dosage = dosage;
        this.sideEffects = sideEffects;
        System.out.println("[FLYWEIGHT] Objeto creado en memoria: " + name);
    }

    public void display(String patientName) {
        System.out.printf("[FLYWEIGHT] Medicamento '%s' usado por '%s' " +
                "(objeto compartido — no se creó uno nuevo)%n",
                name, patientName);
    }
}