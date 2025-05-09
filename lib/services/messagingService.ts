// lib/services/messagingService.ts
import api from "../api";
import { Message, Conversation } from "../../contexts/messagingContext";

// Mock data for development until backend is ready
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    participantId: "user1",
    participantName: "Victoria Benson",
    participantAvatar: "",
    lastMessage: "Hello there John, this is a test message",
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2
  },
  {
    id: "2",
    participantId: "user2",
    participantName: "Big Star Tech",
    participantAvatar: "",
    lastMessage: "We would like to schedule an interview",
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    unreadCount: 0
  },
  {
    id: "3",
    participantId: "user3",
    participantName: "Tech Solutions Inc",
    participantAvatar: "",
    lastMessage: "Thank you for your application",
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    unreadCount: 1
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "msg1",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hello there! I saw your profile and I'm impressed with your skills.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    },
    {
      id: "msg2",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Would you be interested in discussing a potential job opportunity at our company?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      read: true
    },
    {
      id: "msg3",
      senderId: "currentUser",
      receiverId: "user1",
      content: "Hi Victoria, thank you for reaching out! I would definitely be interested in learning more about the opportunity.",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
      read: true
    },
    {
      id: "msg4",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Great! We're looking for someone with your exact skill set. Can we schedule a call tomorrow?",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: false
    }
  ],
  "2": [
    {
      id: "msg5",
      senderId: "user2",
      receiverId: "currentUser",
      content: "Hello! Thank you for applying to our Software Developer position.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    },
    {
      id: "msg6",
      senderId: "user2",
      receiverId: "currentUser",
      content: "We would like to schedule an interview with you next week. Are you available?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    }
  ],
  "3": [
    {
      id: "msg7",
      senderId: "user3",
      receiverId: "currentUser",
      content: "Thank you for your application to Tech Solutions Inc.",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true
    },
    {
      id: "msg8",
      senderId: "currentUser",
      receiverId: "user3",
      content: "Thank you for considering my application. I'm very excited about this opportunity!",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    },
    {
      id: "msg9",
      senderId: "user3",
      receiverId: "currentUser",
      content: "We've reviewed your application and would like to move forward. Please complete our technical assessment.",
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      read: false
    }
  ]
};

// Get all conversations for the current user
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    // When API is ready, uncomment this
    // const response = await api.get('/messages/conversations');
    // return response.data;
    
    // For now, return mock data
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_CONVERSATIONS), 500);
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

// Get messages for a specific conversation
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  try {
    // When API is ready, uncomment this
    // const response = await api.get(`/messages/conversations/${conversationId}`);
    // return response.data;
    
    // For now, return mock data
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_MESSAGES[conversationId] || []), 500);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send a new message
export const sendMessage = async (receiverId: string, content: string): Promise<Message> => {
  try {
    // When API is ready, uncomment this
    // const response = await api.post('/messages', { receiverId, content });
    // return response.data;
    
    // For now, return mock data
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    return new Promise(resolve => {
      setTimeout(() => resolve(newMessage), 500);
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Mark a message as read
export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    // When API is ready, uncomment this
    // await api.patch(`/messages/${messageId}/read`);
    
    // For now, just simulate a delay
    return new Promise(resolve => {
      setTimeout(() => resolve(), 300);
    });
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

// Get unread message count
export const getUnreadCount = async (): Promise<number> => {
  try {
    // When API is ready, uncomment this
    // const response = await api.get('/messages/unread/count');
    // return response.data.count;
    
    // For now, calculate from mock data
    const unreadCount = Object.values(MOCK_CONVERSATIONS).reduce(
      (total, conversation) => total + conversation.unreadCount, 
      0
    );
    
    return new Promise(resolve => {
      setTimeout(() => resolve(unreadCount), 300);
    });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};