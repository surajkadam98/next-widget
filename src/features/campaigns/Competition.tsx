import { putClaimCampaign } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useEffect } from "react";
import moment from "moment";
import AnimationButton from "@/@components/buttons/AnimationButton";
import { handleClickCTA } from "@/@utils";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

const Competition = () => {
  const redirectUrl = window.location.href;

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const { campaign, widgetProp } = useAPIdataStore();
  const { sharingUrl, isClaimed } = useWidgetAppStore();
  const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();

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
    <CampaignSuccessLayout headerText={widgetProp?.title?.claimReward || "Claim Reward"}>
      <div className="flex flex-col gap-6 px-1">
        <div className="text-sm font-normal text-slate-900 z-20 break-words whitespace-pre-line">
          {widgetProp?.text.unlockedCompetition?.replace(
            "[date]",
            moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")
          ) ||
            `Success. You’ve been entered into the competition. The draw date is on{" "}
          ${moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")}. Good
          luck!`}
        </div>

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
export default Competition;
