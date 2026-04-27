package com.example.hospitalsystembackend.bridge.sender;

import org.springframework.stereotype.Component;

@Component
public class EmailSender implements NotificationSender {

    @Override
    public void send(String recipient, String subject, String body) {
        System.out.printf("[EMAIL] Para: %s | Asunto: %s | Mensaje: %s%n",
                recipient, subject, body);
    }

    @Override
    public String getChannelName() {
        return "EMAIL";
    }
}
