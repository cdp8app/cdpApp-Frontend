"use client";
import type React from "react";
import { useEffect } from "react";
import { XCircle } from "lucide-react";

interface FormAlertProps {
  message: string
  type: "error" | "success"
  duration?: number
  onClose: () => void
}

const FormAlert: React.FC<FormAlertProps> = ({ message, type, duration = 0, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";

  return (
    <div
      className={`relative mb-4 ${bgColor} ${textColor} rounded-md text-center flex items-center justify-between rounded-md px-5 py-5 text-sm shadow transition-all`}
    >
      <div className="flex items-center justify-center gap-2">
        {type === "error" && <XCircle className="h-5 w-5" />}
        <span>{message}</span>
      </div>
      <button type="button" onClick={onClose} className="absolute right-2 top-2 text-xl leading-none">
        ×
      </button>
    </div>
  );
};

export default FormAlert;
