export const PausedButtonIcon: React.FC<Props> = (props) => {
  const widgetColor = props.fill;
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="19.1657"
        cy="19.1565"
        rx="18.5192"
        ry="18.512"
        fill="url(#paint0_linear_5784_14118)"
      />
      <path
        d="M13.9971 24.9819V13.3323C13.9971 12.1095 15.3336 11.3566 16.3794 11.9902L25.9941 17.815C27.0023 18.4257 27.0023 19.8885 25.9941 20.4993L16.3794 26.3241C15.3336 26.9577 13.9971 26.2047 13.9971 24.9819Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5784_14118"
          x1="4.61489"
          y1="0.644532"
          x2="27.7004"
          y2="36.2528"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={widgetColor ? widgetColor : "#FC6165"} />
          <stop
            offset="0.875"
            stopColor={widgetColor ? widgetColor : "#FF2F80"}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
