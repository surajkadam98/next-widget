import { useAPIdataStore } from "@/@store/APIdataStore";
import { getCSSVarByName } from "@/@utils";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useRef, useState } from "react";

interface ConnectSolanaWalletProps {
  onClick: (address: string) => void;
}

export default function ConnectSolanaWallet({
  onClick,
}: ConnectSolanaWalletProps) {
  const { widgetProp } = useAPIdataStore();
  const { connected, publicKey, wallet, disconnect } = useWallet();
  const [connectionStatus, setConnectionStatus] = useState("");
  const isInitialMount = useRef(true);
  const { onConnect } = useWalletMultiButton({
    onSelectWallet() {},
  });

  useEffect(() => {
    if (connected && wallet && publicKey) {
      onClick(publicKey?.toBase58() || "");
      setConnectionStatus("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, wallet, publicKey]);

  useEffect(() => {
    // auto disconnect on initialization
    if (wallet) {
      disconnect();
    }

    if (isInitialMount.current) {
      setTimeout(() => {
        isInitialMount.current = false;
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // handle situation, if  selected wallet is not installed
    if (wallet && wallet.readyState === "NotDetected") {
      setTimeout(() => {
        disconnect();
        setConnectionStatus("Not Detected, Try again");
      }, 300);
    }

    if (wallet && wallet.readyState === "Installed") {
      if (isInitialMount.current) {
        // do nothing
      } else {
        onConnect && onConnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.readyState]);

  const widgetCurrentColor = getCSSVarByName("--widgetBg");
  return (
    <div>
      <WalletMultiButton
        style={{
          background: widgetCurrentColor,
          borderRadius: "60px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontWeight: 500,
          height: "44px",
        }}
        onClick={(e) => console.log("here is event", e)}
      >
        {connectionStatus
          ? connectionStatus
          : widgetProp?.label.existingWallet || "Connect Existing Wallet"}
      </WalletMultiButton>
    </div>
  );
}
