import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
