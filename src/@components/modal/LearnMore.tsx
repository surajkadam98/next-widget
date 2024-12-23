import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useModalStore } from "@/@store/modalStore";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { getCSSVarByName } from "@/@utils";

const LearnMore = () => {
  const { campaign, logo, widgetProp } = useAPIdataStore();
  const { isPlaying, setIsPaused } = useVideoPlayerStore();
  const { setModalClose, modalHistory } = useModalStore();

  const handleClose = () => {
    if (isPlaying) setIsPaused(false);
  };

  const handleBack = () => {
    setModalClose(modalHistory);
  };

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <div>
      <div className="z-20 p-4 flex flex-col min-h-[120px] py-2 -m-6 gap-2 bg-widgetBg rounded-bl-[70%] rounded-br-[70%] mb-4">
        <ModalHeader
          classnames="bg-modalBackColor"
          text={widgetProp?.title?.claimReward || "Claim Reward"}
          logo={logo}
          handleClose={handleClose}
        />
      </div>
      <div className="flex flex-col gap-4 px-1 pb-4">
        <div className="text-[#344860] text-[16px] whitespace-pre-line">
          <p>{campaign?.explanation}</p>
          <br />
        </div>
        <div className="cursor-pointer" onClick={handleBack}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 20.975C16.3687 20.9752 16.2386 20.9494 16.1173 20.8991C15.9959 20.8488 15.8857 20.775 15.793 20.682L10.793 15.682C10.6056 15.4945 10.5002 15.2402 10.5002 14.975C10.5002 14.7098 10.6056 14.4555 10.793 14.268L15.793 9.26799C15.8853 9.17248 15.9956 9.0963 16.1176 9.04389C16.2396 8.99148 16.3708 8.9639 16.5036 8.96275C16.6364 8.96159 16.7681 8.98689 16.891 9.03717C17.0139 9.08745 17.1255 9.16171 17.2194 9.2556C17.3133 9.34949 17.3876 9.46115 17.4379 9.58404C17.4881 9.70694 17.5134 9.83862 17.5123 9.9714C17.5111 10.1042 17.4835 10.2354 17.4311 10.3574C17.3787 10.4794 17.3025 10.5897 17.207 10.682L12.9145 14.975L17.207 19.268C17.3468 19.4078 17.442 19.586 17.4806 19.78C17.5192 19.9739 17.4994 20.175 17.4237 20.3577C17.348 20.5403 17.2199 20.6965 17.0555 20.8064C16.8911 20.9163 16.6978 20.975 16.5 20.975Z"
              fill={widgetCurrentColor}
            />
            <path
              d="M15 28C11.4295 28 8.3335 26.723 5.7975 24.205C3.277 21.666 2 18.5705 2 15C2 11.429 3.2775 8.341 5.7965 5.8215C8.3325 3.2855 11.429 2 15 2C18.572 2 21.66 3.286 24.1795 5.823C26.714 8.34 28 11.42 28 14.975C28 18.5705 26.7145 21.6675 24.1785 24.2035C21.659 26.7225 18.571 28 15 28ZM15 3C11.704 3 8.845 4.1875 6.5035 6.5285C4.1785 8.854 3 11.704 3 15C3 18.2965 4.179 21.156 6.5045 23.498C8.844 25.821 11.703 27 15 27C18.2965 27 21.1465 25.8215 23.4715 23.4965C25.813 21.155 27 18.2965 27 15C27 11.696 25.8135 8.8545 23.4725 6.53C21.1455 4.187 18.2955 3 15 3Z"
              fill={widgetCurrentColor}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
