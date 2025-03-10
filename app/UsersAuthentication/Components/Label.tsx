''
import React from 'react';
import "../../../app/globals.css"

interface LabelProps {
  text: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, className }) => {
  return <p className=" mt-[30px] ${className}">{text}</p>;
};

export default Label;
