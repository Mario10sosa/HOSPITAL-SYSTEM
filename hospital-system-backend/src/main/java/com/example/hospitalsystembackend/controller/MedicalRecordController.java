package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.MedicalRecordRequest;
import com.example.hospitalsystembackend.dto.response.MedicalRecordResponse;
import com.example.hospitalsystembackend.service.MedicalRecordProxyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordProxyService service;

    @GetMapping("/{id}/medical-record")
    public ResponseEntity<?> getRecords(
            @PathVariable Long id,
            @RequestHeader(value = "X-Role", defaultValue = "PATIENT") String role) {
        try {
            List<MedicalRecordResponse> records = service.getRecords(id, role);
            return ResponseEntity.ok(records);
        } catch (SecurityException e) {
            return ResponseEntity.status(403)
                    .body(Map.of(
                            "error", "Acceso denegado",
                            "message", e.getMessage(),
                            "role", role));
        }
    }

    @PostMapping("/{id}/medical-record")
    public ResponseEntity<?> createRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecordRequest request) {
        try {
            return ResponseEntity.ok(
                    service.createRecord(id, request));
        } catch (SecurityException e) {
            return ResponseEntity.status(403)
                    .body(Map.of(
                            "error", "Acceso denegado",
                            "message", e.getMessage()));
        }
    }
}