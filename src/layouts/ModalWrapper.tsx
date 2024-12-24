// components/ModalWrapper.tsx
"use client";
import React from "react";
import BaseModal from "@/@components/common/Modal/BaseModal";
import { useModalContext } from "@/@components/context/ModalContext";
import { modalRoutes } from "@/routes";
import "react-tooltip/dist/react-tooltip.css";
// import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Buffer } from "buffer";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { projectId, wagmiConfig } from "@/@config/wagmiConfig";
import { PostHogProvider } from "posthog-js/react";
import { SolanaWalletProvider } from "@/@components/solanaWalletProvider";
import { useModalStore } from "@/@store/modalStore";

const queryClient = new QueryClient();
// window.Buffer = Buffer;

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: "light",
});

// Utility function to match dynamic routes
export const matchRoute = (pattern: string, route: string): boolean => {
  const regex = new RegExp(
    "^" +
      pattern
        .replace(/:[^/]+/g, "([^/]+)") // Replace dynamic segments with capture groups
        .replace(/\//g, "\\/") +
      "$"
  );
  return regex.test(route);
};

const ModalWrapper: React.FC = () => {
  const { isModalOpen } = useModalStore();
  const { modalHistory } = useModalContext();

  // Get the current route from modal history
  const currentRoute = modalHistory[modalHistory.length - 1] || "/";

  // Match the current route to the modalRoutes
  const matchedRoute = modalRoutes.find(({ path }) =>
    matchRoute(path, currentRoute)
  );

  const Component = matchedRoute ? matchedRoute.Component : null;
  return (
    <>
      {isModalOpen ? (
        <PostHogProvider>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
              >
                <SolanaWalletProvider>
                  <BaseModal>
                    {Component ? <Component /> : <div>Route not found</div>}
                  </BaseModal>
                </SolanaWalletProvider>
              </GoogleOAuthProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </PostHogProvider>
      ) : (
        ""
      )}
    </>
  );
};

export default ModalWrapper;
