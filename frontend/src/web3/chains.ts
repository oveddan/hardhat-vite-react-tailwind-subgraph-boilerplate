import { chain, Chain } from "wagmi";
import localHostAddress from '../contracts/localhost/contract-address.json'
import goerliAddress from '../contracts/goerli/contract-address.json'

export type ChainConfig = {
  // subgraphUrl: string;
  contractAddress: string;
  name: string;
  allowedChains: Chain[];
};

export const subgrapUrls = {
  // localHost: "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract",
  // rinkeby: "https://api.thegraph.com/subgraphs/name/lpscrypt/waypointrinkeby",
  mumbai: "https://api.thegraph.com/subgraphs/name/lpscrypt/waypointmumbai",
};

export const chains: { [chainId: string]: ChainConfig } = {
  mumbai: {
    contractAddress: localHostAddress.Token,
    name: "localhost",
    allowedChains: [chain.localhost],
  },
  goerli: {
    contractAddress: goerliAddress.Token,
    name: 'goerli',
    allowedChains: [chain.goerli]
  }
};

export const defaultChain: string = "mumbai";

export const getChain = () => {
  const chainId = process.env.REACT_APP_CHAIN || defaultChain;

  const chain = chains[chainId];

  if (!chain) throw new Error(`Invalid chain of ${chainId}`);

  return chain;
};
