package com.example.hospitalsystembackend.controller;

import com.example.hospitalsystembackend.dto.request.DepartmentRequest;
import com.example.hospitalsystembackend.dto.response.DepartmentResponse;
import com.example.hospitalsystembackend.service.DepartmentCompositeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentCompositeService service;

    @PostMapping
    public ResponseEntity<DepartmentResponse> create(
            @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping("/tree")
    public ResponseEntity<List<DepartmentResponse>> getTree() {
        return ResponseEntity.ok(service.getTree());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
