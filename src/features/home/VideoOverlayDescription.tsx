import { Helmet } from "react-helmet";
import { useVideoPlayerStore } from "@/@store/videoPlayerStore";
import { useAPIdataStore } from "@/@store/APIdataStore";

export const VideoOverLayDescription = () => {
  const { campaign, brand, logo } = useAPIdataStore();

  const { isPlaying, isPaused, setIsPlaying, setIsPaused } =
    useVideoPlayerStore();

  const zIndex =
    campaign?.videoSource === "CDN" ||
    campaign?.videoSource === "VIMEO" ||
    campaign?.videoSource === "LIVEPEER" ||
    campaign?.videoSource === "UPLOAD_LIVEPEER"
      ? "z-30"
      : "z-0";
  return (
    <>
      <div
        className={`bg-center bg-cover w-full h-screen absolute top-0 left-0 cursor-pointer ${
          !isPlaying ? "blur-[5px]" : "opacity-0"
        } ${zIndex}`}
        style={{
          backgroundImage: `url(${campaign?.opengraph.imageUrl || ""})`,
        }}
        onClick={() => {
          setIsPlaying(true);
          setIsPaused(!isPaused);
        }}
      ></div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{brand}</title>
        <meta name="description" content={campaign?.headline} />
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={campaign?.overlayText} />
        <meta property="og:description" content={campaign?.headline} />
        <meta property="og:image" content={campaign?.opengraph.imageUrl} />
        <meta property="og:url" content={campaign?.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={campaign?.overlayText} />
        <meta name="twitter:description" content={campaign?.headline} />
        <meta name="twitter:image" content={campaign?.opengraph.imageUrl} />
      </Helmet>
    </>
  );
};
