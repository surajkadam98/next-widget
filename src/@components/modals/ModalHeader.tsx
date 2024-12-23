import { CloseIcon } from "@/@assets/icons/CloseIcon";
import { fetchCheckClaimed } from "@/@services/api";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useModalStore } from "@/@store/modalStore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useAuthStore } from "@/@store/authstore";

export default function ModalHeader({
  text,
  logo = "",
  handleClose,
  classnames,
}: {
  text: string;
  logo?: string;
  handleClose?: () => void;
  classnames?: string;
}) {
  const { campaign } = useAPIdataStore();
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
  const { setIsPaused } = useVideoPlayerStore();
  const { email: loggedInEmail } = useAuthStore();
  const { setModalClose, modalHistory } = useModalStore();

  const handleCloseModal = () => {
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
    if (handleClose) {
      handleClose();
      setModalClose(modalHistory);
    } else {
      setModalClose(modalHistory);
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`flex justify-between z-20 border w-full rounded-[15px] p-1 ${classnames}`}
    >
      <div className="flex items-center gap-4">
        <img
          className="w-[65px] border-r rounded-[15px] -m-1"
          src={logo}
          alt="Brand Logo"
        />
        <div className="text-white text-xl font-medium capitalize">{text}</div>
      </div>
      <div className="p-2 cursor-pointer h-fit" onClick={handleCloseModal}>
        <CloseIcon />
      </div>
    </div>
  );
}
