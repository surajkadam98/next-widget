import { PausedButtonIcon } from "@/@assets/icons/PausedButtonIcon";
import { fetchCheckClaimed } from "@/@services/api";
import {
  getCSSVarByName,
  renderCampaignRoute,
  renderSuccessRoute,
} from "@/@utils";
import { useState, useEffect } from "react";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useModalStore } from "@/@store/modalStore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useAuthStore } from "@/@store/authstore";

export default function RewardButton() {
  const { campaign, widgetProp } = useAPIdataStore();
  const { currentTime, duration, isPaused, setIsPaused } =
    useVideoPlayerStore();
  const {
    isClaimed,
    isClaiming,
    isQuizCorrect,
    isTasksComplete,
    isAnswered,
    setIsClaimed,
    setIsClaiming,
    setSharingUrl,
    setLeaderboardUrl,
    setClaimStatus,
    setReward,
    setWalletAddress,
    setWalletType,
  } = useWidgetAppStore();
  const {
    setTransactionId,
    setNftTokenId,
    setNftAddress,
    setNftWalletAddress,
    setNftWalletType,
  } = useNftMintDataStore();
  const { setModalOpen } = useModalStore();
  const { email: loggedInEmail, authorized: is_authenticated } = useAuthStore();

  const [countDown, setCountDown] = useState(-1);
  const [buttonText, setButtonText] = useState("");
  const [buttonImage, setButtonImage] = useState("/img/camp_reward.png");

  useEffect(() => {
    if (campaign?.campaignKey && loggedInEmail) {
      fetchCheckClaimed(campaign?.campaignKey, loggedInEmail).then((res) => {
        const data = res.data;
        setIsClaimed(data.claimed);
        if (data.claimed) {
          setSharingUrl(data.sharingUrl);
          setLeaderboardUrl(data.leaderboardUrl);
          setTransactionId(data.transactionId);
          setNftTokenId(data.nftTokenId);
          setNftAddress(data.nftAddress);
          setNftWalletAddress(data.walletAddress);
          setNftWalletType(data.walletType);
          setClaimStatus("ALREADY_CLAIMED");
          setReward(data.reward);
          setWalletAddress(data.walletAddress);
          setWalletType(data.walletType);
        }
      });
    }
  }, [campaign?.campaignKey, loggedInEmail, setIsClaimed]);

  // use campaign.completePercentage which is a number between 1 to 100 and currentTime  to calculate the countdown
  useEffect(() => {
    if (campaign?.completionPercentage && currentTime) {
      const targetTime = duration * (campaign.completionPercentage / 100);
      const remainingTime = targetTime - currentTime;

      if (isPaused) {
        setButtonText(widgetProp?.button.paused || "Paused");
        setButtonImage("/img/play_icon.png");
      } else if (isClaimed) {
        setButtonText("Claimed");
        setButtonImage("/img/camp_claim.png");
      } else if (is_authenticated) {
        setButtonText("Complete Claim");
        setButtonImage("/img/camp_claim.png");
      } else if (isClaiming) {
        setButtonText(widgetProp?.button.claimPerk || "Claim now");
        setButtonImage("/img/camp_claim.png");
      } else {
        setButtonText(widgetProp?.text.unlocksIn || "Reward in");
        setButtonImage("/img/camp_reward.png");
      }

      if (remainingTime <= 0) {
        setIsClaiming(true);
      }

      setCountDown(Math.ceil(remainingTime) < 0 ? 0 : Math.ceil(remainingTime));
    }
  }, [
    currentTime,
    isPaused,
    isClaimed,
    is_authenticated,
    isClaiming,
    campaign,
    duration,
    setIsClaiming,
  ]);

  // useEffect(() => {
  //   console.log('countDown',countDown)
  //   if (countDown === 0 && campaign?.campaignKey) {
  //     fetchVideoCompletion(campaign?.campaignKey, "viewerId");
  //   }
  // }, [countDown, campaign?.campaignKey]);

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  const renderAuthenticatedRoute = () => {
    if (isClaimed) {
      return renderSuccessRoute(campaign);
    }
    if (campaign?.interactiveQuestionId && !isQuizCorrect) return "/quiz";
    if (
      campaign?.additionalTasks &&
      campaign?.additionalTasks.length > 0 &&
      !isTasksComplete
    ) {
      return "/additional-tasks";
    }
    if (campaign?.optionalDataId && !isAnswered) return "/data-fields";
    return renderCampaignRoute(campaign);
  };

  return (
    <>
      {countDown !== -1 && (
        <button
          onClick={() => {
            console.warn("isPaused", isPaused);
            console.warn("isClaimed", isClaimed);
            console.warn("is_authenticated", is_authenticated);
            console.warn("navigateTo", renderAuthenticatedRoute());
            if (isPaused) {
              setIsPaused(false);
            } else if (isClaimed || is_authenticated) {
              setIsPaused(true);
              const navigateTo = renderAuthenticatedRoute();
              setModalOpen(navigateTo);
            } else if (isClaiming) {
              setIsPaused(true);
              setModalOpen("/");
            } else {
              setIsPaused(true);
              setModalOpen("/learn-more");
            }
          }}
          className={
            "flex gap-3 bg-widgetBg justify-between items-center rounded-[79px] text-white font-medium px-2 py-1"
          }
        >
          <div className="md:text-h2 text-h3">
            {!isClaiming && !isPaused
              ? `${buttonText} ${countDown}`
              : buttonText}
          </div>
          <div className={`${isPaused && "bg-white p-1 rounded-full"}`}>
            {isPaused ? (
              <PausedButtonIcon
                fill={widgetCurrentColor}
                className="md:w-[32px] w-[20px]"
              />
            ) : (
              <img
                className={`bg-white rounded-full ${
                  isPaused ? "md:w-[32px] w-[20px]" : "md:w-[40px] w-[28px]"
                }`}
                src={buttonImage}
                alt="reward_button_icon"
              />
            )}
          </div>
        </button>
      )}
    </>
  );
}
