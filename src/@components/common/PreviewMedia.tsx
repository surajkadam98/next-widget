type PreviewMediaProps = {
  extension: string;
  mediaUrl: string;
  handleError?: () => void;
};

const images = ["png", "jpg", "jpeg", "gif", "svg"];
const videos = ["mp4", "webm", "m4v", "ogv", "ogg"];
const audios = ["mp3", "oga", "wav"];
const models = ["glb", "gltf"];

const PreviewMedia = ({
  extension,
  mediaUrl,
  handleError,
}: PreviewMediaProps) => {
  return (
    <div className="h-[260px] w-full sm:w-[260px] m-auto relative preview-media-container overflow-hidden">
      {images.includes(extension) && (
        <img
          src={mediaUrl}
          onError={handleError}
          className="h-[260px] w-full rounded-lg"
          alt="nftImage"
        />
      )}

      {videos.includes(extension) && (
        <video autoPlay loop style={{ width: "100%", height: "100%" }}>
          <source src={mediaUrl} />
          <track kind="captions" />
        </video>
      )}

      {audios.includes(extension) && (
        <audio autoPlay loop style={{ width: "100%", height: "100%" }}>
          <source src={mediaUrl} />
          <track kind="captions" />
        </audio>
      )}

      {models.includes(extension) && (
        <model-viewer
          src={mediaUrl}
          alt="Description of the 3D model"
          auto-rotate
          camera-controls
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </div>
  );
};

export default PreviewMedia;
