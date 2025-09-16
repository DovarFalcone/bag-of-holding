import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" {...props}>
    {children}
  </button>
);

export default Button;
