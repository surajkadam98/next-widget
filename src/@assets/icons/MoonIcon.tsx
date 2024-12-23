export const MoonIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.511373 4.69858C0.662116 6.85504 2.49197 8.60953 4.68193 8.70583C6.22705 8.77283 7.60886 8.05261 8.43795 6.91785C8.78131 6.45306 8.59707 6.1432 8.02341 6.24788C7.74286 6.29813 7.45393 6.31907 7.15245 6.30651C5.10485 6.22276 3.42993 4.51015 3.42155 2.48768C3.41737 1.94333 3.53042 1.42829 3.7356 0.959311C3.96172 0.440085 3.68954 0.193034 3.16613 0.414961C1.50795 1.11424 0.373192 2.78498 0.511373 4.69858Z"
        stroke="white"
        strokeWidth="0.628097"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
