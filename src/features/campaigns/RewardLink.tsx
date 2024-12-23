import { useEffect } from "react";
import { putClaimCampaign } from "@/@services/api";
import ImageButton from "@/@components/buttons/ImageButton";
import AnimationButton from "@/@components/buttons/AnimationButton";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { handleClickCTA, openInNewTab } from "@/@utils";
import { useAuthStore } from "@/@store/authstore";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

const RewardLink = () => {
  const { campaign, widgetProp } = useAPIdataStore();
  const { sharingUrl, isClaimed, claimStatus, reward } = useWidgetAppStore();
  const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const redirectUrl = window.location.href;

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
        true
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, firstName, lastName, loggedInEmail, sharingUrl]);

  return (
    <CampaignSuccessLayout
      headerText={widgetProp?.title.unlockedLink || "Your Reward Link"}
    >
      <div className="flex flex-col gap-5 px-1">
        {(claimStatus === "SUCCESS" || claimStatus === "ALREADY_CLAIMED") && (
          <>
            <ImageButton
              text={"Redeem Reward Now"}
              whiteBack
              imageURL="/img/red_arrow.png"
              width="w-4/5"
              handleClick={() =>
                openInNewTab(campaign?.linkRewardLink ?? reward)
              }
              classnames="mt-4"
            />
            <div className="text-sm font-normal text-slate-900 z-20 break-words">
              {widgetProp?.text.unlockedLink ||
                "Success. You unlocked your reward. Click above link to redeem it. The link was also emailed to you."}
            </div>
            {campaign?.unlockActionText && campaign?.unlockActionLink && (
              <AnimationButton
                text={campaign?.unlockActionText || "Marketer CTA"}
                width="w-4/5"
                handleClick={() => handleClickCTA(campaign)}
              />
            )}
            <SocialLeaderBoard />
          </>
        )}
        {claimStatus === "FAILED" && (
          <div className="text-xl font-normal text-red-600 z-20 break-words mt-8">
            {widgetProp?.text?.failedReward || 'Failed to Redeem Reward.'}
          </div>
        )}
      </div>
    </CampaignSuccessLayout>
  );
};

export default RewardLink;
