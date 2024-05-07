export const getUserAccount = async () => {
  const accountResults = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: "eth_accounts" }],
  });

  return accountResults[0];
};
