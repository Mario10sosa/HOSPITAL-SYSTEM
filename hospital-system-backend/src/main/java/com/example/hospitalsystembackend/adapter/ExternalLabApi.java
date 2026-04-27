package com.example.hospitalsystembackend.adapter;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class ExternalLabApi {

    // Método incompatible — recibe formato diferente
    public String sendLabRequest(String patientCode, String examCode) {
        String examId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        System.out.printf("[LAB EXTERNO] Solicitud recibida → Paciente: %s | Examen: %s | ID: %s%n",
                patientCode, examCode, examId);
        return examId;
    }

    // Método incompatible — retorna formato diferente
    public String fetchResult(String labRequestId) {
        return String.format(
                "{\"labId\":\"%s\",\"status\":\"COMPLETED\",\"result\":\"Valores dentro del rango normal\",\"processedAt\":\"%s\"}",
                labRequestId,
                java.time.LocalDateTime.now());
    }
}
