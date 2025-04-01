import React from "react";

type TextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      className="w-full p-4 min-h-[150px] rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 text-base resize-none shadow-sm text-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;