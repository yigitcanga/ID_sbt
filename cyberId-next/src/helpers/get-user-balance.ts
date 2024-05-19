import { ethers } from "ethers";

export const getUserBalance = async (accountAddress: string) => {
  const accountBalanceResults = await window.ethereum.request({
    method: "eth_getBalance",
    params: [String(accountAddress), "latest"],
  });

  return ethers.formatEther(accountBalanceResults);
};
