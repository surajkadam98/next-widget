export const SunIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.92918 8.91647C7.57902 8.91647 8.91647 7.57902 8.91647 5.92918C8.91647 4.27935 7.57902 2.94189 5.92918 2.94189C4.27935 2.94189 2.94189 4.27935 2.94189 5.92918C2.94189 7.57902 4.27935 8.91647 5.92918 8.91647Z"
        stroke="white"
        strokeWidth="0.689374"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.21075 9.21062L9.151 9.15088M9.151 2.70753L9.21075 2.64778L9.151 2.70753ZM2.6479 9.21062L2.70765 9.15088L2.6479 9.21062ZM5.92932 1.37014V1.33337V1.37014ZM5.92932 10.525V10.4883V10.525ZM1.37026 5.9292H1.3335H1.37026ZM10.5252 5.9292H10.4884H10.5252ZM2.70765 2.70753L2.6479 2.64778L2.70765 2.70753Z"
        stroke="white"
        strokeWidth="0.919166"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
