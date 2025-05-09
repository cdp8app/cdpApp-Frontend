"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FormAlert from "@/app/Components/FormAlert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import {
  MessageSquare,
  Send,
  Loader2,
  RefreshCw,
  AlertCircle,
  Shield,
  Search,
  MoreVertical,
  User,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/Components/ui/avatar";
import { Badge } from "@/app/Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/Components/ui/tabs";

// Types based on the API structure
interface Conversation {
  id: string
  recipient: {
    id: string
    name: string
    avatar?: string
  }
  last_message?: {
    content: string
    timestamp: string
  }
  unread_count: number
}

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
  }
  recipient: {
    id: string
    name: string
  }
  timestamp: string
  is_read: boolean
}

export default function MessagingPage() {
  const { user, isAuthenticated, loading: authLoading, getValidToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [backendStatus, setBackendStatus] = useState<"connecting" | "connected" | "error" | "unauthorized">(
    "connecting",
  );
  const [sendingMessage, setSendingMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileConversations, setShowMobileConversations] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        setError(null);

        // Get a valid token first
        const token = await getValidToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Use regular fetch with the token
        const response = await fetch("/api/proxy/chat/messages/conversations/", {
          headers,
        });

        if (response.status === 401) {
          console.log("Unauthorized access to conversations - using mock data");
          setBackendStatus("unauthorized");
          throw new Error("Unauthorized: Please check your login status");
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch conversations: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setConversations(data);
        setBackendStatus("connected");
      } catch (err) {
        console.error("Error fetching conversations:", err);

        if (err instanceof Error && err.message.includes("Unauthorized")) {
          setError("Authentication error. Using mock data instead.");
          setBackendStatus("unauthorized");
        } else {
          setError("Failed to load conversations. Using mock data instead.");
          setBackendStatus("error");
        }

        // Set mock conversations if fetch fails
        setConversations([
          {
            id: "1",
            recipient: {
              id: "system-1",
              name: "Career Services",
              avatar: "/images/career-services.png",
            },
            last_message: {
              content: "Hello! How can we help you with your career journey?",
              timestamp: new Date().toISOString(),
            },
            unread_count: 1,
          },
          {
            id: "2",
            recipient: {
              id: "system-2",
              name: "Technical Support",
              avatar: "/images/tech-support.png",
            },
            last_message: {
              content: "Your profile has been updated successfully.",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
            },
            unread_count: 0,
          },
          {
            id: "3",
            recipient: {
              id: "company-1",
              name: "Google Recruiting",
              avatar: "/images/google.png",
            },
            last_message: {
              content: "Thank you for your application. We'd like to schedule an interview.",
              timestamp: new Date(Date.now() - 172800000).toISOString(),
            },
            unread_count: 2,
          },
          {
            id: "4",
            recipient: {
              id: "company-2",
              name: "Microsoft HR",
              avatar: "/images/microsoft.png",
            },
            last_message: {
              content: "We've reviewed your resume and would like to discuss opportunities.",
              timestamp: new Date(Date.now() - 259200000).toISOString(),
            },
            unread_count: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isAuthenticated, retryCount, getValidToken]);

  // Fetch unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!isAuthenticated) return;

      try {
        // Get a valid token first
        const token = await getValidToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Use regular fetch with the token
        const response = await fetch("/api/proxy/chat/messages/unread_count/", {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.count || 0);
        }
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };

    fetchUnreadCount();

    // Set up polling for unread count
    const interval = setInterval(fetchUnreadCount, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated, getValidToken]);

  // Fetch messages for selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!isAuthenticated || !selectedConversation) return;

      try {
        setLoading(true);
        setError(null);

        // Get a valid token first
        const token = await getValidToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Use regular fetch with the token
        const response = await fetch(
          `/api/proxy/chat/messages/conversation_messages/?conversation_id=${selectedConversation}`,
          {
            headers,
          },
        );

        if (response.status === 401) {
          console.log("Unauthorized access to messages - using mock data");
          setBackendStatus("unauthorized");
          throw new Error("Unauthorized: Please check your login status");
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setMessages(data);

        // Mark messages as read
        markMessagesAsRead(data);
        
        // On mobile, hide conversations list when a conversation is selected
        if (window.innerWidth < 768) {
          setShowMobileConversations(false);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);

        // Generate mock messages for the selected conversation
        const mockMessages = generateMockMessages(selectedConversation);
        setMessages(mockMessages);

        if (err instanceof Error && err.message.includes("Unauthorized")) {
          setError("Authentication error. Using mock messages.");
        } else {
          setError("Failed to load messages. Using mock data instead.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [isAuthenticated, selectedConversation, getValidToken]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Generate mock messages for a conversation
  const generateMockMessages = (conversationId: string): Message[] => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return [];

    const recipientName = conversation.recipient.name;
    const recipientId = conversation.recipient.id;

    // Generate more realistic mock conversations based on context
    if (recipientId.includes("system-1")) {
      // Career Services conversation
      return [
        {
          id: `${conversationId}-1`,
          content: "Hello! Welcome to Career Services. How can we assist with your career planning today?",
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-2`,
          content: "I'm looking for help with my resume for tech internships.",
          sender: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          recipient: {
            id: recipientId,
            name: recipientName,
          },
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-3`,
          content: "Great! We offer resume reviews every Tuesday from 2-4pm. Would you like to schedule a session?",
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 3400000).toISOString(),
          is_read: true,
        },
      ];
    } else if (recipientId.includes("company")) {
      // Company conversation
      return [
        {
          id: `${conversationId}-1`,
          content: `Hello! Thank you for your interest in ${recipientName}. We've reviewed your application for the Software Engineer position.`,
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-2`,
          content: "Thank you! I'm very excited about the opportunity.",
          sender: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          recipient: {
            id: recipientId,
            name: recipientName,
          },
          timestamp: new Date(Date.now() - 250000000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-3`,
          content: "We'd like to schedule an initial phone screening. Would you be available next week?",
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 240000000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-4`,
          content: "Yes, I'm available Monday through Wednesday afternoons. What times work for you?",
          sender: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          recipient: {
            id: recipientId,
            name: recipientName,
          },
          timestamp: new Date(Date.now() - 230000000).toISOString(),
          is_read: true,
        },
      ];
    } else {
      // Default conversation
      return [
        {
          id: `${conversationId}-1`,
          content: `Hello! This is ${recipientName}. How can I help you today?`,
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-2`,
          content: "I'm looking for information about my account.",
          sender: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          recipient: {
            id: recipientId,
            name: recipientName,
          },
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          is_read: true,
        },
        {
          id: `${conversationId}-3`,
          content: "I'd be happy to help with that. What specific information are you looking for?",
          sender: {
            id: recipientId,
            name: recipientName,
          },
          recipient: {
            id: user?.id || "user-1",
            name: user?.email || "You",
          },
          timestamp: new Date(Date.now() - 3400000).toISOString(),
          is_read: true,
        },
      ];
    }
  };

  const markMessagesAsRead = async (messages: Message[]) => {
    if (!isAuthenticated) return;

    try {
      // Find unread messages that are not from the current user
      const unreadMessages = messages.filter((msg) => !msg.is_read && msg.sender.id !== user?.id);

      // Get a valid token first
      const token = await getValidToken();

      // Skip if no token or in mock mode
      if (!token || backendStatus === "unauthorized" || backendStatus === "error") {
        return;
      }

      // Mark each unread message as read
      for (const message of unreadMessages) {
        try {
          await fetch(`/api/proxy/chat/messages/${message.id}/mark-as-read/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error(`Error marking message ${message.id} as read:`, err);
          // Continue with other messages even if one fails
        }
      }

      // Update unread count
      if (unreadMessages.length > 0) {
        const response = await fetch("/api/proxy/chat/messages/unread_count/", {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.count || 0);
        }
      }
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    // Get the recipient ID from the selected conversation
    const conversation = conversations.find((c) => c.id === selectedConversation);
    if (!conversation) return;

    // Optimistically add message to UI
    const tempMessage: any = {
      id: `temp-${Date.now()}`,
      content: newMessage,
      sender: {
        id: user?.id || "user-1",
        name: user?.email || "You",
      },
      recipient: conversation.recipient,
      timestamp: new Date().toISOString(),
      is_read: true,
      isTemp: true, // Flag to identify temporary messages
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setSendingMessage(true);

    try {
      // Get a valid token first
      const token = await getValidToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Use regular fetch with the token
      const response = await fetch("/api/proxy/chat/messages/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          content: newMessage,
          recipient_id: conversation.recipient.id,
        }),
      });

      if (response.status === 401) {
        console.log("Unauthorized when sending message - using mock response");
        setBackendStatus("unauthorized");

        // In case of 401, we'll still keep the message in the UI
        // but update it to look like a real message instead of temp
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempMessage.id ? { ...msg, id: `mock-${Date.now()}`, isTemp: false } : msg)),
        );

        // Add a mock response from the recipient after a delay
        setTimeout(() => {
          const mockResponse = {
            id: `mock-response-${Date.now()}`,
            content: "I've received your message. This is a mock response since the backend is unavailable.",
            sender: conversation.recipient,
            recipient: {
              id: user?.id || "user-1",
              name: user?.email || "You",
            },
            timestamp: new Date().toISOString(),
            is_read: true,
          };
          setMessages((prev) => [...prev, mockResponse]);
        }, 1000);

        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }

      // Replace the temp message with the real one from the response
      const data = await response.json();
      setMessages((prev) => prev.map((msg) => (msg.id === tempMessage.id ? data : msg)));
    } catch (err) {
      console.error("Error sending message:", err);

      if (backendStatus !== "unauthorized") {
        setError("Failed to send message to the server. Message saved locally.");

        // Keep the message in the UI but mark it as a mock message
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempMessage.id ? { ...msg, id: `mock-${Date.now()}`, isTemp: false } : msg)),
        );
      }
    } finally {
      setSendingMessage(false);
    }
  };

  const refreshConversations = async () => {
    setRetryCount((prev) => prev + 1);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Filter conversations based on search term and active tab
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") {
      return matchesSearch;
    } else if (activeTab === "unread") {
      return matchesSearch && conversation.unread_count > 0;
    }
    
    return matchesSearch;
  });

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (authLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-Gold0" />
            <p className="mt-4 text-center text-muted-foreground">Loading your messages...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-Gold3 text-PriGold pb-4">
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <p className="text-PriGold/80">You need to be logged in to access your messages</p>
          </CardHeader>
          <CardFooter className="flex justify-center p-6">
            <Button
              onClick={() => (window.location.href = "/user/auth/login")}
              className="w-full bg-Gold0 hover:bg-Gold1 text-white font-medium py-2"
            >
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <MessageSquare className="h-6 w-6 text-Gold0 mr-2" />
          <h1 className="text-2xl font-bold">Messages</h1>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-Gold0">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {backendStatus === "error" && (
            <div className="flex items-center text-amber-600 text-sm mr-2">
              <AlertCircle className="h-4 w-4 mr-1" />
              Using mock data
            </div>
          )}
          {backendStatus === "unauthorized" && (
            <div className="flex items-center text-amber-600 text-sm mr-2">
              <Shield className="h-4 w-4 mr-1" />
              Auth error - using mock data
            </div>
          )}
          <Button
            onClick={refreshConversations}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{loading ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

      {error && <FormAlert message={error} type="error" duration={5000} onClose={() => setError(null)} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List - Show on mobile only if showMobileConversations is true */}
        <div className={`md:block ${showMobileConversations ? "block" : "hidden"} md:col-span-1`}>
          <Card className="overflow-hidden flex flex-col h-full shadow-md">
            <CardHeader className="bg-white pb-2 space-y-4 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>Conversations</span>
                  {unreadCount > 0 && (
                    <Badge className="bg-Gold0">{unreadCount}</Badge>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={refreshConversations}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-gray-50"
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto p-0">
              {loading && filteredConversations.length === 0 ? (
                <div className="flex items-center justify-center h-full p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-Gold0" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground font-medium">No conversations found</p>
                  {searchTerm && (
                    <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
                  )}
                </div>
              ) : (
                <ul className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <li
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation === conversation.id ? "bg-Gold3/10 border-l-4 border-Gold0" : ""
                      }`}
                      onClick={() => {
                        setSelectedConversation(conversation.id);
                        if (window.innerWidth < 768) {
                          setShowMobileConversations(false);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          {conversation.recipient.avatar ? (
                            <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
                          ) : (
                            <AvatarFallback className="bg-Gold3 text-PriGold">
                              {getInitials(conversation.recipient.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className={`font-medium truncate ${conversation.unread_count > 0 ? "text-black" : ""}`}>
                              {conversation.recipient.name}
                            </div>
                            {conversation.last_message?.timestamp && (
                              <div className="text-xs text-muted-foreground flex items-center ml-2 whitespace-nowrap">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(conversation.last_message.timestamp)}
                              </div>
                            )}
                          </div>
                          
                          {conversation.last_message?.content && (
                            <div className={`text-sm truncate mt-1 ${
                              conversation.unread_count > 0 ? "text-black font-medium" : "text-muted-foreground"
                            }`}>
                              {conversation.last_message.content}
                            </div>
                          )}
                          
                          {conversation.unread_count > 0 && (
                            <div className="mt-2">
                              <Badge className="bg-Gold0 hover:bg-Gold0">
                                {conversation.unread_count} new
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Messages Area */}
        <div className={`md:block ${showMobileConversations ? "hidden" : "block"} md:col-span-2`}>
          <Card className="flex flex-col h-full shadow-md">
            {/* Header */}
            <CardHeader className="pb-2 border-b flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Back button on mobile */}
                <div className="md:hidden">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 mr-2" 
                    onClick={() => setShowMobileConversations(true)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>
                
                {selectedConversation ? (
                  <>
                    {/* Selected conversation header */}
                    <div className="flex items-center flex-1">
                      {conversations.find(c => c.id === selectedConversation)?.recipient && (
                        <>
                          <Avatar className="h-10 w-10 border border-gray-200 mr-3">
                            {conversations.find(c => c.id === selectedConversation)?.recipient.avatar ? (
                              <AvatarImage 
                                src={conversations.find(c => c.id === selectedConversation)?.recipient.avatar} 
                                alt={conversations.find(c => c.id === selectedConversation)?.recipient.name} 
                              />
                            ) : (
                              <AvatarFallback className="bg-Gold3 text-PriGold">
                                {getInitials(conversations.find(c => c.id === selectedConversation)?.recipient.name || "")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {conversations.find(c => c.id === selectedConversation)?.recipient.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {conversations.find(c => c.id === selectedConversation)?.recipient.id.includes("company") 
                                ? "Company" 
                                : "Support"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="w-full text-center">
                    <CardTitle className="text-lg">Select a conversation</CardTitle>
                  </div>
                )}
              </div>
            </CardHeader>

            {/* Message Content */}
            <CardContent className="p-0 flex-grow overflow-y-auto relative">
              {!selectedConversation ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No conversation selected</p>
                  <p className="text-muted-foreground mt-2">
                    Select a conversation from the list to view messages
                  </p>
                  {/* Show "Select a conversation" button on mobile */}
                  <Button 
                    className="mt-4 md:hidden bg-Gold0 hover:bg-Gold1"
                    onClick={() => setShowMobileConversations(true)}
                  >
                    Select a conversation
                  </Button>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-Gold0" />
                </div>
              ) : (
                <div className="flex flex-col p-4 min-h-full">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No messages yet</p>
                      <p className="text-sm text-muted-foreground mt-2">Start the conversation below</p>
                    </div>
                  ) : (
                    <>
                      {/* Group messages by date */}
                      {(() => {
                        const messagesByDate: Record<string, Message[]> = {};
                        messages.forEach(message => {
                          const date = formatDate(message.timestamp);
                          if (!messagesByDate[date]) {
                            messagesByDate[date] = [];
                          }
                          messagesByDate[date].push(message);
                        });

                        return Object.entries(messagesByDate).map(([date, dateMessages], dateIndex) => (
                          <div key={date}>
                            <div className="flex justify-center my-4">
                              <Badge variant="outline" className="bg-white">
                                {date}
                              </Badge>
                            </div>
                            {dateMessages.map((message, index) => {
                              const isCurrentUser = message.sender.id === user?.id;
                              return (
                                <div
                                  key={message.id}
                                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
                                >
                                  <div className="flex items-start max-w-[75%]">
                                    {!isCurrentUser && (
                                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                        {conversations.find(
                                          (c) => c.id === selectedConversation
                                        )?.recipient.avatar ? (
                                            <AvatarImage
                                              src={
                                                conversations.find((c) => c.id === selectedConversation)?.recipient
                                                  .avatar || ""
                                              }
                                              alt={message.sender.name}
                                            />
                                          ) : (
                                            <AvatarFallback className="bg-Gold3 text-PriGold text-xs">
                                              {getInitials(message.sender.name)}
                                            </AvatarFallback>
                                          )}
                                      </Avatar>
                                    )}
                                    <div
                                      className={`rounded-lg px-4 py-2 ${
                                        isCurrentUser
                                          ? "bg-Gold0 text-white"
                                          : "bg-gray-100"
                                      } ${message.isTemp ? "opacity-70" : ""}`}
                                    >
                                      <div className="text-sm whitespace-pre-wrap break-words">
                                        {message.content}
                                      </div>
                                      <div
                                        className={`text-xs mt-1 ${
                                          isCurrentUser ? "text-white/70" : "text-gray-500"
                                        } flex items-center`}
                                      >
                                        {formatTime(message.timestamp)}
                                        {isCurrentUser && message.isTemp && (
                                          <span className="ml-1 flex items-center">
                                            <Loader2 className="h-3 w-3 animate-spin ml-1" />
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ));
                      })()}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
              )}
            </CardContent>

            {/* Message Input */}
            {selectedConversation && (
              <CardFooter className="p-3 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                    disabled={sendingMessage}
                  />
                  <Button 
                    type="submit" 
                    className="bg-Gold0 hover:bg-Gold1" 
                    disabled={!newMessage.trim() || sendingMessage}
                  >
                    {sendingMessage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">Send</span>
                  </Button>
                </form>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}