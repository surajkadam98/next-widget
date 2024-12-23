/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount, useDisconnect } from "wagmi";
import { fetchCheckClaimed } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { renderCampaignRoute, renderSuccessRoute } from "@/@utils";
import { useModalContext } from "@/@components/context/ModalContext";

const useLoginResponseStore = () => {
    const { navigateModal } = useModalContext();
  
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { campaign } = useAPIdataStore();
  const { setUserData } = useAuthStore();
  const {
    isQuizCorrect,
    isTasksComplete,
    isAnswered,
    setIsClaimed,
    setSharingUrl,
    setLeaderboardUrl,
    setAlreadyClaimed,
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

  // Function to handle the state when the claim has already been made
  const handleClaimedState = (data: any) => {
    setIsClaimed(true);
    setSharingUrl(data.sharingUrl);
    setLeaderboardUrl(data.leaderboardUrl);
    setTransactionId(data.transactionId);
    setNftTokenId(data.nftTokenId);
    setNftAddress(data.nftAddress);
    setNftWalletAddress(data.walletAddress);
    setNftWalletType(data.walletType);
    setClaimStatus("ALREADY_CLAIMED")
    setReward(data.reward);
    setWalletAddress(data.walletAddress)
    setWalletType(data.walletType)
  
    navigateModal(
      renderSuccessRoute(
       campaign
      )
    );
    
  };

  // Function to handle the state when the claim has not been made
  const handleUnclaimedState = () => {
    if (campaign?.interactiveQuestionId && !isQuizCorrect) {
      navigateModal("/quiz");
    } else if (
      campaign?.additionalTasks &&
      campaign?.additionalTasks.length > 0 &&
      !isTasksComplete
    ) {
      navigateModal("/additional-tasks");
    } else if (campaign?.optionalDataId && !isAnswered) {
      navigateModal("/data-fields");
    } else
      navigateModal(
        renderCampaignRoute(
         campaign
        )
      );
      
  };

  // Function to handle a successful login and determine claim status
  const handleLoginSuccess = async (userData: any) => {
    setUserData({
      email: userData.email,
      authorized: true,
      firstName: userData.firstName,
      lastName: userData.lastName,
      accessToken: userData.accessToken,
    });
    if (!campaign?.campaignKey || !userData.email) return;

    // After login, disconnect wallet
    if (isConnected) {
      disconnect();
    }
    try {
      // Fetch claim status from the server
      const claimResponse = await fetchCheckClaimed(
        campaign.campaignKey,
        userData.email
      );

      if (claimResponse.data.claimed) {
        setAlreadyClaimed(true)
        handleClaimedState(claimResponse.data);
      } else {
        handleUnclaimedState();
      }
    } catch (error) {
      console.error("Error in claim process:", error);
    }
  };

  return {
    handleLoginSuccess,
  };
};

export default useLoginResponseStore;
