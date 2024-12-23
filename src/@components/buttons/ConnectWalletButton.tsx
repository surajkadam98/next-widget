import { useAPIdataStore } from "@/@store/APIdataStore";

interface ConnectWalletButtonProps {
  onClick: () => void;
}

export default function ConnectWalletButton({
  onClick,
}: ConnectWalletButtonProps) {
  const { widgetProp } = useAPIdataStore();
  return (
    <button
      className="bg-widgetBg flex items-center justify-center rounded-[60px] p-[10px] w-full z-20"
      onClick={onClick}
    >
      <div className="text-white text-base font-medium">
        {widgetProp?.label.existingWallet || "Connect Existing Wallet"}
      </div>
    </button>
  );
}
