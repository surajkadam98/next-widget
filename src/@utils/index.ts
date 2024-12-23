/* eslint-disable @typescript-eslint/no-explicit-any */
import { callToActionTracking } from "@/@services/api";
import { CampaignState } from "@/@store/APIdataStore";
import { ethers } from "ethers";
import { MetaKeep } from "metakeep";

export const shareClick = (
  platform: string,
  claimShareUrl: string,
  text: string,
  isMobile: boolean
): void => {
  let url: string = `https://www.facebook.com/sharer/sharer.php?u=${claimShareUrl}&t=${text}`;

  switch (platform) {
    case "twitter":
      url = `https://twitter.com/share?url=${claimShareUrl}&text=${text}`;
      break;
    case "line":
      url = `https://social-plugins.line.me/lineit/share?url=${claimShareUrl}`;
      break;
    case "whatsApp":
      url = isMobile
        ? encodeURI(`whatsapp://send?text=${text} ${claimShareUrl}`)
        : encodeURI(
            `https://api.whatsapp.com/send?text=text=${text} ${claimShareUrl}`
          );
      break;
    case "linkedin":
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${claimShareUrl}`;
      break;
    default:
      break;
  }

  window.open(
    url,
    "",
    !isMobile
      ? "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
      : ""
  );
};

export const isLessThanAMinuteBefore = (timeString: string): boolean => {
  // Parse the time string to a Date object
  const time = new Date(timeString);

  // Get the current time
  const currentTime = new Date();

  // Calculate the difference in milliseconds
  const diff = currentTime.getTime() - time.getTime();

  // Check if the difference is less than 60000 milliseconds (1 minute)
  return diff < 60000;
};

// export const getBlockchainName = (
//   blockchain: string,
//   domain: string
// ): string => {
//   switch (blockchain) {
//     case "ETHEREUM":
//       return "ethereum";
//     case "POLYGON":
//       if (domain.includes("test") || domain.includes("localhost"))
//         return "polygon_mumbai";
//       return "polygon";
//     case "LINEA":
//       if (domain.includes("test") || domain.includes("localhost"))
//         return "linea_testnet";
//       return "linea";
//     default:
//       return "";
//   }
// };

export const getTransactionUrl = (
  transactionUrl: string,
  txHash: string
): string => {
  return transactionUrl.replace("{txHash}", txHash);
};

export const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

export const openMarketplaceUrl = (urlTemplate: string, tokenId: string) => {
  const link = urlTemplate.replace("{nftId}", tokenId);

  openInNewTab(link);
};

type EthereumProvider = {
  request: (request: { method: string; params: any }) => Promise<any>;
};

export const importNFTtoWallet = async (nftAddress: string, nftId: string) => {
  if (typeof window?.ethereum !== "undefined") {
    // Ethereum user detected. You can now use the provider.
    try {
      const provider = window.ethereum as EthereumProvider;
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          // or 'ERC721'
          type: "ERC1155",
          options: {
            address: nftAddress,
            tokenId: nftId,
          },
        },
      });
      // console.log(wasAdded, "wasAdded");
    } catch (error) {
      console.log("add wallet error", error);
    }
  } else {
    // Non-Ethereum browser detected. You should handle this scenario.
    console.error("Please install MetaMask!");
  }
};

export const handleClickCTA = (campaign: CampaignState | null): void => {
  if (!campaign) return;
  callToActionTracking(campaign.campaignKey);
  openInNewTab(campaign.unlockActionLink);
};

export const openInNewTab = (urlString: string) => {
  const url = urlString.startsWith("http") ? urlString : "https://" + urlString;
  const link = document.createElement("a");

  // Set the href attribute to the URL
  link.href = url;

  // Set the target attribute to '_blank' to open in a new tab
  link.target = "_blank";

  // Append the <a> element to the document body temporarily
  document.body.appendChild(link);

  // Programmatically click the <a> element
  link.click();

  // Remove the <a> element from the document body
  document.body.removeChild(link);
};

export const openInNewWindow = (urlString: string) => {
  const constructUrl = urlString.startsWith("http")
    ? urlString
    : "https://" + urlString;
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  const left = window.innerWidth / 4;
  const top = window.innerHeight / 4;

  window.open(
    constructUrl,
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

// export const switchNetworkhandler = (
//     blockchain: string,
//     switchNetwork: ((chainId_?: number | undefined) => void) | undefined,
//     currentChainId: number
// ) => {
//     if (switchNetwork) {
//         // POLYGON, ETHEREUM, NEAR, LINEA
//         let desiredNetworkId: number;

//         if (blockchain === "POLYGON") {
//             desiredNetworkId = PRODUCTION ? polygon.id : polygonAmoy.id;
//         } else if (blockchain === "ETHEREUM") {
//             desiredNetworkId = PRODUCTION ? mainnet.id : goerli.id;
//         } else if (blockchain === "LINEA") {
//             desiredNetworkId = PRODUCTION ? linea.id : lineaSepolia.id;
//         } else if (blockchain === "NEAR") {
//             desiredNetworkId = PRODUCTION ? aurora.id : auroraTestnet.id;
//         } else {
//             // Unknown blockchain
//             return;
//         }
//         // console.log("desired", desiredNetworkId, "current", currentChainId);
//         if (desiredNetworkId !== currentChainId) {
//             // console.log("switching network");
//             switchNetwork(desiredNetworkId);
//         }
//     }
// };

// export const getCampaignChainId = (blockchain: string) => {
//     let desiredNetworkId: number;
//     if (blockchain === "POLYGON") {
//         desiredNetworkId = PRODUCTION ? polygon.id : polygonAmoy.id;
//     } else if (blockchain === "ETHEREUM") {
//         desiredNetworkId = PRODUCTION ? mainnet.id : goerli.id;
//     } else if (blockchain === "LINEA") {
//         desiredNetworkId = PRODUCTION ? linea.id : lineaSepolia.id;
//     } else if (blockchain === "NEAR") {
//         desiredNetworkId = PRODUCTION ? aurora.id : auroraTestnet.id;
//     } else {
//         // Unknown blockchain
//         return;
//     }
//     return desiredNetworkId;
// };

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

let web3Provider: any;
let ethersProvider: ethers.providers.Web3Provider;
let signer: ethers.providers.JsonRpcSigner;

export const initializeWeb3Provider = async (
  email: string | null | undefined,
  chainId: number
): Promise<{ metaKeepSdk: MetaKeep; signerAddress: string } | undefined> => {
  try {
    /* Init SDK */
    const metaKeepSdk = new MetaKeep({
      appId: process.env.NEXT_PUBLIC_METAKEEP_APP_ID ?? "",
      chainId: chainId,
      user: {
        email: email,
      },
      rpcNodeUrls: {
        137: "https://rpc.ankr.com/polygon",
        80002: "https://rpc.ankr.com/polygon_amoy",
        59144: "https://rpc.linea.build",
        59141: "https://rpc.sepolia.linea.build",
        8453: "https://mainnet.base.org",
        84532: "https://base-sepolia-rpc.publicnode.com",
        10: "https://mainnet.optimism.io",
        11155420: "https://sepolia.optimism.io",
        42161: "https://arb1.arbitrum.io/rpc",
        421614: "https://goerli-rollup.arbitrum.io/rpc",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        43113: "https://api.avax-test.network/ext/bc/C/rpc",
      },
    });

    web3Provider = await metaKeepSdk.ethereum;
    await web3Provider.enable();

    ethersProvider = new ethers.providers.Web3Provider(web3Provider);
    signer = ethersProvider.getSigner();

    const signerAddress = await signer.getAddress();

    return { metaKeepSdk: metaKeepSdk, signerAddress: signerAddress };
  } catch (error) {
    console.error("Failed to initialize web3 provider:", error);
  }
};

export const getCSSVarByName = (cssVar: string) => {
  if (typeof window === "undefined") {
    // Return a fallback value or handle the case when this is called server-side
    return "";
  }

  const rootStyle = getComputedStyle(document.documentElement);
  return rootStyle.getPropertyValue(`${cssVar}`).trim();
};

interface MarketplaceData {
  [key: string]: {
    icon: string;
    color: string;
    text: string;
  };
}

const marketplaceData: MarketplaceData = {
  "opensea.io": {
    icon: "/img/opensea-icon.svg",
    color: "bg-[#008BFF]",
    text: "OpenSea",
  },
  "bilinear.io": {
    icon: "/img/bilinear-icon.svg",
    color: "bg-[#E21280]",
    text: "Bilinear",
  },
  "magiceden.io": {
    icon: "/img/magiceden-icon.svg",
    color: "bg-gradient-to-r from-[#B12D71] to-[#AA2AE3]",
    text: "Magic Eden",
  },
  "rarible.com": {
    icon: "/img/rarible-icon.svg",
    color: "bg-[#FEDA03]",
    text: "Rarible",
  },
};

export const getMarketplaceBtnIcon = (url: string) => {
  for (const key in marketplaceData) {
    if (url.includes(key)) return marketplaceData[key].icon;
  }
};

export const getMarketplaceBtnColor = (url: string) => {
  for (const key in marketplaceData) {
    if (url.includes(key)) return marketplaceData[key].color;
  }
};

export const getMarketplaceBtnText = (url: string) => {
  for (const key in marketplaceData) {
    if (url.includes(key)) return marketplaceData[key].text;
  }
};

export const renderCampaignRoute = (
  campaign: CampaignState | null
) => {
  if (!campaign) return '/'
  switch (campaign.type) {
    case "COUPON":
      return "/coupon-success";
    case "MULTICOUPON":
      return "/coupon-success";
      case "LINK":
        return "/link-success";
      case "MULTILINK":
        return "/link-success";
    case "COMPETITION":
      if (campaign.blockChain)
        return "/airdrop"; // contest campaign with blockchain enabled
      else return "/competition-success";
    case "FREEFORM":
      return "/freeform-success";
    case "ROBLOX":
      return "/roblox-success";
    case "NFT":
      if (campaign.blockChain === 'APTOS') {
        return '/connect-aptos-wallet'
      }
      return "/nft";
    case "AIRDROP":
      return "/airdrop";
    case "WHITELIST":
      return "/airdrop";
    default:
      return "/";
  }
};

export const renderSuccessRoute = (
  campaign: CampaignState | null
) => {
  if (!campaign) return '/'
  switch (campaign.type) {
    case "COUPON":
      return "/coupon-success";
    case "MULTICOUPON":
      return "/coupon-success";
      case "LINK":
        return "/link-success";
      case "MULTILINK":
        return "/link-success";
    case "COMPETITION":
      if (campaign.blockChain)
        return "/airdrop/success-already-claim"; // contest campaign with blockchain enabled
      else return "/competition-success";
    case "FREEFORM":
      return "/freeform-success";
    case "ROBLOX":
      return "/roblox-success";
    case "NFT":
      if (campaign.blockChain === 'APTOS') {
        return '/aptos-nft-success'
      }
      return "/nft-mint-success";
    case "AIRDROP":
      return "/airdrop/success-already-claim";
    case "WHITELIST":
      return "/airdrop/success-already-claim";
    default:
      return "/";
  }
};
