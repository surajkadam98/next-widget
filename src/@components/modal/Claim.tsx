import ClaimButton from "@/@components/buttons/ClaimButton";
import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { getCSSVarByName } from "@/@utils";
import { useModalContext } from "../context/ModalContext";

const Claim = () => {
  const { campaign, logo, widgetProp } = useAPIdataStore();
    const { navigateModal } = useModalContext();
  

  const handleClickLearnMore = () => {
    navigateModal("/learn-more");
  };

  const image =
    campaign?.type === "COMPETITION" || campaign?.type === "FREEFORM"
      ? "/img/chat_reward.png"
      : "/img/nft-collectables.png";

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <>
      <div className="z-10 p-4 flex flex-col h-[280px] py-2 -m-6 bg-widgetBg rounded-b-[30px] sm:mb-12 mb-16">
        <ModalHeader
          classnames="bg-modalBackColor"
          text={widgetProp?.title?.claimReward || "Claim Reward"}
          logo={logo}
        />
        <div className="z-20 sm:w-[250px] md:w-[280px] w-[320px] sm:mt-6 md:mt-2 mt-2 mx-auto">
          <img src={image} alt="chat_reward" />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-1 pb-4">
        <div className="h-[0.1px] w-full px-3 bg-clightdark"></div>
        <div className="text-h2 text-[#02172E] font-semibold text-center">
          {widgetProp?.title.perkUnlocked || "Reward Unlocked"}
        </div>
        <ClaimButton
          onClick={() => {
            navigateModal("/");
          }}
        />
        <div className="mx-auto h-[0.1px] w-[125px] px-3 bg-clightdark"></div>
        <div className="flex justify-center items-center gap-1">
          <svg
            width="5"
            height="10"
            viewBox="0 0 5 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.49988 0.999998C3.49988 1.55228 3.05217 2 2.49989 2C1.9476 2 1.49989 1.55228 1.49989 0.999998C1.49989 0.447715 1.9476 0 2.49989 0C3.05217 0 3.49988 0.447715 3.49988 0.999998ZM3.49999 2.99994V8.99993H4.49999V9.99992H0.5V8.99993H1.5V3.99993H0.5V2.99994H3.49999Z"
              fill={widgetCurrentColor}
            />
          </svg>

          <div
            className="font-bold text-[13px] text-[#02172E] cursor-pointer"
            onClick={handleClickLearnMore}
          >
            {widgetProp?.title.learnMoreAbout || "Learn More"}
          </div>
        </div>
      </div>
    </>
  );
};
export default Claim;
