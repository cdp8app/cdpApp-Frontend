// app/messaging/page.tsx
"use client";

import React, { useState } from "react";
import Header1 from "../Components/Header1";
import { useMessaging } from "../../contexts/messagingContext";
import ConversationList from "./components/ConversationList";
import MessageThread from "./components/MessageThread";
import NewMessageForm from "./components/NewMessageForm";

export default function Messaging() {
  const { 
    conversations, 
    currentConversation, 
    messages, 
    loading, 
    error, 
    sendNewMessage, 
    selectConversation 
  } = useMessaging();
  
  const [newMessageMode, setNewMessageMode] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header1 />
      
      <div className="flex flex-col flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4 text-Gold1">Messages</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex flex-row h-full">
          {/* Conversations sidebar */}
          <div className="w-1/3 pr-4 border-r border-Gray1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Conversations</h2>
              <button 
                onClick={() => setNewMessageMode(true)}
                className="bg-Gold3 text-Black2 px-3 py-1 rounded-md text-sm"
              >
                New Message
              </button>
            </div>
            
            {loading && conversations.length === 0 ? (
              <div className="text-center py-8 text-Gray1">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 text-Gray1">
                No conversations yet
              </div>
            ) : (
              <ConversationList 
                conversations={conversations} 
                onSelect={selectConversation} 
                selectedId={currentConversation?.id}
              />
            )}
          </div>
          
          {/* Message thread */}
          <div className="w-2/3 pl-4 flex flex-col">
            {newMessageMode ? (
              <NewMessageForm 
                onSend={(receiverId, content) => {
                  sendNewMessage(receiverId, content);
                  setNewMessageMode(false);
                }}
                onCancel={() => setNewMessageMode(false)}
              />
            ) : currentConversation ? (
              <MessageThread 
                messages={messages} 
                conversation={currentConversation} 
                onSendMessage={(content) => 
                  sendNewMessage(
                    currentConversation.other_user.id, 
                    content
                  )
                }
              />
            ) : (
              <div className="flex-grow flex items-center justify-center text-Gray1">
                Select a conversation or start a new message
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
