"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import { Search, MessageSquare, Plus, User, Clock } from "lucide-react";
import AuthRedirect from "@/app/Components/AuthRedirect";
import Navbar1 from "@/app/Components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

// Mock message data
const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "John Doe",
    sender_email: "john.doe@example.com",
    subject: "Interview Invitation",
    preview: "We would like to invite you for an interview for the Software Engineer position...",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 2,
    sender: "Jane Smith",
    sender_email: "jane.smith@example.com",
    subject: "Application Status Update",
    preview: "Thank you for your application. We are pleased to inform you that...",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
  },
  {
    id: 3,
    sender: "Recruitment Team",
    sender_email: "recruitment@example.com",
    subject: "Next Steps in Your Application",
    preview: "Following your recent interview, we would like to discuss the next steps...",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true,
  },
];

export default function MessagingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter messages based on search term
  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AuthRedirect />
      <Navbar1 userType={user?.userType === "company" ? "company" : "student"} />
      
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-500 mt-1">Communicate with applicants and recruiters</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => router.push("/messaging/new")}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
              <p className="text-sm text-gray-500 text-center mt-1 mb-4">
                {messages.length === 0
                  ? "You don't have any messages yet."
                  : "No messages match your search criteria."}
              </p>
              <Button onClick={() => router.push("/messaging/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Compose New Message
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <Link href={`/messaging/${message.id}`} key={message.id}>
                  <div className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read ? "bg-blue-50" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <h3 className={`font-medium ${!message.read ? "font-semibold" : ""}`}>{message.sender}</h3>
                          <p className="text-sm text-gray-500">{message.subject}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {formatDate(message.date)}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 line-clamp-1">
                      {message.preview}
                    </div>
                    {!message.read && (
                      <div className="mt-2 flex justify-end">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }
  }
}