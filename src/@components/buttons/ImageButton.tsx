interface ImageButtonProps {
  handleClick: () => void;
  text: string;
  imageURL: string;
  width: string;
  whiteBack?: boolean;
  classnames?: string;
}

export default function ImageButton({
  handleClick,
  text,
  imageURL,
  width,
  whiteBack,
  classnames,
}: ImageButtonProps) {
  const bgColor = whiteBack ? "bg-white" : "bg-widgetBg";
  const textColor = whiteBack ? "text-[#02172E]" : "text-white";
  return (
    <button
      className={`${bgColor} flex items-center justify-between rounded-[60px] p-1 z-20 ${
        whiteBack ? "border border-[#02172E]" : ""
      } ${width} ${classnames}`}
      onClick={handleClick}
    >
      <div
        className={`${textColor} text-base font-medium text-center w-full truncate ${
          whiteBack ? "w-4/5" : ""
        }`}
      >
        {text}
      </div>
      <img src={imageURL} alt="arrow-right" className="rounded-full w-8 h-8" />
    </button>
  );
}
