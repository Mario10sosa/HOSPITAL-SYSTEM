package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.AppointmentRequest;
import com.example.hospitalsystembackend.dto.response.AppointmentResponse;
import com.example.hospitalsystembackend.facade.HospitalFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AppointmentController {

    private final HospitalFacade facade;

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(
            @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(facade.scheduleAppointment(request));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> findAll(
            @RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(
                    facade.getAppointmentsByStatus(status));
        }
        return ResponseEntity.ok(facade.getAllAppointments());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancel(
            @PathVariable Long id) {
        return ResponseEntity.ok(facade.cancelAppointment(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponse> complete(
            @PathVariable Long id) {
        return ResponseEntity.ok(facade.completeAppointment(id));
    }
}