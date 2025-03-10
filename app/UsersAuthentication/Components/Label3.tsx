''
import React from 'react';
import "../../../app/globals.css"

interface Label3Props {
  text: string;
  className?: string;
}

const Label3: React.FC<Label3Props> = ({ text, className }) => {
  return <p className=" mt-[40px] ${className}">{text}</p>;
};

export default Label3;
