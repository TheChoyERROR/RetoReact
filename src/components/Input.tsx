import React from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="w-full p-4 bg-gray-900 rounded-xl text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg shadow-md text-center"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
