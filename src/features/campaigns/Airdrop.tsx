import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectWallet } from "@/@components/common/ConnectWallet";
import ConnectedWidget from "@/@components/common/ConnectedWidget";
import CampaignSuccessLayout from "@/layouts/CampaignSuccessLayout";

const Airdrop = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<any>("");
  const [isDisconnectedInitially, setIsDisconnectedInitially] = useState(false);
  const [walletType, setWalletType] = useState("");
  // const generateMetaKeepWallet = async () => {
  //     setIsWalletCreating(true);
  //     const res = await initializeWeb3Provider(
  //         loggedInEmail,
  //         campaign?.chainId!
  //     );
  //     if (res) {
  //         const { signerAddress } = res;
  //         setIsWalletConnected(true);
  //         setWalletType("METAKEEP");
  //         setWalletAddress(signerAddress);
  //         setIsWalletCreating(false);
  //     }
  // };

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

  // const inputWalletAddress = (address: string) => {
  //     setIsWalletConnected(true);
  //     setWalletType("METAKEEP");
  //     setWalletAddress(address);
  // };

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
    }
  }, [address, isConnected, isDisconnectedInitially]);

  // if (isWalletCreating) {
  //     return <WalletCreating />;
  // } else
  if (isWalletConnected && walletAddress) {
    return (
      <CampaignSuccessLayout headerText="Success">
        <ConnectedWidget propsAddress={walletAddress} walletType={walletType} />
      </CampaignSuccessLayout>
    );
  } else {
    return (
      <ConnectWallet
        connectViewFiWallet={connectViewFiWallet}
        connectSolWallet={connectSolWallet}
        // inputWalletAddress={inputWalletAddress}
      />
    );
  }
};

export default Airdrop;
