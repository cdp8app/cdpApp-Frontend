import React from "react";

interface RateStudentsModalProps {
  isRateStudentsModalOpen: boolean;
  onRateStudentsModalClose: () => void;
  children: React.ReactNode;
}

const RateStudentsModal: React.FC<RateStudentsModalProps> = ({ isRateStudentsModalOpen, onRateStudentsModalClose, children }) => {
  if (!isRateStudentsModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white h-[90%] w-[60%] p-12 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onRateStudentsModalClose}
        >
          {/* &times; */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default RateStudentsModal;
