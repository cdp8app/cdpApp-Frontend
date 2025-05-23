import React from "react";

interface ManageDataSharingModalProps {
  isManageDataSharingModalOpen: boolean;
  onManageDataSharingModalClose: () => void;
  children: React.ReactNode;
}

const ManageDataSharingModal: React.FC<ManageDataSharingModalProps> = ({ isManageDataSharingModalOpen, onManageDataSharingModalClose, children }) => {
  if (!isManageDataSharingModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white h-auto w-[60%] p-20 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onManageDataSharingModalClose}
        >
          {/* &times; */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ManageDataSharingModal;
