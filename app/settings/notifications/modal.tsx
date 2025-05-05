import React from "react";

interface NotificationSettingsModalProps {
  isNotificationSettingsModalOpen: boolean;
  onNotificationSettingsModalClose: () => void;
  children: React.ReactNode;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ isNotificationSettingsModalOpen, onNotificationSettingsModalClose, children }) => {
  if (!isNotificationSettingsModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bg-white h-[90%] bottom-1 w-[60%] p-20 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onNotificationSettingsModalClose}
        >
          {/* &times; */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default NotificationSettingsModal;
