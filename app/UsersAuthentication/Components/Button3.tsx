'use client'
import React from 'react';
import "../../../app/globals.css"

interface Button3Props {
  text: string;
  className?: string;
}

const Button3: React.FC<Button3Props> = ({ text, className }) => {
  return <button className={`${className} bg-gradient-to-r py-[24px] font-sans font-normal text-GoldenWhite text-[17px] rounded-[45px] w-[100%]`}>
    {text}
  </button>;
};

export default Button3;