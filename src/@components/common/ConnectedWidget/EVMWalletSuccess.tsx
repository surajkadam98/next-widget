import { useEffect, useState } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import moment from "moment";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import copyTextToClipboard from "copy-text-to-clipboard";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { updateWalletAccountAddress } from "@/@services/api";
import { ViewFiIcon } from "@/@assets/icons";
import { DisconnectIcon } from "@/@assets/icons/DisconnectIcon";
import { CopyIcon } from "@/@assets/icons/CopyIcon";
import Button from "@/@components/buttons/Button";
import AnimationButton from "@/@components/buttons/AnimationButton";
import SocialLeaderBoard from "../SocialLeaderBoard";
import { handleClickCTA } from "@/@utils";

type EVMWalletSuccessProps = {
  propsAddress: `0x${string}`;
  walletType: string;
};

const EVMWalletSuccess = ({
  propsAddress,
  walletType,
}: EVMWalletSuccessProps) => {
  const { campaign, viewerId, widgetProp } = useAPIdataStore();
  const { sharingUrl } = useWidgetAppStore();

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();

  const [claimInProgress, setClaimInProgress] = useState(false);

  const [walletAddress, setWalletAddress] = useState<string | undefined>("");
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const { data } = useBalance({ address: propsAddress });

  const redirectUrl = window.location.href;

  useEffect(() => {
    if (isConnected) {
      setWalletAddress(address);
    } else if (walletType === "METAKEEP") {
      setWalletAddress(propsAddress);
    } else {
      setWalletAddress("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, walletType]);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  useEffect(() => {
    console.log("walletAddress", data);
    if (
      campaign &&
      // viewerId &&
      loggedInEmail &&
      redirectUrl &&
      sharingUrl &&
      data?.formatted != null &&
      walletAddress
    ) {
      if (claimInProgress) return; // prevent multiple claim and update wallet call
      setClaimInProgress(true);
      updateWalletAccountAddress(
        viewerId ?? "",
        campaign.campaignKey,
        firstName ?? "",
        lastName ?? "",
        loggedInEmail!,
        redirectUrl,
        sharingUrl,
        false,
        walletAddress,
        data?.formatted.substring(0, 20)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaign,
    firstName,
    lastName,
    loggedInEmail,
    walletAddress,
    redirectUrl,
    sharingUrl,
    viewerId,
    data,
  ]);

  return (
    <div className="flex flex-col gap-5 px-1 text-[14px] mt-3">
      {isConnected || walletType === "METAKEEP" ? (
        <div className="flex justify-between items-center overflow-x-hidden min-h-[26px]">
          <div className="flex gap-2 items-center">
            {walletType === "METAKEEP" ? (
              <ViewFiIcon width={24} />
            ) : (
              <img src="/img/metamask_fox.png" alt="metamask_fox" />
            )}
            <span className="tracking-wide">
              {walletAddress?.substring(0, 4)}...
              {walletAddress?.substr(-8)}
            </span>
          </div>
          {walletType !== "METAKEEP" ? (
            <div className="disconnect-button">
              <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer disconnect-button-hide z-10">
                <DisconnectIcon />
              </div>
              <div
                className=" flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer disconnect-button-show z-20"
                onClick={() => disconnect()}
              >
                <span className="text-xs px-2">Disconnect </span>
                <DisconnectIcon />
              </div>
            </div>
          ) : (
            <div className="copy-button">
              <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-hide z-10">
                <CopyIcon width={14} className="mt-[1px]" />
              </div>
              <div
                className=" flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-show z-20"
                onClick={() => copyTextToClipboard(walletAddress || "")}
              >
                <span className="text-xs px-2">Copy </span>
                <CopyIcon width={14} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button text="Reconnect Wallet" handleClick={() => open()} />
      )}

      {campaign?.freeformPerkExplanation ? (
        <div className="z-20 break-words whitespace-pre-line text-sm">
          {campaign?.freeformPerkExplanation}
        </div>
      ) : (
        <div className="text-sm font-normal text-slate-900 z-20 break-words whitespace-pre-line">
          {widgetProp?.text.unlockedCompetition?.replace(
            "[date]",
            moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")
          ) ||
            `Success. You’ve been entered into the competition. The draw date is on{" "}
          ${moment(campaign?.competitionDrawDate).format("DD MMMM YYYY")}. Good
          luck!`}
        </div>
      )}

      {campaign?.unlockActionText && campaign?.unlockActionLink && (
        <AnimationButton
          text={campaign?.unlockActionText || ""}
          width="w-4/5"
          handleClick={() => handleClickCTA(campaign)}
        />
      )}

      <SocialLeaderBoard />
    </div>
  );
};

export default EVMWalletSuccess;
