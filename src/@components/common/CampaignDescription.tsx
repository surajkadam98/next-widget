/* eslint-disable @next/next/no-img-element */
"use client";
import RewardButton from "@/@components/buttons/RewardButton";
import React from 'react';
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";

const CampaignDescription = () => {
  const { logo, campaign, brand } = useAPIdataStore();
  const { isPaused } = useVideoPlayerStore();
  return (
    <div className="relative h-16 sm:h-24">
      <div
        className={`h-full overflow-hidden flex items-center justify-between bg-white bg-opacity-25 backdrop-blur-[100px] ${
          !isPaused && "campaign-description-fade-out"
        }`}
      >
        <div className="flex items-center gap-6 h-full">
          <img
            className=" w-16 md:w-[73px] xl:w-[96px]"
            src={logo}
            alt="Brand Logo"
          />
          <div className="text-white max-sm:hidden">
            <div className="md:text-h2 text-h3 font-semibold">{brand}</div>
            <div className="md:text-h3 text-h4 font-medium">
              {campaign?.overlayText}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-3">
        <RewardButton />
      </div>
    </div>
  );
};

export default React.memo(CampaignDescription);
