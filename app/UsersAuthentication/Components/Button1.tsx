'use client'
import React from 'react';
import "../../../app/globals.css"

interface Button1Props {
  text: string;
  className?: string;
}

const Button1: React.FC<Button1Props> = ({ text, className }) => {
  return <button className={`${className} bg-Blue2 py-[14px] px-[193px] font-sans font-medium text-BlueWhite text-[17px] rounded-[30px] w-[100%]`}>
    {text}
  </button>;
};

export default Button1;
