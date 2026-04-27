package com.example.hospitalsystembackend.bridge.notification;

import com.example.hospitalsystembackend.bridge.sender.NotificationSender;

public class ReminderNotification extends HospitalNotification {

    public ReminderNotification(NotificationSender sender) {
        super(sender);
    }

    @Override
    public void notify(String recipient, String details) {
        String subject = "🔔 Recordatorio de cita médica";
        String body = "Recuerde su cita: " + details;
        sender.send(recipient, subject, body);
    }

    @Override
    public String getNotificationType() {
        return "REMINDER";
    }
}
