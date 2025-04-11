import React from "react";

interface ProfileVisibilityModalProps {
  isProfileVisibilityModalOpen: boolean;
  onProfileVisibilityModalClose: () => void;
  children: React.ReactNode;
}

const ProfileVisibilityModal: React.FC<ProfileVisibilityModalProps> = ({ isProfileVisibilityModalOpen, onProfileVisibilityModalClose, children }) => {
  if (!isProfileVisibilityModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bg-white h-auto bottom-1 w-[60%] p-20 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onProfileVisibilityModalClose}
        >
          {/* &times; */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ProfileVisibilityModal;
