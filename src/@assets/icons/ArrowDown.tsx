export const ArrowDown: React.FC<Props> = (props) => {
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
        d="M14.6289 6.37578L9.07891 11.9258L3.52891 6.37578"
        stroke="white"
        stroke-width="1.665"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
