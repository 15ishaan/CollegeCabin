package com.ishaan.project.repository;

import com.ishaan.project.model.ChatMessage;
import com.ishaan.project.model.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMsgRepository extends JpaRepository<ChatMessage, Integer> {

    long countBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);
    List<ChatMessage> findByChatId(String chatId);
}
