package com.example.hospitalsystembackend.adapter;

public interface LabSystem {
    String requestExam(Long patientId, String examType);

    String getExamResult(String examId);
}
