export const XPlatformIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M76.3596 7.93292H90.4158L59.7072 43.0308L95.8334 90.7911H67.5469L45.3919 61.8247L20.0415 90.7911H5.97688L38.8227 53.25L4.16675 7.93292H33.1714L53.1976 34.4093L76.3596 7.93292ZM71.4264 82.3778H79.215L28.9392 15.9043H20.5812L71.4264 82.3778Z"
        fill="black"
      />
    </svg>
  );
};

interface Props extends React.SVGProps<SVGSVGElement> {}
