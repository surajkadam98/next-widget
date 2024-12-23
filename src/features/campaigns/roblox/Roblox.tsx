import copy from "copy-text-to-clipboard";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useEffect, useState } from "react";
import { putClaimCampaign } from "@/@services/api";
import RobloxPreview from "./RobloxPreview";
import { RobloxTikIcon } from "@/@assets/icons/RobloxTikIcon";
import { RobloxCopyIcon } from "@/@assets/icons/RobloxCopyIcon";
import { ROBLOX_REDEEM_URL } from "@/@config";
import { RobloxTopRightIcon } from "@/@assets/icons/RobloxTopRightIcon";
import AnimationButton from "@/@components/buttons/AnimationButton";
import { handleClickCTA } from "@/@utils";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";
const Roblox = () => {
  const [imageChanged, setImageChanged] = useState(false);
  const redirectUrl = window.location.href;

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const { campaign, widgetProp } = useAPIdataStore();
  const { sharingUrl, isClaimed, reward } = useWidgetAppStore();
  const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();

  const copyRewardCode = async (): Promise<void> => {
    copy(reward);
    setImageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 1 second
    setImageChanged(false);
  };

  useEffect(() => {
    const sendEmail =
      campaign?.optionalDataId === null &&
      campaign.interactiveQuestion === null &&
      campaign.additionalTasks === null;
    if (
      campaign &&
      loggedInEmail &&
      redirectUrl &&
      sharingUrl &&
      !isClaimed &&
      !sendEmail
    ) {
      putClaimCampaign(
        "viewerId",
        campaign.campaignKey,
        firstName ?? "",
        lastName ?? "",
        loggedInEmail!,
        optionalData1,
        optionalData2,
        optionalData3,
        redirectUrl,
        sharingUrl,
        false,
        true,
        campaign?.robloxImageTitle || "",
        campaign?.robloxImageUrl || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, firstName, lastName, loggedInEmail, sharingUrl]);

  return (
    <CampaignSuccessLayout
      headerText={widgetProp?.link.virtualItem || "Your Virtual item"}
      className="relative"
      displaySuccessImage={false}
    >
      <div className="absolute w-full h-[90%] top-14 flex flex-col gap-3 px-1 ">
        <div className="z-50 border border-black/35 rounded-lg px-5 py-2 space-y-2">
          <div className="relative aspect-square flex justify-center items-center bg-white bg-opacity-70 backdrop-blur-lg border border-white border-opacity-30 rounded-lg shadow-lg overflow-hidden">
            {campaign?.robloxImageUrl && (
              <RobloxPreview fileUrl={campaign.robloxImageUrl} />
            )}
          </div>
          <p className=" text-base font-smedium">
            {campaign?.robloxImageTitle}
          </p>
        </div>

        <p className="text-sm font-normal text-slate-900 z-20 break-words">
          {reward ? (
            widgetProp?.label?.gratitude || (
              <>
                <span>Thanks for watching. </span> <br />
                <span>Here is your Roblox virtual item code.</span>
              </>
            )
          ) : (
            <span>No Roblox virtual item available!</span>
          )}
        </p>

        {reward && (
          <div className="flex items-center space-x-5 text-sm font-semibold">
            <p
              className="space-x-1 flex items-center cursor-copy"
              onClick={copyRewardCode}
            >
              <span>{reward}</span>
              <>
                {imageChanged ? (
                  <RobloxTikIcon className="h-4 w-4 text-green-400" />
                ) : (
                  <RobloxCopyIcon className="h-4 w-4" />
                )}
              </>
            </p>
            <a
              href={ROBLOX_REDEEM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={`space-x-1 text-widgetBg flex items-center `}>
                <span>{widgetProp?.link.redeemNow || "Redeem now"}</span>
                <RobloxTopRightIcon className="h-4 w-4" />
              </p>
            </a>
          </div>
        )}

        {campaign?.unlockActionText && campaign?.unlockActionLink && (
          <AnimationButton
            text={campaign?.unlockActionText || "SHOP NOW"}
            width=""
            handleClick={() => handleClickCTA(campaign)}
          />
        )}

        <SocialLeaderBoard />
      </div>
    </CampaignSuccessLayout>
  );
};

export default Roblox;
