package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.dto.request.MedicationRequest;
import com.example.hospitalsystembackend.dto.response.MedicationResponse;
import com.example.hospitalsystembackend.flyweight.MedicationFactory;
import com.example.hospitalsystembackend.flyweight.MedicationFlyweight;
import com.example.hospitalsystembackend.model.Medication;
import com.example.hospitalsystembackend.repository.MedicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicationFlyweightService {

    private final MedicationRepository repository;
    private final MedicationFactory factory;

    public MedicationResponse getOrCreate(MedicationRequest request) {
        boolean wasInCache = factory.getCache()
                .containsKey(request.getName().toUpperCase());

        MedicationFlyweight flyweight = factory.getOrCreate(
                request.getName(),
                request.getDescription(),
                request.getDosage(),
                request.getSideEffects());

        return MedicationResponse.builder()
                .name(flyweight.getName())
                .description(flyweight.getDescription())
                .dosage(flyweight.getDosage())
                .sideEffects(flyweight.getSideEffects())
                .fromCache(wasInCache)
                .cacheSize(factory.getCacheSize())
                .build();
    }

    public MedicationResponse search(String name) {
        boolean wasInCache = factory.getCache()
                .containsKey(name.toUpperCase());

        MedicationFlyweight flyweight = factory.getMedication(name);

        return MedicationResponse.builder()
                .name(flyweight.getName())
                .description(flyweight.getDescription())
                .dosage(flyweight.getDosage())
                .sideEffects(flyweight.getSideEffects())
                .fromCache(wasInCache)
                .cacheSize(factory.getCacheSize())
                .build();
    }

    public List<MedicationResponse> findAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<MedicationResponse> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public String getCacheInfo() {
        return String.format(
                "Objetos en caché: %d | Medicamentos: %s",
                factory.getCacheSize(),
                factory.getCache().keySet());
    }

    private MedicationResponse toResponse(Medication m) {
        boolean inCache = factory.getCache()
                .containsKey(m.getName().toUpperCase());
        return MedicationResponse.builder()
                .id(m.getId())
                .name(m.getName())
                .description(m.getDescription())
                .dosage(m.getDosage())
                .sideEffects(m.getSideEffects())
                .fromCache(inCache)
                .cacheSize(factory.getCacheSize())
                .build();
    }
}