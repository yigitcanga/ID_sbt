export const getNetworkId = async () => {
  if (typeof window === "undefined") return;

  const provider = window.ethereum;

  try {
    const networkId = await provider.request({ method: "net_version" });
    return networkId;
  } catch (error) {
    console.error("Error getting network ID:", error);
  }
};
