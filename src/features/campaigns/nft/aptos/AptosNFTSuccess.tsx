import { Arrow } from "@/@assets/icons/Arrow";
import { ArrowDown } from "@/@assets/icons/ArrowDown";
import { ArrowUp } from "@/@assets/icons/ArrowUp";
import AnimationButton from "@/@components/buttons/AnimationButton";
import LoaderRound from "@/@components/common/LoaderRound";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import { useAPIdataStore } from "@/@store/APIdataStore";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { getCSSVarByName, handleClickCTA, openInNewTab } from "@/@utils";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";
import { Suspense, lazy, useState } from "react";
const PreviewMedia = lazy(() => import("@/@components/common/PreviewMedia"));

const AptosNFTSuccess = () => {
  const { campaign } = useAPIdataStore();
  const { alreadyClaimed } = useWidgetAppStore();
  const { transactionId: transactionHash } = useNftMintDataStore();

  const [isDetails, setIsDetails] = useState(false);
  const handleToggle = () => {
    setIsDetails(!isDetails);
  };

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <CampaignSuccessLayout
      headerText={alreadyClaimed ? "Already Claimed" : "Your Aptos NFT"}
      displaySuccessImage={false}
    >
      <div
        className={`font-['Clash_Display'] bg-gray-100 rounded-lg mx-auto -mt-[205px] z-40 w-[260px] h-[260px] `}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
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
              mediaUrl={campaign?.nftUrl || ""}
            />
          </Suspense>

          <div className="w-full h-full  absolute bottom-0 ">
            <div
              //  overlay effect for hover
              className={`flex flex-col justify-end w-full h-full p-3 ${
                isDetails ? "bg-black bg-opacity-30" : "bg-nft-success-gradient"
              } rounded-lg`}
            >
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
                href={`https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`}
                className="flex text-xs underline font-medium text-white"
              >
                Transaction Url
              </a>

              {isDetails && (
                <>
                  <p className="text-sm font-medium leading-4 text-white mt-3 pb-2">
                    {campaign?.nftDescription}
                  </p>

                  {/* Marketplace Link */}
                  <div
                    className={`flex items-center justify-center gap-1 rounded-full text-sm font-medium py-1 cursor-pointer text-white bg-[#008BFF]`}
                    onClick={() =>
                      openInNewTab(
                        `https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`
                      )
                    }
                  >
                    Aptos Transaction Hash
                    <Arrow />
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

export default AptosNFTSuccess;
