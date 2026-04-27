package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.ServiceRequest;
import com.example.hospitalsystembackend.dto.response.ServiceResponse;
import com.example.hospitalsystembackend.service.MedicalServiceDecoratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MedicalServiceController {

    private final MedicalServiceDecoratorService service;

    @PostMapping("/{id}/services")
    public ResponseEntity<ServiceResponse> applyServices(
            @PathVariable Long id,
            @RequestBody ServiceRequest request) {
        request.setPatientId(id);
        return ResponseEntity.ok(service.applyServices(request));
    }

    @PostMapping("/{id}/services/preview")
    public ResponseEntity<ServiceResponse> previewServices(
            @PathVariable Long id,
            @RequestBody ServiceRequest request) {
        request.setPatientId(id);
        return ResponseEntity.ok(service.previewServices(request));
    }
}