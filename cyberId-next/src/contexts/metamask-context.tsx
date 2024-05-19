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
import { getNetworkId } from "@/helpers/get-network-id";
import { getMintPermission } from "@/helpers/get-mint-permission";
import { getNFTInfo } from "@/helpers/get-nft-info";
import { getTokenIDFromAddress } from "@/helpers/get-tokenid-from-address";

const MetamaskContext = createContext<MetamaskContextType>({
  address: null,
  balance: null,
  loading: false,
  nftInfo: null,
  isMinter: false,
  tokenID: null,
  networkId: null,
  showNotification: false,
  setShowNotification: () => {},
  connectToMetamask: () => {},
  disconnectMetamask: () => {},
});

export const useMetamask = () => useContext(MetamaskContext);

export const MetamaskProvider: React.FC<IMetamaskProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMinter, setIsMinter] = useState<boolean>(false);
  const [nftInfo, setNftInfo] = useState<any>(null);
  const [tokenID, setTokenID] = useState<number | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const connectToMetamask = useCallback(async () => {
    setLoading(true);

    if (typeof window.ethereum === "undefined") {
      setLoading(false);
      alert("MetaMask extension cannot be found. Please install MetaMask.");
      return;
    }

    try {
      const accountAddress = await getUserAccount();
      const accountBalance = await getUserBalance(accountAddress);
      const networkId = await getNetworkId();
      const isMinter = await getMintPermission(accountAddress);
      const nftInfo = await getNFTInfo(accountAddress);
      const tokenID = await getTokenIDFromAddress(accountAddress);
      
      setAddress(accountAddress);
      setBalance(accountBalance);
      setNetworkId(networkId);
      setIsMinter(isMinter);
      setNftInfo(nftInfo);
      setTokenID(tokenID);
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
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
        nftInfo,
        tokenID,
        isMinter,
        networkId,
        showNotification,
        setShowNotification,
        connectToMetamask,
        disconnectMetamask,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

type MetamaskContextType = {
  address: string | null;
  balance: string | null;
  loading: boolean;
  nftInfo: any;
  isMinter: boolean;
  tokenID: number | null;
  networkId: string | null;
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
  connectToMetamask: () => void;
  disconnectMetamask: () => void;
};

interface IMetamaskProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    ethereum: any;
  }
}
