package com.example.hospitalsystembackend.flyweight;

import com.example.hospitalsystembackend.model.Medication;
import com.example.hospitalsystembackend.repository.MedicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class MedicationFactory {

    private final MedicationRepository repository;

    private final Map<String, MedicationFlyweight> cache = new HashMap<>();

    public MedicationFlyweight getMedication(String name) {

        if (cache.containsKey(name.toUpperCase())) {
            System.out.println("[FLYWEIGHT] Reutilizando desde caché: " + name);
            return cache.get(name.toUpperCase());
        }

        Medication medication = repository.findByName(name)
                .orElseThrow(() -> new RuntimeException(
                        "Medicamento no encontrado: " + name));

        MedicationFlyweight flyweight = new MedicationFlyweight(
                medication.getName(),
                medication.getDescription(),
                medication.getDosage(),
                medication.getSideEffects());

        cache.put(name.toUpperCase(), flyweight);
        return flyweight;
    }

    public MedicationFlyweight getOrCreate(String name, String description,
            String dosage, String sideEffects) {
        if (cache.containsKey(name.toUpperCase())) {
            System.out.println("[FLYWEIGHT] Reutilizando desde caché: " + name);
            return cache.get(name.toUpperCase());
        }

        Medication medication = repository.findByName(name)
                .orElseGet(() -> repository.save(
                        Medication.builder()
                                .name(name)
                                .description(description)
                                .dosage(dosage)
                                .sideEffects(sideEffects)
                                .build()));

        MedicationFlyweight flyweight = new MedicationFlyweight(
                medication.getName(),
                medication.getDescription(),
                medication.getDosage(),
                medication.getSideEffects());

        cache.put(name.toUpperCase(), flyweight);
        return flyweight;
    }

    public int getCacheSize() {
        return cache.size();
    }

    public Map<String, MedicationFlyweight> getCache() {
        return java.util.Collections.unmodifiableMap(cache);
    }

    public void clearCache() {
        cache.clear();
        System.out.println("[FLYWEIGHT] Caché limpiado");
    }
}