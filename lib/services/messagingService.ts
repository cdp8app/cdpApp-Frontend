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
    console.log("Fetching conversations");
    // Use the API to fetch conversations
    const response = await api.get('/messaging/conversations');
    console.log("Conversations response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    // Return mock data as fallback
    return MOCK_CONVERSATIONS;
  }
};

// Get messages for a specific conversation
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  try {
    console.log(`Fetching messages for conversation: ${conversationId}`);
    // Use the API to fetch messages for a conversation
    const response = await api.get(`/messaging/conversations/${conversationId}`);
    console.log("Messages response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    // Return mock data as fallback
    return MOCK_MESSAGES[conversationId] || [];
  }
};

// Send a new message
export const sendMessage = async (receiverId: string, content: string): Promise<Message> => {
  try {
    console.log(`Sending message to ${receiverId}: ${content}`);
    // Use the API to send a message
    const response = await api.post('/messaging/messages', { receiverId, content });
    console.log("Send message response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    // Return mock data as fallback
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    return newMessage;
  }
};

// Mark a message as read
export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    console.log(`Marking message as read: ${messageId}`);
    // Use the API to mark a message as read
    await api.patch(`/messaging/messages/${messageId}/read`);
  } catch (error) {
    console.error("Error marking message as read:", error);
    // Silently fail
  }
};

// Get unread message count
export const getUnreadCount = async (): Promise<number> => {
  try {
    console.log("Fetching unread count");
    // Use the API to get unread count
    const response = await api.get('/messaging/messages/unread/count');
    console.log("Unread count response:", response.data);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    // Return mock data as fallback
    return MOCK_CONVERSATIONS.reduce(
      (total, conversation) => total + conversation.unreadCount, 
      0
    );
  }
};