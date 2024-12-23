export const CampaignInfoIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 12 31"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.84235 3.78574C8.84235 5.40315 7.53119 6.71431 5.91378 6.71431C4.29638 6.71431 2.98521 5.40315 2.98521 3.78574C2.98521 2.16834 4.29638 0.857178 5.91378 0.857178C7.53119 0.857178 8.84235 2.16834 8.84235 3.78574ZM8.84235 9.64289V27.2143H11.7709V30.1429H0.0566406V27.2143H2.98521V12.5715H0.0566406V9.64289H8.84235Z"
        fill="white"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
