import React from "react";
import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  isActive: boolean;
}

const Button = ({ children, isActive }: ButtonProps) => {
  return <button className={`button ${isActive && "active"}`}>{children}</button>;
};

export default Button;
