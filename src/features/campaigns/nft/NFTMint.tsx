import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { TypedDataDomain, ethers } from "ethers";
import { hexlify, randomBytes } from "ethers/lib/utils";
import { MetaKeep } from "metakeep";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import {
  checkWhitelistedWallet,
  getGaslessMint,
  postGaslessMint,
  updateWalletAccountAddress,
  whitelistWallet,
} from "@/@services/api";
import { initializeWeb3Provider } from "@/@utils";
import { NFTTemplate } from "./abis/NFTTemplate";
import TransactionError from "./TransactionError";
import BlockchainError from "./BlockchainError";
import NFTMinting from "./NFTMinting";
import { useRouter } from "next/router";
import useNftMintDataStore from "@/@store/nftMintDataStore";
import NFTMintCard from "./NFTMintCard";

type NFTMintProps = {
  nftAddress: `0x${string}`;
  network: string;
  propsAddress: `0x${string}`;
  walletType: string;
  removeWalletAddress: () => void;
  changeWalletAddress: () => void;
};

// declare global {
//     interface Window {
//         ethereum: any;
//     }
// }

const NFTMint = ({
  nftAddress,
  network,
  propsAddress,
  walletType,
  removeWalletAddress,
  changeWalletAddress,
}: NFTMintProps) => {
  const router = useRouter()
  const redirectUrl = window.location.href;
  const { campaign, viewerId } = useAPIdataStore();
  const {
    email: loggedInEmail,
    accessToken,
    firstName,
    lastName,
  } = useAuthStore();
  const { sharingUrl } = useWidgetAppStore();
  const {
    setTransactionId,
    setNftTokenId,
    setNftAddress,
    setNftWalletAddress,
    setNftWalletType,
  } = useNftMintDataStore();

  const { isConnected, address } = useAccount();
  const { data: hash, error, writeContract } = useWriteContract();

  const [walletAddress, setWalletAddress] = useState<any>(propsAddress);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isRejectedRequest, setIsRejectedRequest] = useState<boolean>(false);
  const [isBlockchainError, setIsBlockchainError] = useState<boolean>(false);
  const [isAlreadyWhitelisted, setIsAlreadyWhitelisted] =
    useState<boolean>(false);
  const [isAlreadyMinted, setIsAlreadyMinted] = useState<boolean>(false);
  const [claimInProgress, setClaimInProgress] = useState(false);
  const result = useBalance({
    address: propsAddress,
    chainId: campaign?.chainId!,
  });

  useEffect(() => {
    const img = new Image();
    img.src = `https://viewfi-test.infura-ipfs.io/ipfs/${campaign?.nftUrl}`;
  }, [campaign?.nftUrl]);

  useEffect(() => {
    if (
      campaign &&
      // viewerId &&
      loggedInEmail &&
      redirectUrl &&
      sharingUrl &&
      result.data?.formatted != null &&
      walletAddress &&
      campaign.nftId
    ) {
      if (claimInProgress) return; // prevent multiple claim and update wallet call
      setClaimInProgress(true);
      updateWalletAccountAddress(
        viewerId ?? "",
        campaign.campaignKey,
        firstName ?? "",
        lastName ?? "",
        loggedInEmail!,
        redirectUrl,
        sharingUrl,
        false,
        walletAddress,
        result.data?.formatted.substring(0, 20),
        campaign.nftId,
        walletType
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaign,
    firstName,
    lastName,
    loggedInEmail,
    walletAddress,
    redirectUrl,
    sharingUrl,
    viewerId,
    result.data,
  ]);

  useEffect(() => {
    if (isConnected) {
      setWalletAddress(address);
      setNftWalletAddress(address || "0x");
    } else if (walletType === "METAKEEP") {
      setWalletAddress(propsAddress);
      setNftWalletAddress(propsAddress);
    } else {
      setWalletAddress("");
      setNftWalletAddress("0x");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
      setNftWalletAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (walletAddress && nftAddress && network) {
      checkWhitelistedWallet(nftAddress, network, walletAddress).then((res) => {
        setIsAlreadyMinted(res.data.minted);
        setIsAlreadyWhitelisted(res.data.whitelisted);
      });
    }
  }, [nftAddress, network, walletAddress]);

  useEffect(() => {
    if (error) {
      console.log((error as BaseError).shortMessage || error.message, "Error");
      setIsBlockchainError(true);
    }
  }, [error]);

  let defaultParams = new Uint8Array(123);
  const nftMetadata = hexlify(randomBytes(32));

  async function getSigner() {
    if (typeof window.ethereum !== "undefined") {
      return new ethers.providers.Web3Provider(window.ethereum).getSigner();
    } else {
      console.error("Please install MetaMask!");
      return null;
    }
  }

  const signTransaction = async (_domain: TypedDataDomain) => {
    const domain = {
      name: _domain.name,
      version: _domain.version,
      chainId: _domain.chainId,
      verifyingContract: _domain.verifyingContract,
    };
    // The data structure of the mint request; should match your contract's structure
    const types = {
      MintRequest: [
        { name: "to", type: "address" },
        { name: "data", type: "bytes" },
      ],
    };
    // The actual data to sign
    const value = {
      to: walletAddress,
      data: nftMetadata, // metadata
    };

    const signer = await getSigner();
    return await signer!._signTypedData(domain, types, value);
  };

  const signByMetaKeep = async (_domain: TypedDataDomain) => {
    const res = await initializeWeb3Provider(loggedInEmail, campaign?.chainId!);
    if (res) {
      const { metaKeepSdk } = res;
      if (!metaKeepSdk) return;
      try {
        const signResponse = await (metaKeepSdk as MetaKeep).signTypedData(
          // Typed data
          {
            types: {
              EIP712Domain: [
                {
                  name: "name",
                  type: "string",
                },
                {
                  name: "version",
                  type: "string",
                },
                {
                  name: "chainId",
                  type: "uint256",
                },
                {
                  name: "verifyingContract",
                  type: "address",
                },
              ],
              MintRequest: [
                {
                  name: "to",
                  type: "address",
                },
                {
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            primaryType: "MintRequest",
            domain: {
              name: _domain.name,
              version: _domain.version,
              chainId: _domain.chainId,
              verifyingContract: _domain.verifyingContract,
            },
            message: {
              to: propsAddress,
              data: nftMetadata,
            },
          },
          // signing reason
          "reason"
        );
        return signResponse.signature;
      } catch (err) {
        // console.log("Error when trying to sign");
        console.log(err);
      }
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  //  END NFT Has Minted FUNCTIONALITY
  const closeMint = () => {
    setIsModalLoading(false);
    setIsRejectedRequest(false);
    setIsBlockchainError(false);
  };

  const handleGaslessMint = async () => {
    const res = await getGaslessMint(nftAddress, network, address);
    const { name, version, chainId, verifyingContract } = res.data;
    if (walletType === "METAKEEP") {
      signByMetaKeep({
        name,
        version,
        chainId,
        verifyingContract,
      }).then((signature: string) => {
        postGaslessMint(
          nftAddress,
          network,
          walletAddress,
          nftMetadata,
          signature,
          Number(campaign?.nftId),
          campaign?.campaignKey ?? "",
          loggedInEmail!,
          accessToken,
          "METAKEEP"
        ).then((res) => {
          setNftTokenId(res.data.tokenId);
          setTransactionId(res.data.transactionHash);
          setNftAddress(nftAddress);
          setNftWalletType(walletType);
          router.push("/nft-mint-success");
        });
      });
    } else {
      signTransaction({
        name,
        version,
        chainId,
        verifyingContract,
      }).then((signature: string) => {
        postGaslessMint(
          nftAddress,
          network,
          walletAddress,
          nftMetadata,
          signature,
          Number(campaign?.nftId),
          campaign?.campaignKey ?? "",
          loggedInEmail!,
          accessToken,
          "METAMASK"
        ).then((res) => {
          setNftTokenId(res.data.tokenId);
          setTransactionId(res.data.transactionHash);
          setNftAddress(nftAddress);
          setNftWalletType(walletType);
          router.push("/nft-mint-success");
        });
      });
    }
  };

  const handleMinting = () => {
    if (campaign?.gasless || walletType === "METAKEEP") {
      handleGaslessMint();
    } else {
      writeContract({
        address: nftAddress,
        abi: NFTTemplate,
        functionName: "mint",
        args: [`0x${Buffer.from(defaultParams).toString("hex")}`],
      });
      setTransactionId(hash || "");
    }
  };

  const handleMint = async () => {
    setIsBlockchainError(false);
    setIsRejectedRequest(false);
    setIsModalLoading(true);

    if (!isAlreadyWhitelisted) {
      await whitelistWallet(
        nftAddress,
        network,
        walletAddress,
        campaign?.nftId!,
        campaign?.campaignKey!,
        loggedInEmail!,
        accessToken
      )
        .then(() => {
          handleMinting();
        })
        .catch((error) => {
          if (error.response.status === 409) {
            handleMinting();
          } else {
            setIsModalLoading(false);
            setIsRejectedRequest(true);
          }
        });
    } else {
      handleMinting();
    }
  };

  useEffect(() => {
    if (isConfirming) {
      setIsModalLoading(true);
    }
    if (isConfirmed) {
      setIsModalLoading(false);
      setTransactionId(hash || "");
      setNftAddress(nftAddress);
      setNftWalletType(walletType);
      router.push("/nft-mint-success");
    }
  }, [isConfirmed, isConfirming]);


  return (
    <>
      {/* {!isProceedMint && walletType === "METAKEEP" ? (
                <MetaKeepSuccess proceedMint={() => setIsProceedMint(true)} /> */}
      {isRejectedRequest ? (
        <TransactionError
          tryAgain={handleMint}
          handleCloseModal={closeMint}
          changeWalletAddress={changeWalletAddress}
        />
      ) : isBlockchainError ? (
        <BlockchainError
          tryAgain={handleMint}
          handleCloseModal={closeMint}
          changeWalletAddress={changeWalletAddress}
        />
      ) : (
        <>
          {isModalLoading ? (
            <NFTMinting handleCloseModal={closeMint} />
          ) : (
            <NFTMintCard
              isAlreadyMinted={isAlreadyMinted}
              walletType={walletType}
              walletAddress={walletAddress}
              isConnected={isConnected}
              removeWalletAddress={removeWalletAddress}
              handleMint={handleMint}
            />
          )}
        </>
      )}
    </>
  );
};

export default NFTMint;
