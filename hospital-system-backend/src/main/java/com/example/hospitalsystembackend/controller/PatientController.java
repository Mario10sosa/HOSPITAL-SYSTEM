package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.PatientRequest;
import com.example.hospitalsystembackend.dto.response.PatientResponse;
import com.example.hospitalsystembackend.facade.HospitalFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PatientController {

    private final HospitalFacade facade;

    @PostMapping
    public ResponseEntity<PatientResponse> create(
            @RequestBody PatientRequest request) {
        return ResponseEntity.ok(facade.registerPatient(request));
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> findAll() {
        return ResponseEntity.ok(facade.getAllPatients());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        facade.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}