export const Arrow: React.FC<Props> = (props) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.25 10.25L9.75 2.75M9.75 2.75H4.125M9.75 2.75V8.375"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
