import Button from "@/@components/buttons/Button";
import { claimCampaign, mintAptosNFT, updateWalletAccountAddress } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useState, useEffect } from "react";
import { CopyIcon } from "@/@assets/icons/CopyIcon";
import { DisconnectIcon } from "@/@assets/icons/DisconnectIcon";
import copyTextToClipboard from "copy-text-to-clipboard";
import { useRouter } from "next/router";
import { ViewFiIcon } from "@/@assets/icons";
import Loader from "@/@components/common/Loader";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useAuthStore } from "@/@store/authstore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";
import { getCSSVarByName } from "@/@utils";

export default function ConnectAptosWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletType] = useState("MARTIAN");
  const [isMintActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const { campaign, viewerId } = useAPIdataStore();
  const { sharingUrl,     isClaimed,
    setSharingUrl,
    setLeaderboardUrl,
    setReward,
    setClaimStatus, } = useWidgetAppStore();

    const { optionalData1, optionalData2, optionalData3 } =
    useOptionalDataStore();
  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const {
    setTransactionId,
    setNftTokenId,
    setNftWalletAddress,
    setNftWalletType,

  } = useNftMintDataStore();

  const router = useRouter()
  const redirectUrl = window.location.href;
  const connectWallet = async () => {
    if (window.martian) {
      try {
        const accounts = await window.martian.connect();
        setWalletAddress(accounts.address);
        setIsConnected(true);
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      console.error("Martian Wallet is not installed.");
    }
  };
  const disconnectWallet = async () => {
    if (window.martian) {
      try {
        await window.martian.disconnect();
        setWalletAddress(null);
        setIsConnected(false);
      } catch (error) {
        console.error("Error disconnecting from Martian Wallet:", error);
      }
    } else {
      console.error("Martian Wallet is not available.");
    }
  };


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
    } 
  };


  async function aptosMint() {
    try {
      setLoader(true);
      const response = await mintAptosNFT(
        campaign?.nftAddress!,
        campaign?.blockChain!,
        walletAddress as `0x${string}`
      );
      const data = response.data;
      setNftTokenId(data.token.address);
      setTransactionId(data.transaction_hashes.mint);
      setNftWalletAddress(walletAddress as `0x${string}`);
      setNftWalletType("MARTIAN");
      await handleClaim()
      await updateWalletAccountAddress(
        viewerId ?? "",
        campaign!.campaignKey,
        firstName ?? "",
        lastName ?? "",
        loggedInEmail!,
        redirectUrl,
        sharingUrl,
        false,
        walletAddress!,
       '0',
       "",
       walletType,
       "",
       data.transaction_hashes.mint
      );
      router.push("/aptos-nft-success");
    } catch (error) {
      console.log("failed to mint aptos NFT", error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    disconnectWallet();
  }, []);

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
   <CampaignSuccessLayout shouldClaim={false} headerText="Connect Wallet">
     <div className="flex flex-col gap-5 text-sm px-1 pb-4 mt-8 justify-center">
      {loader ? (
        <Loader color={widgetCurrentColor} mainClass="!h-[200px] !w-full flex justify-center"
        className="h-28 w-28" />
      ) : (
        <>
          {" "}
          {isConnected ? (
            <div className="flex justify-between items-center overflow-x-hidden min-h-[26px]">
              <div className="flex gap-2 items-center pl-2">
                {walletType === "MARTIAN" ? (
                  <img
                    className="w-[30px]"
                    src="/img/martian-logo.jpg"
                    alt="martian wallet logo"
                  />
                ) : (
                  <ViewFiIcon width={24} />
                )}
                <span className="tracking-wide">
                  {walletAddress?.substring(0, 4)}
                  ...
                  {walletAddress?.substr(-8)}
                </span>
              </div>

              <DisconnectButton onClick={disconnectWallet} />
              {isMintActive && (
                <CopyButton
                  onClick={() => copyTextToClipboard(walletAddress || "")}
                />
              )}
            </div>
          ) : (
            <Button text="Connect Wallet" handleClick={connectWallet} />
          )}
          <Button
            text="Mint Now"
            handleClick={aptosMint}
            active={isConnected}
          />
        </>
      )}
    </div>
   </CampaignSuccessLayout>
  );
}

// Create a new component for CopyButton
const CopyButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="copy-button">
    <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-hide z-10">
      <CopyIcon width={14} className="mt-[1px]" />
    </div>
    <div
      className=" flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-show z-20"
      onClick={onClick}
    >
      <span className="text-xs px-2">Copy </span>
      <CopyIcon width={14} />
    </div>
  </div>
);

// Create a new component for DisconnectButton
const DisconnectButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="disconnect-button">
    <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer disconnect-button-hide z-10">
      <DisconnectIcon />
    </div>
    <div
      className="flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer disconnect-button-show z-20"
      onClick={onClick}
    >
      <span className="text-xs px-2">Disconnect </span>
      <DisconnectIcon />
    </div>
  </div>
);
