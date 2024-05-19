import { ABI } from "@/constants/abi";
import { contractAddress } from "@/constants/contract-address";

export const getNFTInfo = async (address: string) => {
  if (typeof window === "undefined") return;

  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(ABI, contractAddress);
  window.contract = contract;

  try {
    const data = await window.contract.methods.getTokenInfo(address).call();
    return data;
  } catch (error) {
    console.error("Error reading contract:", error);
  }
};

declare global {
  interface Window {
    contract: any;
  }
}
