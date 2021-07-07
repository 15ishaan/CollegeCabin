package com.ishaan.project.service;

import com.ishaan.project.model.ChatMessage;
import com.ishaan.project.model.MessageStatus;

import java.util.List;

public interface ChatMsgService {
    long countBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);
    List<ChatMessage> findByChatId(String chatId);
}
