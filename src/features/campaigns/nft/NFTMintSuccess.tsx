import { PlusIcon } from "@/@assets/icons/PlusIcon";
import { ArrowUp } from "@/@assets/icons/ArrowUp";
import AnimationButton from "@/@components/buttons/AnimationButton";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import { updateWalletAccountAddress } from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import {
  getCSSVarByName,
  getMarketplaceBtnColor,
  getMarketplaceBtnText,
  getTransactionUrl,
  handleClickCTA,
  importNFTtoWallet,
  openMarketplaceUrl,
} from "@/@utils";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";
import { Suspense, lazy, useEffect, useState } from "react";
import { useAccount, useBalance, useReadContract, useSwitchChain } from "wagmi";
import { ArrowDown } from "@/@assets/icons/ArrowDown";
import { Arrow } from "@/@assets/icons/Arrow";
import LoaderRound from "@/@components/common/LoaderRound";
const PreviewMedia = lazy(() => import("@/@components/common/PreviewMedia"));

// interface NFTMintSuccessProps {
//   logo?: string;
//   network?: string;
//   nftImage?: string;
//   nftTokenId?: string;
//   nftAddress?: `0x${string}`;
//   transactionHash?: string;
//   propsAddress: `0x${string}`;
//   walletType: string;
// }

const NFTMintSuccess = () => {
  const redirectUrl = window.location.href;

  const {
    transactionId: transactionHash,
    nftTokenId,
    nftAddress,
    nftWalletAddress: propsAddress,
    nftWalletType: walletType,
  } = useNftMintDataStore();

  const { email: loggedInEmail, firstName, lastName } = useAuthStore();
  const { campaign, viewerId, widgetProp } = useAPIdataStore();
  const { sharingUrl, isClaimed } = useWidgetAppStore();

  const [claimInProgress, setClaimInProgress] = useState(false);
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();
  const [isSwitch, setIsSwitch] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const [imageUrl, setImageUrl] = useState(
    `https://viewfi-test.infura-ipfs.io/ipfs/${campaign?.nftUrl}`
  );

  // Fallback URL using a public IPFS gateway
  const fallbackUrl = `https://ipfs.io/ipfs/${campaign?.nftUrl}`;

  const [isDetails, setIsDetails] = useState(false);
  const handleToggle = () => {
    setIsDetails(!isDetails);
  };

  const handleError = () => {
    setImageUrl(fallbackUrl);
  };

  useEffect(() => {
    if (campaign?.chainId && chain?.id && switchChain) {
      const chainId = campaign?.chainId;
      if (chainId !== chain.id && isSwitch) {
        switchChain({ chainId: chainId! });
      }
    }
  }, [switchChain, campaign?.chainId, chain?.id, isSwitch]);

  const { data: tokenIdData } = useReadContract({
    address: nftAddress,
    abi: [
      {
        inputs: [],
        name: "id",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "id",
  });

  useEffect(() => {
    if (tokenIdData == null) {
      // If `tokenIdData` is null or undefined, ignore it.
    } else {
      // Parse `tokenIdData` to an integer and increment it. This is done because the token ID in the
      // blockchain might start from 0, but for display purposes or further processing, a 1-based index
      // is more intuitive or required.
      setTokenId(tokenIdData!.toString());
    }
  }, [tokenIdData]);

  const result = useBalance({
    address: propsAddress,
    chainId: campaign?.chainId!,
  });

  const nftId = walletType === "METAKEEP" ? nftTokenId : tokenId;

  useEffect(() => {
    if (
      campaign &&
      // viewerId &&
      loggedInEmail &&
      redirectUrl &&
      sharingUrl &&
      result.data?.formatted != null &&
      transactionHash &&
      campaign.nftId &&
      nftId
    ) {
      if (claimInProgress) return; // prevent multiple updatewallet call
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
        result.data?.formatted.substring(0, 20),
        campaign.nftId,
        walletType,
        nftId,
        transactionHash
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaign,
    firstName,
    lastName,
    loggedInEmail,
    redirectUrl,
    sharingUrl,
    viewerId,
    result.data,
    nftId,
    walletType,
    transactionHash,
  ]);

  const btnColor = getMarketplaceBtnColor(campaign?.marketplaceUrl ?? "");
  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <CampaignSuccessLayout
      headerText={widgetProp?.label?.nftClaimed || "NFT Claimed"}
      displaySuccessImage={false}
    >
      <div
        className={`font-['Clash_Display'] bg-gray-100 rounded-lg mx-auto -mt-[205px] z-40 w-[260px] h-[260px]`}
        // onMouseEnter={handleToggle}
        // onMouseLeave={handleToggle}
      >
        <div className="overflow-hidden relative">
          <Suspense
            fallback={
              <div className="w-full h-[260px] flex items-center justify-center">
                <LoaderRound colorCode={widgetCurrentColor} />
              </div>
            }
          >
            <PreviewMedia
              extension={campaign?.nftExtension || ""}
              mediaUrl={imageUrl}
              handleError={handleError}
            />
          </Suspense>

          <div className="w-full h-full absolute bottom-0">
            <div  //  overlay effect for hover
              className={`flex flex-col justify-end w-full h-full p-3 ${
                isDetails ? "bg-gradient-to-t from-black via-black/60 to-transparent" : "bg-nft-success-gradient"
              } rounded-lg`}>
                           <div
              className="flex justify-between items-center gap-1 cursor-pointer"
              onClick={handleToggle}
            >
              <p className="text-lg font-medium leading-normal text-white">
                {campaign?.nftTitle || ""}
              </p>
              {isDetails ? <ArrowDown /> : <ArrowUp />}
            </div>

            <a
              target="_blank"
              rel="noreferrer"
              href={getTransactionUrl(
                campaign?.transactionUrl ?? "",
                transactionHash ?? ""
              )}
              className="inline-block max-w-min text-xs underline font-medium text-white"
            >
              #{nftId}
            </a>

            {isDetails && (
              <>
                <p className="text-sm font-medium leading-4 text-white mt-3">
                  {campaign?.nftDescription}
                </p>
                <div className="flex gap-2.5 mt-3">
                  {!isClaimed && (
                    <div
                      className={`flex items-center justify-center gap-1 w-[85px] rounded-full text-sm font-medium py-1 cursor-pointer text-white bg-widgetBg`}
                      onClick={() => {
                        setIsSwitch(true);
                        importNFTtoWallet(
                          campaign?.nftAddress || "",
                          nftId || ""
                        );
                      }}
                    >
                      Import
                      <PlusIcon />
                    </div>
                  )}
                  {/* Marketplace Link */}
                  <div
                    className={`flex items-center justify-center gap-1 w-[110px] rounded-full text-sm font-medium py-1 cursor-pointer text-white ${btnColor}`}
                    onClick={() =>
                      openMarketplaceUrl(
                        campaign?.marketplaceUrl ?? "",
                        nftId ?? ""
                      )
                    }
                  >
                    {getMarketplaceBtnText(campaign?.marketplaceUrl ?? "")}
                    <Arrow />
                  </div>
                </div>
              </>
            )}
              </div>
 
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-1 mt-6">
        <div className="z-20 break-words whitespace-pre-line text-sm pt-1 pl-1 text-[#02172E]">
          {campaign?.freeformPerkExplanation}
        </div>

        {campaign?.unlockActionText && campaign?.unlockActionLink && (
          <AnimationButton
            text={campaign?.unlockActionText || ""}
            width="w-4/5"
            handleClick={() => handleClickCTA(campaign)}
          />
        )}

        <SocialLeaderBoard />
      </div>
    </CampaignSuccessLayout>
  );
};

export default NFTMintSuccess;
