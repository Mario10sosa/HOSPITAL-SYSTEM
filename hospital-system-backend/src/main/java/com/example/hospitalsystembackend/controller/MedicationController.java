package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.MedicationRequest;
import com.example.hospitalsystembackend.dto.response.MedicationResponse;
import com.example.hospitalsystembackend.service.MedicationFlyweightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationFlyweightService service;

    @PostMapping
    public ResponseEntity<MedicationResponse> create(
            @RequestBody MedicationRequest request) {
        return ResponseEntity.ok(service.getOrCreate(request));
    }

    @GetMapping
    public ResponseEntity<List<MedicationResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<MedicationResponse> search(
            @RequestParam String name) {
        return ResponseEntity.ok(service.search(name));
    }

    @GetMapping("/search/list")
    public ResponseEntity<List<MedicationResponse>> searchList(
            @RequestParam String name) {
        return ResponseEntity.ok(service.searchByName(name));
    }

    @GetMapping("/cache")
    public ResponseEntity<String> getCacheInfo() {
        return ResponseEntity.ok(service.getCacheInfo());
    }
}