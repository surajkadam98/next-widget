export const EmailIcon: React.FC<Props> = (props) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_14235_22642)">
        <path d="M16.5 6.13332L8.5 0L0.5 6.13332V15.2H16.5V6.13332Z" fill="#FF2F80" />
        <path d="M14.9795 2.40015H2.01953V14.0801H14.9795V2.40015Z" fill="#F0F7FC" />
        <path d="M11.2992 4.63989H5.69922V5.11989H11.2992V4.63989Z" fill="#D4D4D4" />
        <path d="M12.8197 6.24023H4.17969V6.80023H12.8197V6.24023Z" fill="#D4D4D4" />
        <path d="M12.8197 7.84009H4.17969V8.40009H12.8197V7.84009Z" fill="#D4D4D4" />
        <path d="M16.5 15.2V6.1333L8.5 12.2666L0.5 6.1333V15.2H16.5Z" fill="url(#paint0_linear_14235_22642)" />
        <path d="M8.5 9.06665L16.5 15.2H0.5L8.5 9.06665Z" fill="#FF2F80" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_14235_22642" x1="8.5" y1="6.13318" x2="8.5" y2="15.2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#EE6399" />
          <stop offset="1" stop-color="#FF2F80" />
        </linearGradient>
        <clipPath id="clip0_14235_22642">
          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>

  );
};

interface Props extends React.SVGProps<SVGSVGElement> { }
