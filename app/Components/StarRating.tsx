"use client";

import { useState } from "react";

interface StarRatingProps {
  defaultValue?: number;
  totalStars?: number;
  onChange?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  defaultValue = 0,
  onChange
}) => {
  const [rating, setRating] = useState<number>(defaultValue);

  const handleClick = (value: number) => {
    setRating(value);
    onChange?.(value); // Notify parent if onChange is provided
  };

  return (
    <div className="flex space-x-1 justify-self-center">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = rating >= starValue;

        return (
          <svg
            key={starValue}
            xmlns="http://www.w3.org/2000/svg"
            fill={isFilled ? "#facc15" : "rgba(181, 181, 181, 0.40)"}
            onClick={() => handleClick(starValue)}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="size-9 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        );
      })}
    </div>
  );
};


export default StarRating;
