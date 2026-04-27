package com.example.hospitalsystembackend.bridge.notification;

import com.example.hospitalsystembackend.bridge.sender.NotificationSender;

public class AppointmentNotification extends HospitalNotification {

    public AppointmentNotification(NotificationSender sender) {
        super(sender);
    }

    @Override
    public void notify(String recipient, String details) {
        String subject = "📅 Confirmación de cita médica";
        String body = "Su cita ha sido confirmada. Detalles: " + details;
        sender.send(recipient, subject, body);
    }

    @Override
    public String getNotificationType() {
        return "APPOINTMENT";
    }
}
