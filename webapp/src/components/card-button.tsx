import { useRouter } from "next/router";
import * as React from "react";
import Button from "./button";
import Txt from "./txt";
interface CardButtonProps {
  onClick: () => void;
  text: string;
}
export const CardButton = ({ onClick, text }: CardButtonProps) => {
  return (
    <div className="flex w-full justify-center">
      <Button
        variant="primary"
        className="flex w-[90%] justify-center px-8 py-3 bg-[#B45424] hover:bg-[#E36425] focus:bg-[#E36425] active:bg-[#E36425] border-none font-zilla font-medium"
        onClick={onClick}
      >
        <Txt size="l" className="text-white ">
          {text}
        </Txt>
      </Button>
    </div>
  );
};
