import React from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
  size?: "s" | "m" | "l";
  bold?: boolean;
  color?: "primary" | "secondary" | "highlight";
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
};

const Txt: React.FC<TextProps> = ({
  size = "m",
  bold = false,
  color,
  as: Component = "span",
  children,
  className,
}) => {
  let sizeClass: string;

  switch (size) {
    case "s":
      sizeClass = "text-sm";
      break;
    case "l":
      sizeClass = "text-xl";
      break;
    case "m":
    default:
      sizeClass = "text-base";
  }

  const weightClass = bold ? "font-bold" : "font-normal";

  let colorClass: string = "";
  switch (color) {
    case "primary":
      colorClass = "text-[#2E2E32]"; // replace with your primary color class
      break;
    case "secondary":
      colorClass = "text-[#845939]"; // replace with your secondary color class
      break;
    case "highlight":
      colorClass = "text-blue-500"; // replace with your highlight color class
      break;
    default:
      colorClass = "text-[#2E2E32]"; // default color
  }

  return (
    <Component
      className={twMerge(sizeClass, weightClass, colorClass, className)}
    >
      {children}
    </Component>
  );
};

export default Txt;
