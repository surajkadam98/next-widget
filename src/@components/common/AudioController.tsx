import { getCSSVarByName } from "@/@utils";
import { useState, MouseEventHandler } from 'react';
import ReactSlider from "react-slider";

interface AudioControllerProps {
  ismuted: boolean;
  setIsmuted: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
}

const AudioController = ({
  ismuted,
  setIsmuted,
  volume,
  setVolume,
}: AudioControllerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const widgetCurrentColor = getCSSVarByName('--widgetBg');

  return (
    <div
      className="absolute z-50 bottom-4 right-4 bg-white md:p-3 p-2 rounded-full w-fit flex items-center gap-2"
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="cursor-pointer w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          if (isHovered) setIsmuted(!ismuted);
          else setIsHovered(true);
        }}
      >
        {!ismuted ? (
          <path
            d="M5.889 16H2C1.73478 16 1.48043 15.8947 1.29289 15.7071C1.10536 15.5196 1 15.2652 1 15V9.00002C1 8.73481 1.10536 8.48045 1.29289 8.29291C1.48043 8.10538 1.73478 8.00002 2 8.00002H5.889L11.183 3.66802C11.2563 3.60797 11.3451 3.56996 11.4391 3.55841C11.5331 3.54687 11.6284 3.56227 11.714 3.60282C11.7996 3.64337 11.872 3.7074 11.9226 3.78745C11.9732 3.86751 12.0001 3.9603 12 4.05502V19.945C12.0001 20.0397 11.9732 20.1325 11.9226 20.2126C11.872 20.2926 11.7996 20.3567 11.714 20.3972C11.6284 20.4378 11.5331 20.4532 11.4391 20.4416C11.3451 20.4301 11.2563 20.3921 11.183 20.332L5.89 16H5.889ZM19.406 20.134L17.99 18.718C18.938 17.8745 19.6964 16.8397 20.2152 15.6817C20.734 14.5237 21.0015 13.2689 21 12C21.0012 10.6661 20.7054 9.34867 20.1339 8.14339C19.5624 6.93811 18.7296 5.87526 17.696 5.03202L19.116 3.61202C20.3345 4.64357 21.3132 5.9285 21.9841 7.37722C22.6549 8.82593 23.0016 10.4035 23 12C23 15.223 21.614 18.122 19.406 20.134ZM15.863 16.591L14.441 15.169C14.9265 14.7957 15.3196 14.3158 15.5899 13.7663C15.8602 13.2167 16.0006 12.6124 16 12C16 10.57 15.25 9.31502 14.12 8.60802L15.559 7.16902C16.3165 7.72621 16.9321 8.45387 17.3562 9.29314C17.7802 10.1324 18.0008 11.0597 18 12C18 13.842 17.17 15.49 15.863 16.591Z"
            fill={widgetCurrentColor}
          />
        ) : (
          <>
            <path
              d="M5.889 16H2C1.73478 16 1.48043 15.8947 1.29289 15.7071C1.10536 15.5196 1 15.2652 1 15V9.00002C1 8.73481 1.10536 8.48045 1.29289 8.29291C1.48043 8.10538 1.73478 8.00002 2 8.00002H5.889L11.183 3.66802C11.2563 3.60797 11.3451 3.56996 11.4391 3.55841C11.5331 3.54687 11.6284 3.56227 11.714 3.60282C11.7996 3.64337 11.872 3.7074 11.9226 3.78745C11.9732 3.86751 12.0001 3.9603 12 4.05502V19.945C12.0001 20.0397 11.9732 20.1325 11.9226 20.2126C11.872 20.2926 11.7996 20.3567 11.714 20.3972C11.6284 20.4378 11.5331 20.4532 11.4391 20.4416C11.3451 20.4301 11.2563 20.3921 11.183 20.332L5.89 16H5.889Z"
              fill={widgetCurrentColor}
            />
            <rect
              x="2.56344"
              y="2.44978"
              width="2.94127"
              height="26.2"
              transform="rotate(-39.8915 2.56344 2.44978)"
              fill={widgetCurrentColor}
              stroke="white"
              strokeWidth="0.8"
            />
          </>
        )}
      </svg>

      {isHovered && (
        <ReactSlider
          className="md:w-[150px] w-[100px]"
          thumbClassName={`${
            ismuted ? "bg-[#A4A4A4]" : "bg-widgetBg"
          } rounded-full shadow-md cursor-pointer md:w-[15px] w-[10px] md:h-[15px] h-[10px] md:-top-[6px] -top-[4px] z-30`}
          defaultValue={volume * 100}
          min={0}
          max={100}
          disabled={ismuted}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`h-[3px] rounded-full cursor-pointer ${
                state.index === 1 || ismuted ? "bg-[#A4A4A4]" : "bg-widgetBg z-10"
              }`}
            />
          )}
          onChange={(value) => setVolume(value / 100)}
        />
      )}
    </div>
  );
};

export default AudioController;
