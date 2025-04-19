import React from "react";

interface ScheduleInterviewModalProps {
  isScheduleInterviewModalOpen: boolean;
  onScheduleInterviewModalClose: () => void;
  children: React.ReactNode;
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({ isScheduleInterviewModalOpen, onScheduleInterviewModalClose, children }) => {
  if (!isScheduleInterviewModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white h-[80%] w-[60%] p-10 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onScheduleInterviewModalClose}
        >
          {/* &times; */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
