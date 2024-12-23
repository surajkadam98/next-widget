import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export const SolanaWalletProvider = ({
  children,
}: SolanaWalletProviderProps) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network =
    import.meta.env.VITE_MODE === "development"
      ? WalletAdapterNetwork.Testnet
      : WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  console.log('phantom current network', network)

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
