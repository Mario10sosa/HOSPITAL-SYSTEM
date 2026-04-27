package com.example.hospitalsystembackend.bridge.sender;

public interface NotificationSender {
    void send(String recipient, String subject, String body);

    String getChannelName();
}
