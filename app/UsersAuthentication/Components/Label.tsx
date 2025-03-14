import React from "react";
import "../../../app/globals.css";

interface LabelProps {
  text: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return <p className="${className} mt-[30px]">{text}</p>;
};

export default Label;
