export const networks: Network = {
  SepoliaETH: {
    chainId: `0xaa36a7`, 
    chainName: "Sepolia Testnet",
    rpcUrls: ["https://rpc.sepolia.ethpandaops.io/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

export const networkNames = {
  Sepolia: "SepoliaETH",
}

export interface Network {
  [key: string]: {
    chainId: number | string;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}