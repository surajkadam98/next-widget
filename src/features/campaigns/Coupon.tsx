import { useEffect, useState } from "react";
import copy from "copy-text-to-clipboard";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { putClaimCampaign } from "@/@services/api";
import ImageButton from "@/@components/buttons/ImageButton";
import AnimationButton from "@/@components/buttons/AnimationButton";
import { handleClickCTA } from "@/@utils";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import { useAuthStore } from "@/@store/authstore";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

const Coupon = () => {
  const [imageChanged, setImageChanged] = useState(false);

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const { campaign, widgetProp } = useAPIdataStore();
  const { sharingUrl, reward, isClaimed } = useWidgetAppStore();
  const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();

  const copyCouponCode = async (): Promise<void> => {
    copy(campaign?.couponCode || "Save 15%");
    setImageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 1 second
    setImageChanged(false);
  };

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
    <CampaignSuccessLayout headerText={widgetProp?.title.unlockedCoupon || "Your Coupon Code"}>
      <div className="flex flex-col gap-4 px-1">
        <ImageButton
          text={reward || campaign?.couponCode || "No Coupon Reward"}
          imageURL={imageChanged ? "/img/tick.png" : "/img/coupon.png"}
          width="w-3/5"
          whiteBack
          handleClick={copyCouponCode}
          classnames="mt-2"
        />

        <div className="text-sm font-normal text-slate-900 z-20 break-words">
          {widgetProp?.text.unlockedCoupon ||
            "Thanks for watching. We hope you enjoy your reward. Above one is your coupon code to use at checkout:"}
        </div>
        {campaign?.unlockActionText && campaign?.unlockActionLink && (
          <AnimationButton
            text={campaign?.unlockActionText || "SHOP NOW"}
            width="w-4/5"
            handleClick={() => handleClickCTA(campaign)}
          />
        )}

        <SocialLeaderBoard />
      </div>
    </CampaignSuccessLayout>
  );
};

export default Coupon;
