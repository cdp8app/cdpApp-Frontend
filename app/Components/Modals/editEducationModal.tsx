 
import Button4 from "@/app/UsersAuthentication/Components/Button4";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface EditEducationModalProps {
  currentData: {
    university: string;
    department: string;
    fromYear: string;
    toYear: string;
  };
  onSave: (newData: {
    university: string;
    department: string;
    fromYear: string;
    toYear: string;
  }) => void;
  onClose: () => void;
}

const EditEducationModal: React.FC<EditEducationModalProps> = ({
  currentData,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState({
    university: currentData.university,
    department: currentData.department,
    fromYear: currentData.fromYear,
    toYear: currentData.toYear
  });

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[60%] rounded-[18px] bg-White px-[8%] py-[3%]">
        <div className="mb-[18px] flex flex-row border-b-[1px] border-Gold2">
          <button
            className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <Link
            className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
            href={"#"}
          >
            Edit education
          </Link>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University Name"
            className="mt-1 w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[28px] py-[25px] font-sans text-[16px]/[120%] font-normal text-Gray2"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="mt-1 w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[28px] py-[25px] font-sans text-[16px]/[120%] font-normal text-Gray2"
          />
        </div>
        <div className="mb-4 flex w-[100%] flex-row items-center justify-between">
          <div className="w-[43%]">
            <select
              name="fromYear"
              value={formData.fromYear}
              onChange={handleChange}
              className="w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[28px] py-[25px] font-sans text-[16px]/[120%] font-normal text-Gray2"
            >
              {generateYearOptions().map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[4px] w-[3%] rounded-[9px] bg-Gray2"></div>
          <div className="w-[43%]">
            <select
              name="toYear"
              value={formData.toYear}
              onChange={handleChange}
              className="w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[28px] py-[25px] font-sans text-[16px]/[120%] font-normal text-Gray2"
            >
              {generateYearOptions().map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button4
          onClick={handleSave}
          text="Save"
          className="text-[16px] font-normal"
        />
      </div>
    </div>
  );
};

export default EditEducationModal;
