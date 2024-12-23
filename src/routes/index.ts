/* eslint-disable @typescript-eslint/no-explicit-any */
import AdditionalTasks from "@/@components/modal/AdditionalTask";
import Airdrop from "@/@components/modal/Airdrop";
import Claim from "@/@components/modal/Claim";
import Claimed from "@/@components/modal/Claimed";
import Competition from "@/@components/modal/Competition";
import Coupon from "@/@components/modal/Coupon";
import FreeForm from "@/@components/modal/FreeForm";
import LearnMore from "@/@components/modal/LearnMore";
import NFT from "@/@components/modal/NFT";
import NFTMintSuccess from "@/@components/modal/NFTMintSuccess";
import OptionalDataFields from "@/@components/modal/OptionalDataFields";
import Quiz from "@/@components/modal/Quiz";
import RewardLink from "@/@components/modal/RewardLink";
import Roblox from "@/@components/modal/Roblox";
import SignIn from "@/@components/modal/SignIn";
import TermsOfUse from "@/@components/modal/TermsOfUse";
import VerifyOTP from "@/@components/modal/VerifyOTP";
import AptosNFTSuccess from "@/@components/modal/AptosNFTSuccess";
import ConnectAptosWallet from "@/@components/modal/ConnectAptosWallet";
import AirdropSuccessAlreadyClaim from "@/@components/modal/AirdropSuccessAlreadyClaim";
import { ReactNode } from "react";
// import Home from "@/features/home";
// import { LeaderBoard } from "@/@components/LeaderBoard";
// import NotFound from "@/@components/NotFound";

interface Route {
  path: string;
  Component: () => ReactNode;
}

// export const browserRoutes: Route[] = [
//   {
//     path: "/campaign/:campaignKey",
//     Component: LeaderBoard,
//   },
//   {
//     path: "/:campaignKey/leaderboard",
//     Component: LeaderBoard,
//   },
//   {
//     path: "*",
//     Component: NotFound,
//   },
// ];

export const modalRoutes: Route[] = [
  {
    path: "/",
    Component: SignIn,
  },
  {
    path: "/verify-otp/:email/:optedIn",
    Component: VerifyOTP,
  },
  {
    path: "/terms",
    Component: TermsOfUse,
  },
  {
    path: "/learn-more",
    Component: LearnMore,
  },
  {
    path: "/claim",
    Component: Claim,
  },
  {
    path: "/claimed",
    Component: Claimed,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/additional-tasks",
    Component: AdditionalTasks,
  },
  {
    path: "/data-fields",
    Component: OptionalDataFields,
  },
  {
    path: "/coupon-success",
    Component: Coupon,
  },
  {
    path: "/link-success",
    Component: RewardLink,
  },
  {
    path: "/competition-success",
    Component: Competition,
  },
  {
    path: "/freeform-success",
    Component: FreeForm,
  },
  {
    path: "/roblox-success",
    Component: Roblox,
  },
  {
    path: "/airdrop",
    Component: Airdrop,
  },
  {
    path: "/airdrop/success-already-claim",
    Component: AirdropSuccessAlreadyClaim
  },
  {
    path: "/nft",
    Component: NFT,
  },
  {
    path: "/nft-mint-success",
    Component: NFTMintSuccess,
  },
  {
    path: '/connect-aptos-wallet',
    Component: ConnectAptosWallet
  },
  {
    path:"/aptos-nft-success",
    Component: AptosNFTSuccess
  }
];
