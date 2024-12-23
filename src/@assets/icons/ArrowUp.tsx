export const ArrowUp: React.FC<Props> = (props) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.53125 12.3742L9.08125 6.82422L14.6313 12.3742"
        stroke="white"
        stroke-width="1.665"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
