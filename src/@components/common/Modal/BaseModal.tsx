"use client";
import ModalFooter from "@/@components/modals/ModalFooter";
import { fetchCheckClaimed } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useModalStore } from "@/@store/modalStore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { MouseEventHandler, useEffect, useState } from "react";

interface BaseModalProps {
  children?: React.ReactNode;
}

export default function BaseModal({ children }: BaseModalProps) {
  const { setModalClose, modalHistory } = useModalStore();
  const { campaign } = useAPIdataStore();
  const { email: loggedInEmail } = useAuthStore();
  const { setIsPaused } = useVideoPlayerStore();
  const {
    isClaimed,
    setIsClaimed,
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

  const handleModalClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      if (campaign?.campaignKey && loggedInEmail && !isClaimed) {
        fetchCheckClaimed(campaign.campaignKey, loggedInEmail).then((res) => {
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
      setModalClose(modalHistory);
      setIsPaused(false);
    }
  };

  const [isCentered, setIsCentered] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const modal = document.getElementById("modal-content");
      if (!modal) return;

      const modalHeight = modal.offsetHeight;
      const viewportHeight = window.innerHeight;

      setIsCentered(modalHeight < viewportHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className={`flex ${
          isCentered ? "items-center" : "overflow-y-scroll"
        } justify-center h-screen sm:py-6`}
        onClick={handleModalClose}
      >
        <div
          id="modal-content"
          className="w-full sm:w-[338px] h-full sm:h-[640px] bg-white rounded-none sm:rounded-3xl overflow-hidden"
        >
          <div className="h-full">
              <div className="h-full flex flex-col">
              <div className="flex flex-1 flex-col justify-between p-6 pb-6">
                {children}

              </div>
              <div className="px-6">
          <ModalFooter />
        </div>
              </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
