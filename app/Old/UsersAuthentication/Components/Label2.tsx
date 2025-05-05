import React from "react";
import "../../../../app/globals.css";

interface Label2Props {
  text: string;
  className?: string;
}

const Label2: React.FC<Label2Props> = ({ text }) => {
  return <p className="${className} font-sans mt-[20px]">{text}</p>;
};

export default Label2;
