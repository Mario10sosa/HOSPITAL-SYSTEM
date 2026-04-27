package com.example.hospitalsystembackend.proxy;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class MedicalRecordProxy implements MedicalRecordAccess {

    private final RealMedicalRecordAccess realAccess;

    private static final Set<String> ALLOWED_ROLES = Set.of("DOCTOR", "ADMIN");

    @Override
    public List<MedicalRecordDto> getRecords(Long patientId,
            String requesterRole) {
        checkAccess(requesterRole, "ver");

        System.out.printf("[PROXY] Acceso PERMITIDO → Rol: %s | " +
                "Historial del paciente ID: %d%n",
                requesterRole, patientId);

        return realAccess.getRecords(patientId, requesterRole);
    }

    @Override
    public MedicalRecordDto createRecord(Long patientId,
            String requesterRole,
            MedicalRecordDto dto) {
        checkAccess(requesterRole, "crear");

        System.out.printf("[PROXY] Creación PERMITIDA → Rol: %s | " +
                "Paciente ID: %d%n", requesterRole, patientId);

        return realAccess.createRecord(patientId, requesterRole, dto);
    }

    private void checkAccess(String role, String action) {
        if (role == null || !ALLOWED_ROLES.contains(role.toUpperCase())) {
            System.out.printf("[PROXY] Acceso DENEGADO → " +
                    "Rol '%s' no tiene permiso para %s historial médico%n",
                    role, action);
            throw new SecurityException(
                    "Acceso denegado. Solo DOCTOR o ADMIN pueden " +
                            action + " el historial médico. Rol actual: " + role);
        }
    }
}