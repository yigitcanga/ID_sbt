import { ABI } from "@/constants/abi";
import { contractAddress } from "@/constants/contract-address";

export const mintNFT = async (address: string, nftName: string, mintId = 0) => {
  if (typeof window === "undefined") return;

  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(ABI, contractAddress);
  window.contract = contract;

  try {
    const data = await window.contract.methods
      .mint(address, nftName, mintId)
      .send({ from: address });
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
