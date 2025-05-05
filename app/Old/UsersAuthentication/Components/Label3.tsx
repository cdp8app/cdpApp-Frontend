import React from "react";
import "../../../../app/globals.css";

interface Label3Props {
  text: string;
  className?: string;
}

const Label3: React.FC<Label3Props> = ({ text }) => {
  return <p className="${className} text-Gold0 font-sans mt-[40px]">{text}</p>;
};

export default Label3;
