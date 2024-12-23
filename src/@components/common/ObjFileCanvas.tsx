import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Box3, Object3D, Vector3 } from "three";
interface ObjCanvasProps {
  url: string;
}

const ObjFileCanvas: React.FC<ObjCanvasProps> = ({ url }) => {
  const [model, setModel] = useState<Object3D | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadModel = () => {
      setLoading(true);
      const objLoader = new OBJLoader();

      objLoader.load(
        url,
        (obj) => {
          // Center and scale the model within the view
          const boundingBox = new Box3().setFromObject(obj);
          const size = boundingBox.getSize(new Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);
          const scale = 4 / maxDimension;

          obj.scale.set(scale, scale, scale);
          obj.position.set(
            -boundingBox.getCenter(new Vector3()).x * scale,
            -boundingBox.getCenter(new Vector3()).y * scale,
            -boundingBox.getCenter(new Vector3()).z * scale
          );

          setModel(obj);
          setLoading(false);
        },
        undefined,
        (error) => {
          console.error("Error loading model:", error);
          setLoading(false);
        }
      );
    };

    loadModel();

    return () => {
      setModel(null);
    };
  }, [url]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        {loading ? (
          <Html center>
            <span className="text-base">Loading...</span>
          </Html>
        ) : (
          model && <primitive object={model} />
        )}
      </mesh>
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  );
};
export default ObjFileCanvas;
