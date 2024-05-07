"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserAccount } from "@/helpers/get-user-account";
import { getUserBalance } from "@/helpers/get-user-balance";
import { readContract } from "@/helpers/read-contract";
import { getNetworkId } from "@/helpers/get-network-id";
import { changeNetwork } from "@/helpers/change-network";
import { mintNFT } from "@/helpers/mint-nft";
import { myContractAddress } from "@/constants/contract-address";

type MetamaskContextType = {
  address: string | null;
  balance: string | null;
  loading: boolean;
  networkId: string | null;
  error: string | null;
  connectToMetamask: () => void;
  disconnectMetamask: () => void;
};

const MetamaskContext = createContext<MetamaskContextType>({
  address: null,
  balance: null,
  loading: false,
  error: null,
  networkId: null,
  connectToMetamask: () => {},
  disconnectMetamask: () => {},
});

export const useMetamask = () => useContext(MetamaskContext);

export const MetamaskProvider: React.FC<IMetamaskProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<any>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectToMetamask = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (typeof window.ethereum === "undefined") {
      console.error("MetaMask extension not found");
      setError(
        "MetaMask extension not found. Please install or enable MetaMask."
      );
      setLoading(false);
      return;
    }

    try {
      const accountAddress = await getUserAccount();
      const accountBalance = await getUserBalance(accountAddress);
      const networkId = await getNetworkId();
      await changeNetwork("SepoliaETH");
      // TODO: Create an input field to read the mintId from the user
      // const mintId = 3333;
      // const read = await readContract(mintId);
      // const nft = await mintNFT(address, "AbuzerTheSecond", 8888);
      // console.log("nft", nft);
      // console.log("read", read);
      setAddress(accountAddress);
      setBalance(accountBalance);
      setNetworkId(networkId);
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
      setError("Error connecting to Metamask. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectMetamask = async () => {
    setAddress(null);
    setBalance(null);
  };

  useEffect(() => {
    connectToMetamask();
  }, [connectToMetamask]);

  return (
    <MetamaskContext.Provider
      value={{
        address,
        balance,
        loading,
        networkId,
        error,
        connectToMetamask,
        disconnectMetamask,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

interface IMetamaskProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    ethereum: any;
  }
}
