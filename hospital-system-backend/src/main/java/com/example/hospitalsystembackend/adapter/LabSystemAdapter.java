package com.example.hospitalsystembackend.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LabSystemAdapter implements LabSystem {

    private final ExternalLabApi externalLabApi;

    @Override
    public String requestExam(Long patientId, String examType) {
        String patientCode = "PAT-" + patientId;
        String examCode = "EXAM-" + examType.toUpperCase();

        System.out.println("[ADAPTER] Convirtiendo solicitud al formato externo...");
        return externalLabApi.sendLabRequest(patientCode, examCode);
    }

    @Override
    public String getExamResult(String examId) {
        System.out.println("[ADAPTER] Obteniendo resultado del laboratorio externo...");
        return externalLabApi.fetchResult(examId);
    }
}
