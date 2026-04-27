package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.response.DashboardResponse;
import com.example.hospitalsystembackend.facade.HospitalFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DashboardController {

    private final HospitalFacade facade;

    @GetMapping("/stats")
    public ResponseEntity<DashboardResponse> getStats() {
        return ResponseEntity.ok(facade.getDashboardStats());
    }
}