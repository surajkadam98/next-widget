import { useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import copyTextToClipboard from "copy-text-to-clipboard";
import { ViewFiIcon } from "@/@assets/icons";
import { CopyIcon } from "@/@assets/icons/CopyIcon";
import { DisconnectIcon } from "@/@assets/icons/DisconnectIcon";
import Button from "@/@components/buttons/Button";
import { useAPIdataStore } from "@/@store/APIdataStore";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

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

type NFTMintCardProps = {
  isAlreadyMinted: boolean;
  walletType: string;
  walletAddress: string;
  isConnected: boolean;
  removeWalletAddress: () => void;
  handleMint: () => void;
};

const NFTMintCard = ({
  isAlreadyMinted,
  walletType,
  walletAddress,
  isConnected,
  removeWalletAddress,
  handleMint,
}: NFTMintCardProps) => {
  const { widgetProp } = useAPIdataStore();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const isMintActive =
    !isAlreadyMinted && (isConnected || walletType === "METAKEEP");

  return (
    <CampaignSuccessLayout
      shouldClaim={false}
      headerText={widgetProp?.button.claimPerk || "Claim Now"}
    >
      <div>
        <div className="flex flex-col gap-5 text-sm px-1 pb-4 mt-8">
          {isAlreadyMinted && (
            <div className="text-[#344860] z-20 break-words">
              "The connected address has been already minted. Please use another
              address."
            </div>
          )}

          {isConnected || walletType === "METAKEEP" ? (
            <div className="flex justify-between items-center overflow-x-hidden min-h-[26px]">
              <div className="flex gap-2 items-center">
                {walletType === "METAKEEP" ? (
                  <ViewFiIcon width={24} />
                ) : (
                  <img src="/img/metamask_fox.png" alt="metamask_fox" />
                )}
                <span className="tracking-wide">
                  {walletAddress?.substring(0, 4)}
                  ...
                  {walletAddress?.substr(-8)}
                </span>
              </div>
              {walletType !== "METAKEEP" ? (
                <DisconnectButton onClick={() => disconnect()} />
              ) : isMintActive ? (
                <CopyButton
                  onClick={() => copyTextToClipboard(walletAddress || "")}
                />
              ) : (
                <DisconnectButton onClick={removeWalletAddress} />
              )}
            </div>
          ) : (
            <Button text="Reconnect Wallet" handleClick={() => open()} />
          )}

          <Button
            text={widgetProp?.label.mintNow || "Mint Now"}
            handleClick={handleMint}
            active={isMintActive}
          />
        </div>
      </div>
    </CampaignSuccessLayout>
  );
};

export default NFTMintCard;
