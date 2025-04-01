import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = ""
}) => {
  const baseStyles = "px-5 py-2.5 rounded-lg font-medium transition-colors";
  const variantStyles = variant === "primary" 
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "border border-gray-300 text-gray-700 hover:bg-gray-50";
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;