import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../notificationContext';

// Mock component to test the notification context
const TestComponent = () => {
  const { 
    notifications, 
    unreadCount, 
    settings, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications,
    updateSettings 
  } = useNotification();

  return (
    <div>
      <div data-testid="notification-count">{notifications.length}</div>
      <div data-testid="unread-count">{unreadCount}</div>
      <div data-testid="email-enabled">{settings.channels.email.toString()}</div>
      <div data-testid="sms-enabled">{settings.channels.sms.toString()}</div>
      <div data-testid="in-app-enabled">{settings.channels.in_app.toString()}</div>
      
      <button 
        data-testid="add-notification"
        onClick={() => addNotification({
          title: 'Test Notification',
          message: 'This is a test notification',
          type: 'info',
          category: 'new_opportunities',
        })}
      >
        Add Notification
      </button>
      
      <button 
        data-testid="mark-all-read"
        onClick={markAllAsRead}
      >
        Mark All Read
      </button>
      
      <button 
        data-testid="clear-all"
        onClick={clearAllNotifications}
      >
        Clear All
      </button>
      
      <button 
        data-testid="toggle-email"
        onClick={() => updateSettings({
          channels: { email: !settings.channels.email }
        })}
      >
        Toggle Email
      </button>
      
      {notifications.map((notification) => (
        <div key={notification.id} data-testid={`notification-${notification.id}`}>
          <div data-testid={`title-${notification.id}`}>{notification.title}</div>
          <div data-testid={`message-${notification.id}`}>{notification.message}</div>
          <div data-testid={`read-${notification.id}`}>{notification.isRead.toString()}</div>
          <button 
            data-testid={`mark-read-${notification.id}`}
            onClick={() => markAsRead(notification.id)}
          >
            Mark Read
          </button>
          <button 
            data-testid={`remove-${notification.id}`}
            onClick={() => removeNotification(notification.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

describe('NotificationContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Mock localStorage
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
  });

  it('should provide default values', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    expect(screen.getByTestId('notification-count').textContent).toBe('0');
    expect(screen.getByTestId('unread-count').textContent).toBe('0');
    expect(screen.getByTestId('email-enabled').textContent).toBe('true');
    expect(screen.getByTestId('sms-enabled').textContent).toBe('false');
    expect(screen.getByTestId('in-app-enabled').textContent).toBe('true');
  });

  it('should add a notification', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByTestId('add-notification'));

    expect(screen.getByTestId('notification-count').textContent).toBe('1');
    expect(screen.getByTestId('unread-count').textContent).toBe('1');
    
    const notificationId = screen.getByTestId('notification-count').textContent;
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification')).toBeInTheDocument();
  });

  it('should mark a notification as read', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add a notification
    fireEvent.click(screen.getByTestId('add-notification'));
    
    // Get the notification ID
    const notificationElement = screen.getByText('Test Notification').closest('[data-testid^="notification-"]');
    const notificationId = notificationElement?.getAttribute('data-testid')?.replace('notification-', '');
    
    // Check that it's unread
    expect(screen.getByTestId(`read-${notificationId}`).textContent).toBe('false');
    
    // Mark as read
    fireEvent.click(screen.getByTestId(`mark-read-${notificationId}`));
    
    // Check that it's now read
    expect(screen.getByTestId(`read-${notificationId}`).textContent).toBe('true');
    expect(screen.getByTestId('unread-count').textContent).toBe('0');
  });

  it('should mark all notifications as read', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add multiple notifications
    fireEvent.click(screen.getByTestId('add-notification'));
    fireEvent.click(screen.getByTestId('add-notification'));
    
    // Check unread count
    expect(screen.getByTestId('unread-count').textContent).toBe('2');
    
    // Mark all as read
    fireEvent.click(screen.getByTestId('mark-all-read'));
    
    // Check that all are read
    expect(screen.getByTestId('unread-count').textContent).toBe('0');
  });

  it('should remove a notification', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add a notification
    fireEvent.click(screen.getByTestId('add-notification'));
    
    // Get the notification ID
    const notificationElement = screen.getByText('Test Notification').closest('[data-testid^="notification-"]');
    const notificationId = notificationElement?.getAttribute('data-testid')?.replace('notification-', '');
    
    // Remove the notification
    fireEvent.click(screen.getByTestId(`remove-${notificationId}`));
    
    // Check that it's gone
    expect(screen.getByTestId('notification-count').textContent).toBe('0');
    expect(screen.queryByText('Test Notification')).not.toBeInTheDocument();
  });

  it('should clear all notifications', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add multiple notifications
    fireEvent.click(screen.getByTestId('add-notification'));
    fireEvent.click(screen.getByTestId('add-notification'));
    
    // Check count
    expect(screen.getByTestId('notification-count').textContent).toBe('2');
    
    // Clear all
    fireEvent.click(screen.getByTestId('clear-all'));
    
    // Check that all are gone
    expect(screen.getByTestId('notification-count').textContent).toBe('0');
    expect(screen.queryByText('Test Notification')).not.toBeInTheDocument();
  });

  it('should update notification settings', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Check initial email setting
    expect(screen.getByTestId('email-enabled').textContent).toBe('true');
    
    // Toggle email setting
    fireEvent.click(screen.getByTestId('toggle-email'));
    
    // Check that it changed
    expect(screen.getByTestId('email-enabled').textContent).toBe('false');
  });

  it('should save notifications to localStorage', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add a notification
    fireEvent.click(screen.getByTestId('add-notification'));
    
    // Check that localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('notifications', expect.any(String));
  });

  it('should load notifications from localStorage', () => {
    // Set up localStorage with a notification
    const mockNotification = [{
      id: '123',
      title: 'Saved Notification',
      message: 'This was loaded from localStorage',
      type: 'info',
      category: 'new_opportunities',
      isRead: false,
      createdAt: new Date().toISOString(),
    }];
    
    localStorage.setItem('notifications', JSON.stringify(mockNotification));
    
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    // Check that the notification was loaded
    expect(screen.getByTestId('notification-count').textContent).toBe('1');
    expect(screen.getByText('Saved Notification')).toBeInTheDocument();
    expect(screen.getByText('This was loaded from localStorage')).toBeInTheDocument();
  });
});