import moment from "moment";
import copyTextToClipboard from "copy-text-to-clipboard";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { ViewFiIcon } from "@/@assets/icons";
import { CopyIcon } from "@/@assets/icons/CopyIcon";
import AnimationButton from "@/@components/buttons/AnimationButton";
import { handleClickCTA } from "@/@utils";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";

const AirdropSuccessAlreadyClaim = () => {
  const { campaign, widgetProp } = useAPIdataStore();
  const { walletType, walletAddress } = useWidgetAppStore();

  return (
    <CampaignSuccessLayout headerText="Already Claimed">
      <div className="flex flex-col gap-5 px-1 text-[14px] mt-3">
        <div className="flex justify-between items-center overflow-x-hidden min-h-[26px]">
          <div className="flex gap-2 items-center">
            {walletType === "METAKEEP" ? (
              <ViewFiIcon width={24} />
            ) : (
              <img src="/img/metamask_fox.png" alt="metamask_fox" />
            )}
            <span className="tracking-wide">
              {walletAddress?.substring(0, 4)}...
              {walletAddress?.substr(-8)}
            </span>
          </div>
          <div className="copy-button">
            <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-hide z-10">
              <CopyIcon width={14} className="mt-[1px]" />
            </div>
            <div
              className=" flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-show z-20"
              onClick={() => copyTextToClipboard(walletAddress || "")}
            >
              <span className="text-xs px-2">Copy </span>
              <CopyIcon width={14} />
            </div>
          </div>
        </div>
        {campaign?.freeformPerkExplanation ? (
          <div className="z-20 break-words whitespace-pre-line text-sm">
            {campaign?.freeformPerkExplanation}
          </div>
        ) : (
          <div className="text-sm font-normal text-slate-900 z-20 break-words whitespace-pre-line">
            {widgetProp?.text.unlockedCompetition?.replace(
              "[date]",
              moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")
            ) ||
              `Success. You’ve been entered into the competition. The draw date is on{" "}
          ${moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")}. Good
          luck!`}
          </div>
        )}

        {campaign?.unlockActionText && campaign?.unlockActionLink && (
          <AnimationButton
            text={campaign?.unlockActionText || ""}
            width="w-4/5"
            handleClick={() => handleClickCTA(campaign)}
          />
        )}

        <SocialLeaderBoard />
      </div>
    </CampaignSuccessLayout>
  );
};

export default AirdropSuccessAlreadyClaim;
