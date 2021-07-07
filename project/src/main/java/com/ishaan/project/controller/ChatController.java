package com.ishaan.project.controller;

import com.ishaan.project.model.ChatMessage;
import com.ishaan.project.model.ChatNotification;
import com.ishaan.project.model.MessageStatus;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.ChatMsgRepository;
import com.ishaan.project.service.ChatMsgServiceImplem;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RegistrationService service;

    @Autowired
    private ChatMsgServiceImplem chatMsgService;

    @Autowired
    private ChatMsgRepository chatMsgRepo;

//    @Autowired
//    private ChatRoomService chatRoomService;

//    @MessageMapping("/chat/{to}")
//    //@SendToUser("/app/chat")
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    public String processMessage(@DestinationVariable String to, @Payload ChatMessage chatMessage) throws Exception{
//        User receiver = service.fetchUserById(chatMessage.getRecipientId());
//        User sender = service.fetchUserById(chatMessage.getSenderId());
//        messagingTemplate.convertAndSendToUser(to, "/topic/messages/" + to, chatMessage);
//
//        String chatId;
//        if(chatMessage.getRecipientId() > chatMessage.getSenderId()) {
//            chatId = String.valueOf(chatMessage.getSenderId()) + "_" + String.valueOf(chatMessage.getRecipientId());
//        }
//        else {
//            chatId = String.valueOf(chatMessage.getRecipientId()) + "_" + String.valueOf(chatMessage.getSenderId());
//        }
//        if(receiver == null) throw new Exception("No receiver!");
//
//        Date d1 = new Date();
//        ChatMessage chatMsg = new ChatMessage();
//        chatMsg.setChatId(chatId);
//        chatMsg.setSenderId(sender.getId());
//        chatMsg.setRecipientId(receiver.getId());
//        chatMsg.setSenderName(sender.getFirstName());
//        chatMsg.setRecipientName(receiver.getFirstName());
//        chatMsg.setContent(chatMessage.getContent());
//        chatMsg.setTimestamp(d1);
//        chatMsg.setStatus(MessageStatus.DELIVERED);
//        chatMsgRepo.save(chatMsg);
//        return "Success";
//    }

    @MessageMapping("/sendPrivateMessage")
    //@SendTo("/queue/reply")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
        User receiver = service.fetchUserById(chatMessage.getRecipientId());

        messagingTemplate.convertAndSendToUser(
                receiver.getUsername().trim(), "/reply", chatMessage);
        //return chatMessage;
    }

    @MessageMapping("/addPrivateUser")
    @SendTo("/queue/reply")
    public ChatMessage addPrivateUser(@Payload ChatMessage chatMessage,
                                      SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        User sender = service.fetchUserById(chatMessage.getSenderId());
        headerAccessor.getSessionAttributes().put("private-username", sender.getUsername());
        return chatMessage;
    }

}
