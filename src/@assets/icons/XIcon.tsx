export const XIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_11411_25941)">
        <path d="M15.2716 1.58661H18.0828L11.9411 8.60619L19.1663 18.1582H13.509L9.07804 12.365L4.00796 18.1582H1.19503L7.7642 10.65L0.833008 1.58661H6.63393L10.6392 6.88189L15.2716 1.58661ZM14.2849 16.4756H15.8427L5.7875 3.18089H4.11589L14.2849 16.4756Z" />
      </g>
      <defs>
        <clipPath id="clip0_11411_25941">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
