package com.example.hospitalsystembackend.bridge.notification;

import com.example.hospitalsystembackend.bridge.sender.NotificationSender;

public class UrgencyNotification extends HospitalNotification {

    public UrgencyNotification(NotificationSender sender) {
        super(sender);
    }

    @Override
    public void notify(String recipient, String details) {
        String subject = "🚨 ALERTA MÉDICA URGENTE";
        String body = "URGENTE: " + details;
        sender.send(recipient, subject, body);
    }

    @Override
    public String getNotificationType() {
        return "URGENCY";
    }
}
