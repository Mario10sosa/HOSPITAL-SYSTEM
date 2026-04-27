package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.DoctorRequest;
import com.example.hospitalsystembackend.dto.response.DoctorResponse;
import com.example.hospitalsystembackend.facade.HospitalFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DoctorController {

    private final HospitalFacade facade;

    @PostMapping
    public ResponseEntity<DoctorResponse> create(
            @RequestBody DoctorRequest request) {
        return ResponseEntity.ok(facade.registerDoctor(request));
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> findAll() {
        return ResponseEntity.ok(facade.getAllDoctors());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        facade.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}