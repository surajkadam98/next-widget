"use client";
import { RefObject, useEffect, useState } from "react";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import dynamic from "next/dynamic";
import { useModalStore } from "@/@store/modalStore";
import { useAuthStore } from "@/@store/authstore";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { fetchStartVideo, fetchVideoCompletion } from "@/@services/api";
import { renderCampaignRoute, renderSuccessRoute } from "@/@utils";
import { AxiosError } from "axios";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoPlayerProps = {
  playerRef?: RefObject<any>;
  volume: number;
};

export function VideoPlayer({ playerRef, volume }: VideoPlayerProps) {
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const { isModalOpen, setModalOpen } = useModalStore();
  const { authorized: is_authenticated } = useAuthStore();
  const { campaign } = useAPIdataStore();

  const {
    isPaused,
    isPlaying,
    isMuted,
    setCurrentTime,
    setDuration,
    setIsPaused,
    setIsPlaying,
    setHasVideoLoaded,
  } = useVideoPlayerStore();

  const { isClaimed, isQuizCorrect, isTasksComplete, isAnswered } =
    useWidgetAppStore();

  const renderAuthenticatedRoute = () => {
    if (isClaimed) {
      return renderSuccessRoute(campaign);
    }
    if (campaign?.interactiveQuestionId && !isQuizCorrect) return "/quiz";
    if (
      campaign?.additionalTasks &&
      campaign?.additionalTasks.length > 0 &&
      !isTasksComplete
    ) {
      return "/additional-tasks";
    }
    if (campaign?.optionalDataId && !isAnswered) return "/data-fields";
    return renderCampaignRoute(campaign);
  };

  const handleVideoStart = async () => {
    if (!campaign?.campaignKey) {
      console.error("Campaign key is missing.");
      return;
    }
    try {
      const res = await fetchStartVideo(campaign.campaignKey, "viewerId");
      console.log("Video started:", res);
    } catch (error) {
      console.error("Error starting video:", (error as AxiosError)?.response?.data || (error as Error).message);
    }
  };
  

  const handleVideoEnd = async () => {
    setIsVideoComplete(true);
    setIsPaused(true);
    if (!campaign?.campaignKey) {
      console.error("Campaign key is missing.");
      return;
    }
  
    try {
      const res = await fetchVideoCompletion(campaign.campaignKey, "viewerId");
      console.log("Video completed:", res);
    } catch (error) {
      console.error("Error completing video:", (error as AxiosError)?.response?.data || (error as Error).message);
    }
  
    if (isClaimed || is_authenticated) {
      const navigateTo = renderAuthenticatedRoute();
      setModalOpen(navigateTo);
    } else {
      setModalOpen("/claim");
    }
  };


  const handleVideoPause = () => {
    setIsPaused(true);
  };

  const handleVideoPlay = () => {
    setIsPaused(false);
    setIsPlaying(true);
    setIsVideoComplete(false);
    if (isVideoComplete) {
      handleVideoStart();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      try {
        if (campaign?.campaignKey) {
          const res= fetchStartVideo(campaign?.campaignKey, "viewerId"); //TODO: remove viewerId when v1 api is ready
        }
      } catch (error) {
        console.error((error as Error).message);
      }
    }
  }, [isPlaying, campaign?.campaignKey]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsPaused(true);
    } else {
      if (!isModalOpen && isPlaying && isPaused) {
        setIsPaused(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isModalOpen, isPlaying, isPaused]);

  return (
    <div className="w-screen h-screen z-10 bg-black overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={campaign?.url}
        playing={!isPaused}
        id="video-player-viewfi"
        controls={campaign?.playerControls}
        volume={volume}
        muted={isMuted}
        width={"100%"}
        height={"100%"}
        onStart={handleVideoStart}
        onEnded={handleVideoEnd}
        onPause={handleVideoPause}
        onPlay={handleVideoPlay}
        onReady={() => {
          setTimeout(() => {
            setHasVideoLoaded(true);
          }, 500);
        }}
        onProgress={({ playedSeconds }) => {
          // console.log("playedSeconds", playedSeconds);
          setCurrentTime(parseFloat(playedSeconds.toFixed(2)));
        }}
        onDuration={(duration) => {
          setDuration(Math.ceil(duration));
        }}
        config={{
          youtube: {
            playerVars: { disablekb: 1 },
          },
        }}
      />
    </div>
  );
}
