import { CampaignInfoIcon } from "@/@assets/icons";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useModalStore } from "@/@store/modalStore";

export default function CampaignContext() {
  const { campaign, logo } = useAPIdataStore();
  const { isPaused, isPlaying, setIsPaused } = useVideoPlayerStore();
  const { isModalOpen, setModalOpen } = useModalStore();

  return (
    <>
      <div
        className={`w-full absolute bottom-0 ${isPaused ? "z-40" : "z-20"} ${
          isPlaying && !isPaused ? "hidden" : ""
        } xl:h-[199px] lg:h-[183px] md:h-[126px] sm:h-[60px] max-sm:h-[215px]`}
      ></div>
      {/* for big screen */}
      <div
        className={`absolute bottom-0 left-0 flex items-center justify-between gap-4 xl:h-[159px] lg:h-[143px] md:h-[86px] sm:h-[60px] max-sm:hidden max-sm:z-10 overflow-hidden z-40 bg-white border border-clightdark ${
          isPlaying && !isPaused ? "hidden" : ""
        } w-full `}
      >
        <div className="relative w-[100px] md:w-[200px] overflow-hidden h-full">
          <img
            className="xl:h-[159px] lg:h-[143px] md:h-[86px] sm:h-[60px] p-0 z-30"
            src={logo}
            alt="Brand Logo"
          />
        </div>
        <p className="text-[30px] xl:text-[30px] lg:text-[24px] md:text-[16px] sm:text-[12px] max-sm:text-[15px] text-center font-semibold w-full sm:max-w-5xl 2xl:max-w-7xl line-clamp-2">
          {campaign?.headline}
        </p>
        <div className="relative h-full overflow-hidden w-[80px] sm:w-[70px] md:w-[120px] xl:w-36">
            <CampaignInfoIcon
              className="absolute bottom-4 xl:bottom-9 right-3 xl:right-5  z-30  aspect-square flex justify-center items-center w-5 xl:w-7 cursor-pointer"
              onClick={() => {
                setIsPaused(true);
                setModalOpen("/learn-more");
              }}
            />
          <div className="absolute z-20 top-3 right-0 md:-right-6 bg-widgetBg w-[70px] md:w-[120px] xl:w-36 h-full rounded-tl-full flex pl-6 items-center mt-1 md:-mb-0 -mr-6"></div>
        </div>
      </div>
      {/* for mobile screen */}
      <div
        className={`bg-white absolute left-0 bottom-0 rounded-t-[30px] flex flex-col items-center overflow-hidden w-full sm:hidden z-50 ${
          ((isPlaying && !isPaused) || isModalOpen) && "hidden"
        }`}
      >
        <div className="bg-widgetBg w-[291px] h-[231px] rounded-full -mt-36"></div>
        <div className="-mt-14">
          <img
            className="w-[98px] h-[98px] rounded-[12px]"
            src={logo}
            alt="Brand Logo"
          />
        </div>
        <p className="text-lg sm:text-[12px] md:text-[16px] lg:text-[24px] xl:text-[30px] max-sm:text-[15px] p-2 font-semibold text-center w-full sm:max-w-5xl 2xl:max-w-7xl line-clamp-2 ">
          {campaign?.headline}
        </p>

        <div className="bg-widgetBg mb-4 cursor-pointer p-1 rounded-full">
          <CampaignInfoIcon
            className="w-[14px] h-[14px]"
            onClick={() => {
              setIsPaused(true);
              setModalOpen("/learn-more");
            }}
          />
        </div>
      </div>
    </>
  );
}
