"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

type MetamaskContextType = {
  address: string | null;
  balance: string | null;
  loading: boolean;
  error: string | null;
  connectToMetamask: () => void;
  disconnectMetamask: () => void;
};

const MetamaskContext = createContext<MetamaskContextType>({
  address: null,
  balance: null,
  loading: false,
  error: null,
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
      setAddress(accountAddress);
      setBalance(accountBalance);
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

  const getUserAccount = async () => {
    const accountResults = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{ eth_accounts: "eth_accounts" }],
    });
    console.log(accountResults);
    return accountResults[0];
  };

  const getUserBalance = async (accountAddress: string) => {
    const accountBalanceResults = await window.ethereum.request({
      method: "eth_getBalance",
      params: [String(accountAddress), "latest"],
    });

    return ethers.formatEther(accountBalanceResults);
  };

  useEffect(() => {
    connectToMetamask();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        address,
        balance,
        loading,
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
