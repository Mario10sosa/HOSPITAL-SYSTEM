package com.example.hospitalsystembackend.bridge.notification;

import com.example.hospitalsystembackend.bridge.sender.NotificationSender;

public abstract class HospitalNotification {

    protected NotificationSender sender;

    public HospitalNotification(NotificationSender sender) {
        this.sender = sender;
    }

    public abstract void notify(String recipient, String details);

    public abstract String getNotificationType();
}
