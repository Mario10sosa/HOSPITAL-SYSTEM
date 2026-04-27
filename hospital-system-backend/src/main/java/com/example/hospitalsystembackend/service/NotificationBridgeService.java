package com.example.hospitalsystembackend.service;

import com.example.hospitalsystembackend.bridge.notification.AppointmentNotification;
import com.example.hospitalsystembackend.bridge.notification.HospitalNotification;
import com.example.hospitalsystembackend.bridge.notification.ReminderNotification;
import com.example.hospitalsystembackend.bridge.notification.UrgencyNotification;
import com.example.hospitalsystembackend.bridge.sender.NotificationSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationBridgeService {

    private final List<NotificationSender> senders;

    public void sendNotification(String type, String channel,
            String recipient, String details) {

        NotificationSender sender = senders.stream()
                .filter(s -> s.getChannelName().equalsIgnoreCase(channel))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Canal no soportado: " + channel));

        HospitalNotification notification = switch (type.toUpperCase()) {
            case "APPOINTMENT" -> new AppointmentNotification(sender);
            case "URGENCY" -> new UrgencyNotification(sender);
            case "REMINDER" -> new ReminderNotification(sender);
            default -> throw new IllegalArgumentException(
                    "Tipo no soportado: " + type);
        };

        notification.notify(recipient, details);
    }
}
