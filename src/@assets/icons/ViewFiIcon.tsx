export const ViewFiIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.8011 1.1582L7.34488 4.94195L4.88867 1.1582"
        stroke="url(#paint0_linear_8961_4837)"
        strokeWidth="0.42974"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.16211 4.49996C3.08724 2.33669 5.47891 0.633874 7.34433 0.697013C9.20976 0.633874 11.6014 2.33669 13.5266 4.49996C11.6014 6.66323 9.20976 8.36605 7.34433 8.30291C5.47891 8.36605 3.08724 6.66323 1.16211 4.49996Z"
        stroke="url(#paint1_linear_8961_4837)"
        strokeWidth="0.42974"
      />
      <ellipse
        cx="7.34451"
        cy="4.49922"
        rx="2.22488"
        ry="2.24922"
        stroke="url(#paint2_linear_8961_4837)"
        strokeWidth="0.42974"
        strokeLinejoin="bevel"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8961_4837"
          x1="5.87554"
          y1="8.81782"
          x2="12.9904"
          y2="3.00749"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2D7B" />
          <stop offset="1" stopColor="#EF5BFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_8961_4837"
          x1="5.49246"
          y1="10.6975"
          x2="13.0947"
          y2="2.41711"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2D7B" />
          <stop offset="1" stopColor="#EF5BFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_8961_4837"
          x1="6.01355"
          y1="11.3564"
          x2="13.7581"
          y2="6.53765"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2D7B" />
          <stop offset="1" stopColor="#EF5BFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
