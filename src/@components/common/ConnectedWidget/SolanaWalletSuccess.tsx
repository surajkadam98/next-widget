import { useEffect, useState } from "react";
import moment from "moment";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import copyTextToClipboard from "copy-text-to-clipboard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { useAuthStore } from "@/@store/authstore";
import { updateWalletAccountAddress } from "@/@services/api";
import { CopyIcon } from "@/@assets/icons/CopyIcon";
import AnimationButton from "@/@components/buttons/AnimationButton";
import { handleClickCTA } from "@/@utils";
import SocialLeaderBoard from "../SocialLeaderBoard";
import { ViewFiIcon } from "@/@assets/icons";

type SolanaWalletSuccessProps = {
  propsAddress: `0x${string}`;
  walletType: string;
};

const SolanaWalletSuccess = ({
  propsAddress,
  walletType,
}: SolanaWalletSuccessProps) => {
  const { campaign, viewerId, widgetProp } = useAPIdataStore();
  const { sharingUrl } = useWidgetAppStore();

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();

  const [claimInProgress, setClaimInProgress] = useState(false);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const { wallet } = useWallet();

  //   const { data } = useBalance({ address: propsAddress });
  const connection = new Connection(
    clusterApiUrl(
      process.env.NEXT_PUBLIC_MODE === "production" ? "mainnet-beta" : "testnet"
    )
  );

  const redirectUrl = window.location.href;

  useEffect(() => {
    const getBalance = async () => {
      try {
        const publicKey = new PublicKey(propsAddress);
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        //   setError('Failed to fetch balance');
        console.error(error);
      }
    };
    if (propsAddress) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsAddress]);

  useEffect(() => {
    if (
      campaign &&
      // viewerId &&
      loggedInEmail &&
      redirectUrl &&
      sharingUrl &&
      solBalance != null &&
      propsAddress
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
        propsAddress,
        solBalance.toString()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaign,
    firstName,
    lastName,
    loggedInEmail,
    propsAddress,
    redirectUrl,
    sharingUrl,
    viewerId,
    solBalance,
  ]);

  return (
    <div className="flex flex-col gap-5 px-1 text-[14px] mt-3">
      <div className="flex justify-between items-center overflow-x-hidden min-h-[26px]">
        <div className="flex gap-2 items-center">
          {walletType === "METAKEEP" ? (
            <ViewFiIcon width={24} />
          ) : (
            wallet && (
              <img
                className="w-[20px]"
                src={wallet.adapter.icon}
                alt="phantom"
              />
            )
          )}

          <span className="tracking-wide leading-3">
            {propsAddress?.substring(0, 4)}...
            {propsAddress?.substr(-8)}
          </span>
        </div>
        <div className="copy-button">
          <div className="p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-hide z-10">
            <CopyIcon width={14} className="mt-[1px]" />
          </div>
          <div
            className=" flex items-center gap-1 p-1 bg-[#EFF1F7] rounded-full cursor-pointer copy-button-show z-20"
            onClick={() => copyTextToClipboard(propsAddress || "")}
          >
            <span className="text-xs px-2">Copy </span>
            <CopyIcon width={14} />
          </div>
        </div>
      </div>

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

export default SolanaWalletSuccess;
