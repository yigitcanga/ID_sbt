"use client";

import { useEffect } from "react";
import WrongNetwork from "@/components/wrong-network";
import WalletInformations from "@/components/wallet-informations";
import { sepoliaNetworkId } from "@/constants/sepolia-network-id";
import { useMetamask } from "@/contexts/metamask-context";

const Home = () => {
  const { address, networkId, disconnectMetamask } = useMetamask();

  useEffect(() => {
    if (!address) return;
    window.ethereum.on("chainChanged", () => {
      if (window.ethereum.chainId !== sepoliaNetworkId) {
        window.location.reload();
      }
    });

    return () => {
      window.ethereum.removeListener("chainChanged", () => {});
    };
  }, [address, networkId]);

  useEffect(() => {
    if (!address) return;
    window.ethereum.on("accountsChanged", () => {
      disconnectMetamask();
    });
    return () => {
      window.ethereum.removeListener("accountsChanged", () => {});
    };
  }, [address, disconnectMetamask, networkId]);

  return (
    <section className="max-w-screen-xl">
      {address && networkId !== sepoliaNetworkId && <WrongNetwork />}

      {address && <WalletInformations />}

      {!address && (
        <div className="gap-16 items-center py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Embrace the Future of Crypto with Us
            </h1>
            <p className="mb-4">
              We are more than just strategists, designers, and developers. We
              are pioneers in the world of cryptocurrency, pushing the
              boundaries of what is possible. From decentralized finance to
              blockchain technology, we are at the forefront of innovation.
            </p>
            <p>
              Our team is dedicated to building the infrastructure of tomorrows
              digital economy. Whether you are launching a new token, exploring
              NFTs, or diving into smart contracts, we are here to help you
              navigate the exciting world of crypto.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
