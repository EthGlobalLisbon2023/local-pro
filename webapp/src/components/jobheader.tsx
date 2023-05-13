import * as React from "react";
import Txt from "./txt";
interface JobHeaderProps {
  logo: string; // URL to the logo image
  title: string;
  subtitle: string;
}
export const JobHeader = ({ logo, title, subtitle }: JobHeaderProps) => {
  return (
    <div className="mb-4 flex items-center">
      <img
        src={logo}
        alt="Company Logo"
        className="mr-4 h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-0">
        <Txt size="l" className="font-zilla text-2xl font-extrabold">
          {title}
        </Txt>
        <Txt size="m" color="secondary" className="font-semibold">
          {subtitle}
        </Txt>
      </div>
    </div>
  );
};
