import { chain, createClient, configureChains } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const alchemyId = "7JOHPLbiPe75KZ3OBykXYwjZiHwcmX2x";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [chain.localhost, chain.goerli],
  [
    jsonRpcProvider({
      rpc: (chainToConnect) => {
        if (chainToConnect.id !== chain.localhost.id) return null
        return {
          http: `http://localhost:8545`,
          webSocket: `wss://localhost:8545`,
        }
      }
    }),
    alchemyProvider({ apiKey: alchemyId }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "landaxr",
  chains,
});

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { client, chains, chain, provider };
