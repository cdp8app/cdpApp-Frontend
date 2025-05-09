import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MessagingProvider, useMessaging } from '../messagingContext';
import * as messagingService from '../../lib/services/messagingService';

// Mock the messaging service
jest.mock('../../lib/services/messagingService', () => ({
  getConversations: jest.fn(),
  getMessages: jest.fn(),
  sendMessage: jest.fn(),
  markMessageAsRead: jest.fn(),
}));

// Test component that uses the messaging context
const TestComponent = () => {
  const { 
    conversations, 
    messages, 
    loading, 
    error, 
    sendNewMessage, 
    selectConversation 
  } = useMessaging();

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading...' : 'Not loading'}</div>
      <div data-testid="error">{error || 'No error'}</div>
      <div data-testid="conversations-count">{conversations.length}</div>
      <div data-testid="messages-count">{messages.length}</div>
      <button 
        data-testid="select-conversation" 
        onClick={() => selectConversation('1')}
      >
        Select Conversation
      </button>
      <button 
        data-testid="send-message" 
        onClick={() => sendNewMessage('user1', 'Test message')}
      >
        Send Message
      </button>
    </div>
  );
};

describe('MessagingContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load conversations on mount', async () => {
    // Mock the getConversations function to return test data
    const mockConversations = [
      {
        id: '1',
        participantId: 'user1',
        participantName: 'Test User',
        lastMessage: 'Hello',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      }
    ];
    
    (messagingService.getConversations as jest.Mock).mockResolvedValue(mockConversations);

    render(
      <MessagingProvider>
        <TestComponent />
      </MessagingProvider>
    );

    // Initially should be loading
    expect(screen.getByTestId('loading').textContent).toBe('Loading...');

    // After loading completes
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
      expect(screen.getByTestId('conversations-count').textContent).toBe('1');
    });

    // Verify getConversations was called
    expect(messagingService.getConversations).toHaveBeenCalledTimes(1);
  });

  it('should load messages when selecting a conversation', async () => {
    // Mock the service functions
    const mockConversations = [
      {
        id: '1',
        participantId: 'user1',
        participantName: 'Test User',
        lastMessage: 'Hello',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      }
    ];
    
    const mockMessages = [
      {
        id: 'msg1',
        senderId: 'user1',
        receiverId: 'currentUser',
        content: 'Hello',
        timestamp: new Date().toISOString(),
        read: true
      }
    ];
    
    (messagingService.getConversations as jest.Mock).mockResolvedValue(mockConversations);
    (messagingService.getMessages as jest.Mock).mockResolvedValue(mockMessages);

    render(
      <MessagingProvider>
        <TestComponent />
      </MessagingProvider>
    );

    // Wait for conversations to load
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
    });

    // Select a conversation
    fireEvent.click(screen.getByTestId('select-conversation'));

    // Should be loading messages
    expect(screen.getByTestId('loading').textContent).toBe('Loading...');

    // After messages load
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
      expect(screen.getByTestId('messages-count').textContent).toBe('1');
    });

    // Verify getMessages was called with the correct conversation ID
    expect(messagingService.getMessages).toHaveBeenCalledWith('1');
  });

  it('should send a new message', async () => {
    // Mock the service functions
    const mockConversations = [
      {
        id: '1',
        participantId: 'user1',
        participantName: 'Test User',
        lastMessage: 'Hello',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      }
    ];
    
    const mockMessages = [];
    
    const newMessage = {
      id: 'new-msg',
      senderId: 'currentUser',
      receiverId: 'user1',
      content: 'Test message',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    (messagingService.getConversations as jest.Mock).mockResolvedValue(mockConversations);
    (messagingService.getMessages as jest.Mock).mockResolvedValue(mockMessages);
    (messagingService.sendMessage as jest.Mock).mockResolvedValue(newMessage);

    render(
      <MessagingProvider>
        <TestComponent />
      </MessagingProvider>
    );

    // Wait for conversations to load
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
    });

    // Select a conversation
    fireEvent.click(screen.getByTestId('select-conversation'));

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
    });

    // Send a message
    fireEvent.click(screen.getByTestId('send-message'));

    // Should be loading while sending
    expect(screen.getByTestId('loading').textContent).toBe('Loading...');

    // After message is sent
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
      expect(screen.getByTestId('messages-count').textContent).toBe('1');
    });

    // Verify sendMessage was called with the correct parameters
    expect(messagingService.sendMessage).toHaveBeenCalledWith('user1', 'Test message');
  });

  it('should handle errors', async () => {
    // Mock the getConversations function to throw an error
    (messagingService.getConversations as jest.Mock).mockRejectedValue(new Error('Failed to load'));

    render(
      <MessagingProvider>
        <TestComponent />
      </MessagingProvider>
    );

    // Initially should be loading
    expect(screen.getByTestId('loading').textContent).toBe('Loading...');

    // After error occurs
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('Not loading');
      expect(screen.getByTestId('error').textContent).toBe('Failed to load conversations');
    });
  });
});