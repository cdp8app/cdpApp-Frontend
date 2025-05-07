import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mb-4 text-sm text-gray-600">{message}</p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
