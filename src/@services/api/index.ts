import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

// Fetches campaign data
function fetchCampaignData(campaignKey: string) {
  return axios.get(`${BASE_URL}/node/campaign/${campaignKey}`);
}

// Fetches campaign impression
function fetchCampaignImpression(campaignKey: string, viewerId: string) {
  return axios.get(
    `${BASE_URL}/node/event/IMPRESSION/campaign/${campaignKey}/viewer/${viewerId}`
  );
}

// Fetches video completion
function fetchVideoCompletion(campaignKey: string, viewerId: string) {
  return axios.get(
    `${BASE_URL}/node/event/COMPLETION/campaign/${campaignKey}/viewer/${viewerId}`
  );
}

// Checks if a campaign has been claimed
function fetchCheckClaimed(campaignKey: string, email: string) {
  return axios.get(
    `${BASE_URL}/node/claim/campaign/${campaignKey}/email/${email}`
  );
}

// Fetches video start
function fetchStartVideo(campaignKey: string, viewerId: string) {
  return axios.get(
    `${BASE_URL}/node/event/START/campaign/${campaignKey}/viewer/${viewerId}`
  );
}

/**
 * Makes a POST request to the server to whitelist wallet address for a NFT campaign.
 * @param contractAddress - The address of the NFT collection.
 * @param blockchain - The blockchain the NFT collection is on.
 * @param address - The address of the wallet.
 */
function whitelistWallet(
  nftAddress: `0x${string}`,
  blockChain: string,
  walletAddress: `0x${string}` | undefined,
  nftId: string,
  campaignKey: string,
  viewerEmail: string,
  accessToken: string
) {
  return axios.post(
    `${BASE_URL}/web3/blockchains/${blockChain}/nfts/${nftAddress}/wallets/${walletAddress}/whitelist`,
    {
      nftId: nftId,
      campaignKey: campaignKey,
      email: viewerEmail,
      accessToken: accessToken,
    }
  );
}

function checkWhitelistedWallet(
  nftAddress: `0x${string}`,
  blockChain: string,
  walletAddress: `0x${string}` | undefined
) {
  return axios.get(
    `${BASE_URL}/web3/blockchains/${blockChain}/nfts/${nftAddress}/wallets/${walletAddress}`
  );
}

// Send post request after user has claimed the campaign
function claimCampaign(
  viewerId: string | null,
  campaignKey: string,
  firstName: string,
  lastName: string,
  email: string,
  optionalData1: string,
  optionalData2: string,
  optionalData3: string,
  redirectUrl: string,
  referrer: string,
  tag: string,
  isSocial: boolean,
  sendEmail: boolean,
  robloxImageTitle?: string,
  robloxImageUrl?: string
) {
  return axios.post(`${BASE_URL}/node/claim`, {
    viewerId: viewerId,
    campaignId: campaignKey,
    firstName: firstName,
    lastName: lastName,
    email: email,
    optionalData1: optionalData1,
    optionalData2: optionalData2,
    optionalData3: optionalData3,
    redirectUrl: redirectUrl,
    referrer: referrer,
    tag: tag,
    isSocial: isSocial,
    sendEmail: sendEmail,
    ...(robloxImageTitle && { robloxImageTitle }),
    ...(robloxImageUrl && { robloxImageUrl }),
  });
}

function putClaimCampaign(
  viewerId: string,
  campaignKey: string,
  firstName: string,
  lastName: string,
  email: string,
  optionalData1: string,
  optionalData2: string,
  optionalData3: string,
  redirectUrl: string,
  sharingUrl: string,
  isSocial: boolean,
  sendEmail: boolean,
  robloxImageTitle?: string,
  robloxImageUrl?: string
) {
  return axios.put(`${BASE_URL}/node/claim`, {
    viewerId: viewerId,
    campaignId: campaignKey,
    firstName: firstName,
    lastName: lastName,
    email: email,
    optionalData1: optionalData1,
    optionalData2: optionalData2,
    optionalData3: optionalData3,
    redirectUrl: redirectUrl,
    sharingUrl: sharingUrl,
    isSocial: isSocial,
    sendEmail: sendEmail,
    ...(robloxImageTitle && { robloxImageTitle }),
    ...(robloxImageUrl && { robloxImageUrl }),
  });
}

// update wallet account address for web3 campaign
function updateWalletAccountAddress(
  viewerId: string,
  campaignKey: string,
  firstName: string,
  lastName: string,
  email: string,
  redirectUrl: string,
  sharingUrl: string,
  isSocial: boolean,
  walletAccount: string,
  balance: string,
  nftId?: string,
  walletType?: string,
  nftTokenId?: string,
  webThreeTransactionId?: string
) {
  return axios.put(`${BASE_URL}/node/claim/updateWalletAccountAddress`, {
    viewerId: viewerId,
    campaignId: campaignKey,
    firstName: firstName,
    lastName: lastName,
    email: email,
    redirectUrl: redirectUrl,
    sharingUrl: sharingUrl,
    isSocial: isSocial,
    walletAccount: walletAccount,
    balance: balance,
    nftNumber: nftId,
    walletType: walletType,
    nftTokenId: nftTokenId,
    webThreeTransactionId: webThreeTransactionId,
  });
}

function getGaslessMint(
  nftAddress: `0x${string}`,
  blockChain: string,
  walletAddress: `0x${string}` | undefined
) {
  return axios.get(
    `${BASE_URL}/web3/blockchains/${blockChain}/nfts/${nftAddress}/wallets/${walletAddress}/mint/gasless`
  );
}

function postGaslessMint(
  nftAddress: `0x${string}`,
  blockChain: string,
  walletAddress: `0x${string}` | undefined,
  data: string,
  signature: string,
  nftId: number,
  campaignKey: string,
  email: string,
  accessToken: string,
  walletType: "METAKEEP" | "METAMASK"
) {
  return axios.post(
    `${BASE_URL}/web3/blockchains/${blockChain}/nfts/${nftAddress}/wallets/${walletAddress}/mint/gasless`,
    {
      data: data,
      signature: signature,
      nftId: nftId,
      campaignKey: campaignKey,
      email: email,
      accessToken: accessToken,
      walletType: walletType,
    }
  );
}

async function mintAptosNFT (  
  nftAddress: `0x${string}`,
  blockChain: string,
  walletAddress: `0x${string}` | undefined,
) {
  return axios.post(
    `${BASE_URL}/web3/blockchains/${blockChain}/nfts/${nftAddress}/wallets/${walletAddress}/mint/aptos`
  );
}


// check response and resolve the data.success
function checkGoogleReCaptcha(response: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/google/recaptcha`, {
        project: "widget",
        response: response,
      })
      .then((res) => {
        resolve(res.data.success);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function callToActionTracking(campaignKey: string) {
  return axios.get(
    `${BASE_URL}/node/event/CLICK/campaign/${campaignKey}/viewer/viewerId`
  );
}

function getViewFiWallet(email: string, campaignId: string) {
  return axios.post(`${BASE_URL}/web3/metakeep/wallet`, {
    email: email,
    campaignKey: campaignId
  });
}

function reportClaims(campaignKey: string, page: number, pageSize: number = 6) {
  return axios.get(
    `${BASE_URL}/leaderboard/${campaignKey}?page=${page}&pageSize=${pageSize}`
  );
}

async function widgetLogin(email: string, firstName: string, lastName: string, optedIn: boolean = false) {
  return await axios.post(`${BASE_URL}/api/v1/widget/auth/login`, {
    email: email.toLowerCase(),
    firstName,
    lastName,
    optedIn,
  });
}

async function widgetConfirmationCode(email: string, confirmationCode: string) {
  return await axios.post(`${BASE_URL}/api/v1/widget/auth/confirm`, {
    email: email.toLowerCase(),
    confirmationCode,
  });
}

export async function googleLogin(accessToken: string, optedIn: boolean = false) {
  return await axios.post(`${BASE_URL}/api/v1/widget/auth/google`, {
    accessToken: accessToken,
    optedIn,
  });
}

export {
  fetchCampaignData,
  fetchCampaignImpression,
  fetchVideoCompletion,
  fetchStartVideo,
  whitelistWallet,
  checkWhitelistedWallet,
  fetchCheckClaimed,
  checkGoogleReCaptcha,
  claimCampaign,
  callToActionTracking,
  updateWalletAccountAddress,
  getGaslessMint,
  postGaslessMint,
  putClaimCampaign,
  getViewFiWallet,
  reportClaims,
  widgetLogin,
  widgetConfirmationCode,
  mintAptosNFT
};
