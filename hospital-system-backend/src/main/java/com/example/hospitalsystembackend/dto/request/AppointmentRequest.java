package com.example.hospitalsystembackend.dto.request;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private LocalDateTime dateTime;
    private String reason;
    private String notificationChannel;
}