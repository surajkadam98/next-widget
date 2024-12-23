/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef } from "react";
import { VideoOverLayDescription } from "./VideoOverlayDescription";
import { VideoPlayer } from "./VideoPlayer";
import ReactPlayer from "react-player";
// import { fetchCampaignData, fetchCampaignImpression } from "@/@services/api";
import PlayButton from "@/@components/buttons/PlayButton";
import CampaignContext from "@/@components/common/CampaignContext";
import React from "react";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { APIdataState, useAPIdataStore } from "@/@store/APIdataStore";
import CampaignDescription from "@/@components/common/CampaignDescription";
import AudioController from "@/@components/common/AudioController";
import { getCSSVarByName } from "@/@utils";
import { useModalStore } from "@/@store/modalStore";
import Loader from "@/@components/common/Loader";


interface IHome {
  campaignId?: string;
  cammpaignData?: APIdataState;
}

const Home: React.FC<IHome> = ({ campaignId = "", cammpaignData }) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const {
    isMuted,
    isPlaying,
    hasVideoLoaded,
    isPaused,
    setIsMuted,
    setIsPlaying,
    setIsPaused,
  } = useVideoPlayerStore();
  const { isModalOpen } = useModalStore();
  const { updateData, widgetProp } = useAPIdataStore();

  const [volume, setVolume] = React.useState(0.6);

  const changeWidgetColor = (color: string) => {
    document.documentElement.style.setProperty("--widgetBg", color);
  };

  useEffect(() => {
    if (cammpaignData) {
      changeWidgetColor(cammpaignData.campaign?.widgetColor || "#0075FF");
      updateData(cammpaignData);

      if (cammpaignData && cammpaignData.campaign?.autoPlay) {
        setIsPaused(false);
        setIsMuted(true);
        setIsPlaying(true);
      }
      if (cammpaignData && cammpaignData.campaign?.videoSource === "VIMEO") {
        setIsMuted(true);
      }
    }
  }, [cammpaignData]);

  // const handleImpression  = async () => {
  //   try {
  //     if (campaignId) {
  //       const res = await fetchCampaignImpression(campaignId, "viewerId");
  //     }
  //   } catch (error) {
  //     console.error((error as Error).message);
  //   }
  // }

  // useEffect(() => {
  //   handleImpression();
  // }, [campaignId]);

  const zIndex =
    cammpaignData?.campaign?.videoSource === "CDN" ||
    cammpaignData?.campaign?.videoSource === "VIMEO" ||
    cammpaignData?.campaign?.videoSource === "LIVEPEER" ||
    cammpaignData?.campaign?.videoSource === "UPLOAD_LIVEPEER"
      ? "z-40"
      : "z-0";
  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <>
      {!hasVideoLoaded && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 duration-300 ease-in-out transition-all flex items-center justify-center w-full h-full bg-white">
          <Loader color={widgetCurrentColor} className="h-28 w-28" />
        </div>
      )}

      <VideoOverLayDescription />

      {!isPlaying && (
        <div
          className={`duration-300 ease-in-out absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${zIndex} -ms-[18px]`}
        >
          <PlayButton
            onClick={() => {
              setIsPlaying(true);
              setIsPaused(false);
            }}
            text={cammpaignData?.campaign?.overlayText}
          />
        </div>
      )}

      <div
        className={`relative ${
          isPlaying ? "opacity-100" : "opacity-[.01]"
        } z-20`}
      >
        <VideoPlayer playerRef={playerRef} volume={volume} />
      </div>

      <div className="absolute z-40 w-full  left-0 top-0">
        {isPlaying && <CampaignDescription />}
      </div>

      {!cammpaignData?.campaign?.playerControls && !isPaused && isPlaying && (
        <AudioController
          ismuted={isMuted}
          setIsmuted={setIsMuted}
          volume={volume}
          setVolume={setVolume}
        />
      )}

      {isPlaying && isPaused && !isModalOpen && (
        <div
          className={`duration-300 ease-in-out absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 sm:hidden -ms-[18px]`}
        >
          <PlayButton
            onClick={() => setIsPaused(false)}
            text={widgetProp?.button.paused || "Paused"}
          />
        </div>
      )}

      {hasVideoLoaded && !isModalOpen && <CampaignContext />}
    </>
  );
};

export default Home;
