export const PlayButtonIcon: React.FC<Props> = (props) => {
  const widgetColor = props.fill;
  return (
    <svg
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="58"
        height="58"
        rx="12.0833"
        fill="url(#paint0_linear_5341_18836)"
      />
      <path
        d="M18 39.4073V18.0956C18 15.8587 20.445 14.4813 22.3582 15.6403L39.9472 26.2961C41.7915 27.4135 41.7915 30.0894 39.9472 31.2067L22.3582 41.8625C20.445 43.0216 18 41.6441 18 39.4073Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5341_18836"
          x1="6.21428"
          y1="9.36007e-07"
          x2="42.3846"
          y2="55.7692"
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
