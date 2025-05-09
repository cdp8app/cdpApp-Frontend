"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getMessages, sendMessage, getConversations } from "../lib/services/messagingService";

// Define types for our context
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessagingContextType {
  conversations: Conversation[];
  currentConversation: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendNewMessage: (receiverId: string, content: string) => Promise<void>;
  selectConversation: (conversationId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }
  return context;
};

interface MessagingProviderProps {
  children: ReactNode;
}

export const MessagingProvider: React.FC<MessagingProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load conversations");
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (currentConversation) {
      const fetchMessages = async () => {
        try {
          setLoading(true);
          const data = await getMessages(currentConversation);
          setMessages(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to load messages");
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [currentConversation]);

  const selectConversation = async (conversationId: string) => {
    setCurrentConversation(conversationId);
  };

  const sendNewMessage = async (receiverId: string, content: string) => {
    try {
      setLoading(true);
      const newMessage = await sendMessage(receiverId, content);
      
      // Update messages list with the new message
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversations list with the latest message
      setConversations(prev => {
        const conversationIndex = prev.findIndex(c => c.participantId === receiverId);
        if (conversationIndex >= 0) {
          const updatedConversations = [...prev];
          updatedConversations[conversationIndex] = {
            ...updatedConversations[conversationIndex],
            lastMessage: content,
            lastMessageTime: new Date().toISOString()
          };
          return updatedConversations;
        } else {
          // If this is a new conversation, we would need to add it
          // This would require additional user data that we might not have here
          return prev;
        }
      });
      
      setLoading(false);
    } catch (err) {
      setError("Failed to send message");
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    // Implementation for marking messages as read
    // This would typically involve an API call and then updating the local state
    try {
      // Simulate API call for now
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (err) {
      setError("Failed to mark message as read");
    }
  };

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    sendNewMessage,
    selectConversation,
    markAsRead
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
};