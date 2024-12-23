import { useAPIdataStore } from "@/@store/APIdataStore";
import { MouseEventHandler } from "react";

interface ClaimButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ClaimButton({
  onClick,
}: ClaimButtonProps) {
  const { widgetProp } = useAPIdataStore();
  return (
    <button
      className="bg-widgetBg flex items-center justify-between rounded-[60px] p-1 w-full"
      onClick={onClick}
    >
      <div className="text-white text-h2 font-medium ps-2">
        {widgetProp?.button.claimPerk || "Claim now"}
      </div>
      <div className="border rounded-full bg-white p-1">
        <img src="/img/star_badge.png" alt="claim_button_banner" />
      </div>
    </button>
  );
}
