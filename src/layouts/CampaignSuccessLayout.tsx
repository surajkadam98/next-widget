import SuccessImageCard from "@/@components/common/SuccessImageCard";
import { claimCampaign } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useEffect, useState } from "react";
import Loader from "@/@components/common/Loader";
import { getCSSVarByName } from "@/@utils";

interface CampaignSuccessLayoutProps {
  headerText: string;
  children?: React.ReactNode;
  className?: string;
  displaySuccessImage?: boolean
  shouldClaim?: boolean
}
const CampaignSuccessLayout: React.FC<CampaignSuccessLayoutProps> = ({
  children,
  className,
  headerText,
  displaySuccessImage,
  shouldClaim = true
}) => {
  const redirectUrl = window.location.href;
  const { campaign } = useAPIdataStore();
  const { email: loggedInEmail, firstName, lastName } = useAuthStore();

  const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();
  const {
    isClaimed,
    alreadyClaimed,
    setSharingUrl,
    setLeaderboardUrl,
    setReward,
    setClaimStatus,
  } = useWidgetAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClaim = async () => {
      let sendEmail = false;
      if (campaign?.type !== "NFT") {
        sendEmail =
          campaign?.optionalDataId === null &&
          campaign?.interactiveQuestion === null &&
          campaign?.additionalTasks === null;
      }
      try {
        if (isClaimed) return;
        setIsLoading(true);
        const queryParams = new URLSearchParams(window.location.search);
        const ref = queryParams.get("ref") || "";
        const tag = queryParams.get("tag") || "";

        const claimRes = await claimCampaign(
          null,
          campaign?.campaignKey || "",
          firstName || "",
          lastName || "",
          loggedInEmail,
          optionalData1,
          optionalData2,
          optionalData3,
          redirectUrl,
          ref,
          tag,
          false,
          sendEmail,
          campaign?.robloxImageTitle || "",
          campaign?.robloxImageUrl || ""
        );

        setSharingUrl(claimRes.data.sharingUrl);
        setLeaderboardUrl(claimRes.data.leaderboardUrl);
        setReward(claimRes.data.perk?.reward);
        setClaimStatus(claimRes.data.type);
      } catch (error) {
        console.error("Error in unclaimed state process:", error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log('should claim', shouldClaim)
    if (shouldClaim) { // controlled by calling component, whether inner this claim should be called or not.
      // Aptos `NFT wallet connect page` will disable this call, since that page handles claim there. 
      console.log('calling should claim')
      handleClaim();
    } else {
      setIsLoading(false);
    }
  }, []);

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <div className={`${className} h-full`}>
      {isLoading ? (
        <Loader
          color={widgetCurrentColor}
          mainClass="!h-[550px] !w-full flex justify-center"
          className="h-28 w-28"
        />
      ) : (
        <>
          <SuccessImageCard text={alreadyClaimed ? "Already Claimed" :headerText} displaySuccessImage={displaySuccessImage} />
          {children}
        </>
      )}
    </div>
  );
};
export default CampaignSuccessLayout;
