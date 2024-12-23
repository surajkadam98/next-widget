export const FacebookIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.6005 4.43332H14.1671V1.78332C13.4086 1.70444 12.6464 1.6655 11.8838 1.66665C9.61712 1.66665 8.06712 3.04998 8.06712 5.58332V7.76665H5.50879V10.7333H8.06712V18.3333H11.1338V10.7333H13.6838L14.0671 7.76665H11.1338V5.87498C11.1338 4.99998 11.3671 4.43332 12.6005 4.43332Z" />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
