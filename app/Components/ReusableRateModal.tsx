import React, { useState } from "react";
import { CldImage } from "next-cloudinary";

import StarRating from "./StarRating";

interface User {
  full_name?: string;
  course?: string;
  profile_picture?: string;
  company_name?: string;
  company_industry?: string;
  company_profile?: string;
}

interface ReusableRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  title?: string;
  subtitle?: string;
  viewProfileUrl?: string;
  onSubmit: (rating: number, review: string, fromDate: string, toDate: string) => void;
  submitText?: string;
  cancelText?: string;
  ratingTarget?: string;
}

const ReusableRateModal: React.FC<ReusableRateModalProps> = ({
  isOpen,
  onClose,
  user,
  title = "Rate the user",
  subtitle = "Leave a review of your experience",
  viewProfileUrl = "/",
  onSubmit,
  submitText = "Post review",
  cancelText = "Cancel",
  ratingTarget,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white h-[90%] w-[60%] p-10 rounded-[18px] shadow-lg overflow-x-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mb-[24px] text-center overflow-y-auto">
          <h1 className="font-sans text-[21px]/[120%] text-PriGold">{title}</h1>
          <h2 className="mt-[12px] font-sans text-[12px]/[120%] text-Gray1">
            {subtitle}
          </h2>

          <div className="mt-[6px] justify-self-center rounded-[15px] bg-GoldenWhite px-[20px] py-[24px]">
            {ratingTarget === "company" && (
              <div className="h-[100px] w-[100px] justify-self-center rounded-full overflow-hidden bg-White">
                {user.company_profile ? (
                  <CldImage
                    width="100"
                    height="100"
                    src={user.company_profile}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="h-[100px] w-[100px] justify-self-center rounded-full bg-Gray2 mx-auto"></div>
                )}
              </div>
            )}
            {ratingTarget === "student" && (
              <div className="h-[100px] w-[100px] justify-self-center rounded-full overflow-hidden bg-White">
                {user.profile_picture ? (
                  <CldImage
                    width="100"
                    height="100"
                    src={user.profile_picture}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="h-[100px] w-[100px] justify-self-center rounded-full bg-Gray2 mx-auto"></div>
                )}
              </div>
            )}
            
            <h1 className="my-[8px] font-sans text-[16px]/[120%]">{ratingTarget === "company" ? user.company_name : user.full_name}</h1>
            <div className="flex items-center justify-center">
              <svg
                className="size-6 text-Gray2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              <h1 className="ml-2 font-sans text-[16px]/[120%] text-Gray2">{ratingTarget === "company" ? user.company_industry : user.course}</h1>
            </div>
            <a
              href={viewProfileUrl}
              className="mt-[12px] inline-block rounded-[999px] border-[2px] border-PriGold px-[48px] py-[10px] font-sans text-[12px]/[120%] text-PriGold"
            >
              View profile
            </a>
          </div>

          <StarRating defaultValue={rating} onChange={setRating} />

          <textarea
            placeholder="Leave review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-[28px] mt-[28px] h-[100px] w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          />

          <div className="flex flex-row items-center justify-between">
            <input
              placeholder="Start date (DD/MM)"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] placeholder-Gray1 outline-none focus:border-[2px] focus:border-PriGold"
            />
            <div className="h-[3px] w-[2%] bg-Gray2"></div>
            <input
              placeholder="End date (DD/MM)"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] placeholder-Gray1 outline-none focus:border-[2px] focus:border-PriGold"
            />
          </div>

          <div className="flex flex-row justify-center gap-[24px] mt-[40px]">
            <button
              onClick={onClose}
              className="rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] text-PriGold"
            >
              {cancelText}
            </button>
            <button
              onClick={() => onSubmit(rating, review, fromDate, toDate)}
              className="flex flex-row items-center rounded-[999px] bg-PriGold px-[80px] py-[18px] text-GoldenWhite"
            >
              {submitText}
              <svg
                className="ml-[12px] size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableRateModal;
