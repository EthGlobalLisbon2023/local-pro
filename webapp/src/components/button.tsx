import React from "react";
import Txt from "./txt";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  size?: "s" | "m" | "l";
  variant?: "primary" | "plain";
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  size = "m",
  variant = "primary",
  startDecorator,
  endDecorator,
  onClick,
  children,
  className,
}) => {
  let paddingClass: string;

  switch (size) {
    case "s":
      paddingClass = "px-2 py-1";
      break;
    case "l":
      paddingClass = "px-4 py-2";
      break;
    case "m":
    default:
      paddingClass = "px-3 py-1.5";
  }

  let variantClasses: string;
  switch (variant) {
    case "plain":
      variantClasses =
        "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-200 focus:bg-gray-300";
      break;
    case "primary":
    default:
      variantClasses =
        "bg-[#49989E] text-white border border-[#49989E] hover:bg-[#49989E]/80 focus:bg-blue-700";
  }

  return (
    <button
      className={twMerge(
        `inline-flex items-center rounded ${paddingClass} ${variantClasses} focus:outline-none`,
        className
      )}
      onClick={onClick}
    >
      {startDecorator && <span className="mr-2">{startDecorator}</span>}
      <Txt size={size} color={variant === "primary" ? "secondary" : "primary"}>
        {children}
      </Txt>
      {endDecorator && <span className="ml-2">{endDecorator}</span>}
    </button>
  );
};

export default Button;
