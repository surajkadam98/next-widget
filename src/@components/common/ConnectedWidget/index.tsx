import { useAPIdataStore } from "@/@store/APIdataStore";
import SolanaWalletSuccess from "./SolanaWalletSuccess";
import EVMWalletSuccess from "./EVMWalletSuccess";

type ConnectWalletSuccessProps = {
  propsAddress: `0x${string}`;
  walletType: string;
};

const ConnectWalletSuccess = ({
  propsAddress,
  walletType,
}: ConnectWalletSuccessProps) => {
  const { campaign } = useAPIdataStore();

  return (
    <>
      {campaign?.blockChain === "SOLANA" ? (
        <SolanaWalletSuccess
          propsAddress={propsAddress}
          walletType={walletType}
        />
      ) : (
        <EVMWalletSuccess propsAddress={propsAddress} walletType={walletType} />
      )}
    </>
  );
};

export default ConnectWalletSuccess;
