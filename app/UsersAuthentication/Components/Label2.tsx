''
import React from 'react';
import "../../../app/globals.css"

interface Label2Props {
  text: string;
  className?: string;
}

const Label2: React.FC<Label2Props> = ({ text, className }) => {
  return <p className=" mt-[20px] ${className}">{text}</p>;
};

export default Label2;
