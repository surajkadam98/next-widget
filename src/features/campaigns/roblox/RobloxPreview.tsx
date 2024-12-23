import useScript from "@/@hooks";
import { Suspense, lazy, useEffect, useState } from "react";
const ObjFileCanvas = lazy(() => import("@/@components/common/ObjFileCanvas"));

interface RobloxPreviewProps {
  fileUrl: string;
  fileName?: string;
}

const RobloxPreview: React.FC<RobloxPreviewProps> = ({
  fileUrl,
  fileName = "",
}) => {
  // Load the model-viewer script for rendering 3D models
  useScript(
    "https://cdn.jsdelivr.net/npm/@google/model-viewer@latest/dist/model-viewer.min.js",
    "module"
  );

  // Extract the file extension to check if it's a GLB or GLTF model
  const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

  // Only allow .glb or .gltf files
  const is3DModel = fileExtension === "glb" || fileExtension === "gltf";

  // State for handling different sizes based on screen width
  const [modelSize, setModelSize] = useState(250);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setModelSize(290); // Set for mobile
      } else {
        setModelSize(250); // Set for other screens
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, []);

  return (
    <div className="flex items-center justify-start text-sm z-50 aspect-square h-full ">
      {/* Display 3D model if the file is a GLB or GLTF */}
      {is3DModel && (
        <model-viewer
          src={fileUrl}
          alt={fileName || "3D model preview"}
          style={{
            height: `${modelSize}px`,
            width: `${modelSize}px`,
          }}
          auto-rotate
          camera-controls
          onError={() => console.log("Error loading model")}
          onLoad={() => console.log("Model loaded successfully")}
        />
      )}
      {/* Display 3D model if the file is a obj */}
      {fileExtension === "obj" && (
        <Suspense
          fallback={
            <span className="w-full text-center text-base">Loading...</span>
          }
        >
          <ObjFileCanvas url={fileUrl} />
        </Suspense>
      )}
    </div>
  );
};

export default RobloxPreview;
