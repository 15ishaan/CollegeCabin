package com.ishaan.project.service;

import com.ishaan.project.model.ChatMessage;
import com.ishaan.project.model.MessageStatus;
import com.ishaan.project.repository.ChatMsgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import java.util.List;

@Service
public class ChatMsgServiceImplem {

    @Autowired
    private ChatMsgRepository repo;

//    @Autowired
//    private ChatRoomService chatRoomService;


    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.RECEIVED);
        repo.save(chatMessage);
        return chatMessage;
    }

    public long countNewMessages(String senderId, String recipientId) {
        return repo.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, MessageStatus.RECEIVED);
    }

    public List<ChatMessage> findByChatId(String chatId){
        return repo.findByChatId(chatId);
    }

}
