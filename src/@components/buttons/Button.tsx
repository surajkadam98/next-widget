import { MouseEventHandler } from "react";

interface ButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  active?: boolean;
  classnames?: string;
}

export default function Button({
  handleClick,
  text,
  active = true,
  classnames,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center rounded-full p-[8px] text-base font-medium text-white ${classnames} ${
        active ? "bg-widgetBg" : "bg-[#C5C5C5]"
      }`}
      disabled={!active}
    >
      {text}
    </button>
  );
}
