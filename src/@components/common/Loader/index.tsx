import { getCSSVarByName } from "@/@utils";
import "./style.css";

interface LoaderProps {
  color?: string; // Optional: Hex color for the SVG stroke
  className?: string; // Optional: Additional class names for the parent div
  mainClass?: string; 
}

export default function Loader({
  color = "#000000",
  className = "",
  mainClass,
}: LoaderProps) {
  const widgetCurrentColor = getCSSVarByName("--widgetBg");
  return (
    <div className={`relative h-screen w-screen ${mainClass}`}>
      <svg
        className={`loader-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
        x="0px"
        y="0px"
        viewBox="0 0 55 23.1"
        height="23.1"
        width="55"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="track opacity-20"
          fill="none"
          stroke={widgetCurrentColor || color}
          strokeWidth="4"
          pathLength="100"
          d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
        />
        <path
          className="car"
          fill="none"
          stroke={color}
          strokeWidth="4"
          pathLength="100"
          d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
        />
      </svg>
    </div>
  );
}
