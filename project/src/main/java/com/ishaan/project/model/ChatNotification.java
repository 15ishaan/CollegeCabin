package com.ishaan.project.model;

public class ChatNotification {
    private String Id;
    private String senderId;
    private String senderName;

    public ChatNotification(String id, String senderId, String senderName) {
        Id = id;
        this.senderId = senderId;
        this.senderName = senderName;
    }

    public ChatNotification() {

    }
}
