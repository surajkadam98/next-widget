import { getCSSVarByName } from "@/@utils";

interface SubmitButtonProps {
  onClick: () => void;
  active: boolean;
  title: string;
  width: string;
  classnames?: string;
}

export default function SubmitButton({
  onClick,
  active,
  title,
  width,
  classnames,
}: SubmitButtonProps) {
  const currentWidgetColor = getCSSVarByName("--widgetBg");
  return (
    <button
      className={`relative flex items-center rounded-[60px] p-1 z-20 ${width} ${classnames} ${
        active ? "bg-widgetBg" : "bg-gray-400"
      }`}
      disabled={!active}
      onClick={onClick}
    >
      <div className={`text-white text-base text-center w-full font-medium truncate p-1 ${width}`}>
        {title}
      </div>
      <div className="border rounded-full bg-white p-4 w-6 h-6 right-2">
        <svg
          className="mt-[-5px] ms-[-7px]"
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill={`${active ? currentWidgetColor : "#858585"}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.72671 8.63825C2.26912 9.06533 2.24439 9.78249 2.67147 10.2401C3.09855 10.6977 3.81571 10.7224 4.27329 10.2953L2.72671 8.63825ZM13.1327 1.5725C13.1542 0.946954 12.6646 0.422358 12.0391 0.400787L1.84512 0.0492719C1.21957 0.0277013 0.694969 0.517324 0.673399 1.14287C0.651828 1.76843 1.14145 2.29302 1.767 2.31459L10.8283 2.62705L10.5158 11.6883C10.4943 12.3139 10.9839 12.8385 11.6094 12.86C12.235 12.8816 12.7596 12.392 12.7811 11.7664L13.1327 1.5725ZM4.27329 10.2953L12.7733 2.36198L11.2267 0.704918L2.72671 8.63825L4.27329 10.2953Z" />
        </svg>
      </div>
    </button>
  );
}
