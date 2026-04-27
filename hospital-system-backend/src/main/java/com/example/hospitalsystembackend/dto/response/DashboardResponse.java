package com.example.hospitalsystembackend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {
    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private long pendingAppointments;
    private long completedAppointments;
    private long cancelledAppointments;
    private long totalDepartments;
    private long totalMedications;
    private int medicationCacheSize;
}