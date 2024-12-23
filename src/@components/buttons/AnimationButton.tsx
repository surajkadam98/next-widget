import { getCSSVarByName } from "@/@utils";

interface AnimationButtonProps {
  handleClick: () => void;
  text: string;
  width: string;
  whiteBack?: boolean;
  classnames?: string;
}

export default function AnimationButton({
  handleClick,
  text,
  width,
  whiteBack,
  classnames,
}: AnimationButtonProps) {
  const bgColor = whiteBack ? "bg-white" : "bg-widgetBg";
  const textColor = whiteBack ? "text-[#02172E]" : "text-white";
  const widgetCurrentColor = getCSSVarByName('--widgetBg')
  return (
    <button
      className={`animated-button ${bgColor} flex items-center justify-between rounded-[60px] p-1 z-20 ${
        whiteBack ? "border border-[#02172E]" : ""
      }  max-w-fit ${width} ${classnames}`}
      onClick={handleClick}
    >
      <div
        className={`${textColor} text-base font-medium text-center w-full z-10 mx-2 ${
          whiteBack ? "w-4/5" : ""
        }`}
      >
        {text}
      </div>
      {/* <img src={imageURL} alt="arrow-right" className="rounded-full w-8 h-8 z-10 transition duration-300 ease-in-out" />
       */}

      <div className="rounded-full z-10 p-[10px] bg-white">
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill={widgetCurrentColor}
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-200 ease-in-out"
        >
          <path d="M1.29289 8.29289C0.902369 8.68342 0.902369 9.31658 1.29289 9.70711C1.68342 10.0976 2.31658 10.0976 2.70711 9.70711L1.29289 8.29289ZM11 1C11 0.447715 10.5523 0 10 0L1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM2.70711 9.70711L10.7071 1.70711L9.29289 0.292893L1.29289 8.29289L2.70711 9.70711Z" />
        </svg>
      </div>
    </button>
  );
}
