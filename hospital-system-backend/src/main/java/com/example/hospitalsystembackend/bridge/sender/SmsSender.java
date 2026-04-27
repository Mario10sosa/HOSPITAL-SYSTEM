package com.example.hospitalsystembackend.bridge.sender;

import org.springframework.stereotype.Component;

@Component
public class SmsSender implements NotificationSender {

    @Override
    public void send(String recipient, String subject, String body) {
        System.out.printf("[SMS] Para: %s | Mensaje: %s%n",
                recipient, body);
    }

    @Override
    public String getChannelName() {
        return "SMS";
    }
}
