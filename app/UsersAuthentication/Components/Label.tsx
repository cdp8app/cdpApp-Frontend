''
import React from 'react';

interface LabelProps {
  text: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, className }) => {
  return <p className={`text-sm text-green-800 font-semibold mb-1 font-sans ${className}`}>{text}</p>;
};

export default Label;
