import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useSwitchChain } from "wagmi";
import React from "react";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { getViewFiWallet } from "@/@services/api";
import ConnectSolanaWallet from "../buttons/ConnectSolanaWallet";
import ConnectWalletButton from "../buttons/ConnectWalletButton";
import { EmailIcon } from "@/@assets/icons/EmailIcon";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

type ConnectWalletProps = {
  connectViewFiWallet: (address: string) => void;
  connectSolWallet: (address: string) => void;
};

export const ConnectWallet = ({
  connectViewFiWallet,
  connectSolWallet,
}: ConnectWalletProps) => {
  const { campaign, widgetProp } = useAPIdataStore();
  const { email: loggedInEmail } = useAuthStore();

  const { chain } = useAccount();
  const { open } = useWeb3Modal();
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [viewFiWallet, setViewFiWallet] = React.useState("");
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    const generateViewFiWallet = async () => {
      const res = await getViewFiWallet(loggedInEmail!, campaign?.campaignKey!);
      if (res) {
        setViewFiWallet(
          campaign?.blockChain === "SOLANA"
            ? res.data.wallet.solAddress
            : res.data.wallet.ethAddress
        );
      }
    };

    if (loggedInEmail) {
      generateViewFiWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInEmail]);

  useEffect(() => {
    if (campaign?.chainId && chain?.id && switchChain) {
      const chainId = campaign?.chainId;
      if (chainId !== chain.id && isSwitch) {
        switchChain({ chainId: chainId! });
      }
    }
  }, [switchChain, campaign?.chainId, chain?.id, isSwitch]);

  const connectMetaMask = async () => {
    setIsSwitch(true);
    open();
  };

  return (
    <CampaignSuccessLayout
      shouldClaim={false}
      headerText={widgetProp?.button.claimPerk || "Claim Now"}
    >
      <div>
        <div className="flex flex-col py-3 gap-4 px-1 pb-4 text-[14px]">
          <div className="flex flex-col gap-1">
            <div className="text-sm">Connected Email</div>
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-[#02172E12] p-[6px]">
                <EmailIcon />
              </div>
              <div className="text-sm">
                {loggedInEmail?.substring(0, 4)}......@
                {loggedInEmail?.split("@")[1]}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {campaign?.blockChain === "SOLANA" ? (
              <ConnectSolanaWallet onClick={connectSolWallet} />
            ) : (
              <ConnectWalletButton onClick={connectMetaMask} />
            )}
          </div>
          {(campaign?.gasless || campaign?.nftAddress == null) &&
            campaign?.metakeepEnabled && (
              <>
                <div className="flex gap-4 items-center">
                  <hr className="w-full" />
                  <span className="text-cdark text-sm">or</span>
                  <hr className="w-full" />
                </div>
                <button
                  className="bg-white rounded-full border border-cdark text-base font-medium text-cdark py-2 cursor-pointer disabled:cursor-not-allowed disabled:text-[#858585] disabled:border-[#858585]"
                  disabled={!campaign.metakeepEnabled}
                  onClick={() => connectViewFiWallet(viewFiWallet)}
                >
                  {widgetProp?.label.continueWallet ||
                    "Continue with ViewDrop Wallet"}
                </button>
                <div className="text-center text-xs text-[#02172EB2]">
                  {widgetProp?.label.createWallet ||
                    "Create a new wallet or connect your existing viewdrop wallet which is linked to your email address."}
                  <br />
                  <a
                    className="text-cdark cursor-pointer underline"
                    href="https://docs.viewfi.io/product-guides/web3-solutions/viewdrop-wallet"
                    target="_blank"
                  >
                    {widgetProp?.title.learnMoreAbout || "Learn More"}
                  </a>
                </div>
              </>
            )}
        </div>
      </div>
    </CampaignSuccessLayout>
  );
};
