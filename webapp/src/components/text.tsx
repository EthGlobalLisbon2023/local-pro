import React from 'react';

type TextProps = {
  size?: 's' | 'm' | 'l';
  bold?: boolean;
  color?: 'primary' | 'secondary' | 'highlight';
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
};

const Text: React.FC<TextProps> = ({ size = 'm', bold = false, color, as: Component = 'span', children }) => {
  let sizeClass: string;

  switch (size) {
    case 's':
      sizeClass = 'text-sm';
      break;
    case 'l':
      sizeClass = 'text-lg';
      break;
    case 'm':
    default:
      sizeClass = 'text-base';
  }

  const weightClass = bold ? 'font-bold' : 'font-normal';

  let colorClass: string = '';
  switch (color) {
    case 'primary':
      colorClass = 'text-black'; // replace with your primary color class
      break;
    case 'secondary':
      colorClass = 'text-white'; // replace with your secondary color class
      break;
    case 'highlight':
      colorClass = 'text-blue-500'; // replace with your highlight color class
      break;
    default:
      colorClass = 'text-black'; // default color
  }

  return <Component className={`${sizeClass} ${weightClass} ${colorClass}`}>{children}</Component>;
};

export default Text;
