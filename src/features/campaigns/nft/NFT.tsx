import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import NFTMint from "./NFTMint";
import { ConnectWallet } from "@/@components/common/ConnectWallet";
import { useAPIdataStore } from "@/@store/APIdataStore";

const NFT = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { campaign } = useAPIdataStore();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [walletAddress, setWalletAddress] = useState<any>("");
  const [isDisconnectedInitially, setIsDisconnectedInitially] = useState(false);

  const connectViewFiWallet = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    setWalletType("METAKEEP");
  };

  const connectSolWallet = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    setWalletType("METAMASK");
  };

  useEffect(() => {
    if (!isConnected) {
      setIsDisconnectedInitially(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isConnected && !isDisconnectedInitially) {
      disconnect();
      setIsDisconnectedInitially(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if ((address || isConnected) && isDisconnectedInitially) {
      setIsWalletConnected(true);
      setWalletAddress(address);
      setWalletType("METAMASK");
    }
  }, [address, isConnected, isDisconnectedInitially]);

  const removeWalletAddress = () => {
    setWalletAddress("");
    setIsWalletConnected(false);
    setWalletType("");
  };

  const changeWalletAddress = () => {
    setWalletAddress("");
    setIsWalletConnected(false);
    setWalletType("");

    if (isConnected) {
      disconnect();
    }
  };

  return isWalletConnected || walletAddress ? (
    <NFTMint
      nftAddress={campaign?.nftAddress || "0xa"}
      network={campaign?.blockChain || "POLYGON"}
      propsAddress={walletAddress}
      walletType={walletType}
      removeWalletAddress={removeWalletAddress}
      changeWalletAddress={changeWalletAddress}
    />
  ) : (
    <ConnectWallet
      connectViewFiWallet={connectViewFiWallet}
      connectSolWallet={connectSolWallet}
    />
  );
};

export default NFT;
