package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.facade.HospitalFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/lab")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class LabController {

    private final HospitalFacade facade;

    @PostMapping("/request/{patientId}")
    public ResponseEntity<Map<String, String>> requestExam(
            @PathVariable Long patientId,
            @RequestParam String examType) {
        String examId = facade.requestLabExam(patientId, examType);
        return ResponseEntity.ok(Map.of(
                "examId", examId,
                "status", "REQUESTED"));
    }

    @GetMapping("/result/{examId}")
    public ResponseEntity<String> getResult(
            @PathVariable String examId) {
        return ResponseEntity.ok(facade.getLabResult(examId));
    }
}