import { PlayButtonIcon } from "@/@assets/icons/PlayButtonIcon";
import { getCSSVarByName } from "@/@utils";

interface PlayButtonProps {
  onClick: () => void;
  text: string | undefined;
}

export default function PlayButton({ onClick, text }: PlayButtonProps) {
  const widgetCurrentColor = getCSSVarByName("--widgetBg");
  return (
    <div>
      <button onClick={onClick} className={"relative"}>
        <div className="bg-widgetBg sm:rounded-l-full border-[0.5px] max-sm:rounded-[15px] h-[75px] xl:h-[75px] lg:h-[67.5px] md:h-[40px] sm:h-[31px] max-sm:h-[72px] my-[8px] xl:my-[8px] lg:my-[8px] md:my-[3px] sm:my-[3px] max-sm:my-0 text-white font-normal text-[33px] xl:text-[33px] lg:text-[30px] md:text-[18px] sm:text-[14px] max-sm:text-[20px] flex items-center justify-center min-w-[300px]">
          <p className="xl:leading-8 lg:leading-7 md:leading-5 sm:leading-4 max-sm:leading-5 ps-4 lg:pe-12 md:pe-7 sm:pe-5 max-sm:pe-10">
            {text}
          </p>
        </div>

        <div className="bg-white max-sm:p-2 sm:p-1 md:p-2 sm:rounded-full max-sm:rounded-[15px] absolute top-0 transform translate-x-1/2 right-0">
          <PlayButtonIcon
            className="sm:rounded-full h-[91px] xl:h-[75px] lg:h-[63px] md:h-[31px] sm:h-[29px] max-sm:h-[56px]"
            fill={widgetCurrentColor}
          />
        </div>
      </button>
    </div>
  );
}
