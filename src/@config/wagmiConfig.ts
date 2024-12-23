/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import {
    mainnet,
    polygon,
    polygonAmoy,
    linea,
    lineaSepolia,
    base,
    baseSepolia,
    optimism,
    optimismSepolia,
    arbitrum,
    arbitrumSepolia,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet
} from "wagmi/chains";

const metadata = {
    name: "ViewFi wallet connect",
    description: "Connect your wallet to redeem the campaign rewards",
    url: "https://www.viewfi.io/",
    icons: [
        "https://assets-global.website-files.com/62303bc2fcf4b20e1405c174/64f0e9cabc0f9a45865def2b_Screenshot%202023-08-31%20at%2012.27.29%20PM.png",
    ],
};
const chains: any = [
    mainnet,
    polygon,
    polygonAmoy,
    linea,
    lineaSepolia,
    base,
    baseSepolia,
    optimism,
    optimismSepolia,
    arbitrum,
    arbitrumSepolia,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet
];

export const projectId = "6fabdbbef40ca499527e1dfe8e1a5146";

export const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
});
