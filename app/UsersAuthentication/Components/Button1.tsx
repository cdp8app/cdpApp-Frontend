"use client"
import React from "react"
import "../../../app/globals.css"

interface Button1Props {
  text: string
  className?: string
}

const Button1: React.FC<Button1Props> = ({ text, className }) => {
  return (
    <button
      className={`${className} w-[100%] rounded-[30px] bg-Blue2 px-[193px] py-[14px] font-sans text-[17px] font-medium text-BlueWhite`}
    >
      {text}
    </button>
  )
}

export default Button1
