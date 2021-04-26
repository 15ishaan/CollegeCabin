package com.ishaan.project.controller;

import com.ishaan.project.model.ChatMessage;
import com.ishaan.project.model.MessageStatus;
import com.ishaan.project.model.User;
import com.ishaan.project.service.RegistrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private RegistrationService service;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String privateUsername = (String) headerAccessor.getSessionAttributes().get("private-username");
        if(username != null) {
            logger.info("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setStatus(MessageStatus.DELIVERED);
            User user = service.fetchUserByUsername(username);
            chatMessage.setSenderId(user.getId());

            messagingTemplate.convertAndSend("/topic/pubic", chatMessage);
        }

        if(privateUsername != null) {
            logger.info("User Disconnected : " + privateUsername);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setStatus(MessageStatus.DELIVERED);
            User user2 = service.fetchUserByUsername(privateUsername);
            chatMessage.setSenderId(user2.getId());

            messagingTemplate.convertAndSend("/queue/reply", chatMessage);
        }
    }
}