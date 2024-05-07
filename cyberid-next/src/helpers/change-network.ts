import { networks } from "@/constants/networks";

export const changeNetwork = async (networkName: string) => {
  if (typeof window.ethereum === "undefined")
    throw new Error("MetaMask extension not found");

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ ...networks[networkName] }],
    });
  } catch (error) {
    console.error("Error switching network:", error);
  }
};
