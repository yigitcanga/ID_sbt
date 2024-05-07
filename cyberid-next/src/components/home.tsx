"use client";
import { sepoliaNetworkId } from "@/constants/sepolia-network-id";
import { useMetamask } from "@/contexts/metamask-context";
import { getUserAccount } from "@/helpers/get-user-account";
import { useEffect } from "react";

const Home = () => {
  const { address, balance, networkId, disconnectMetamask } = useMetamask();

  useEffect(() => {
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
    window.ethereum.on("accountsChanged", () => {
      disconnectMetamask();
    });
    return () => {
      window.ethereum.removeListener("accountsChanged", () => {
        if (!address) getUserAccount();
      });
    };
  }, [address, disconnectMetamask, networkId]);

  return (
    <section className="max-w-screen-xl">
      {address && balance ? (
        networkId !== sepoliaNetworkId ? (
          <section className="bg-white dark:bg-gray-900 fixed top-0 left-0 h-full w-full overflow-hidden flex items-center ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  Please switch to Sepolia Network
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  We have detected that you are not connected to the Sepolia
                  Network. Please switch to the Sepolia Network in your MetaMask
                  extension to continue.
                </p>
                <a
                  href="#"
                  className="inline-flex bg-blue-600 text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                >
                  Switch to Sepolia Network
                </a>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex flex-col gap-2 mt-6 font-light text-gray-500 sm:text-lg dark:text-gray-400 border p-4 rounded border-gray-500 bg-gray-800">
            <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Wallet Informations
            </h2>
            <p className="text-lg font-bold break-all">Address: {address}</p>
            <p className="text-lg font-bold">Balance: {balance} ETH</p>
          </div>
        )
      ) : null}
      <div className="gap-16 items-center py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Embrace the Future of Crypto with Us
          </h1>
          <p className="mb-4">
            We are more than just strategists, designers, and developers. We are
            pioneers in the world of cryptocurrency, pushing the boundaries of
            what is possible. From decentralized finance to blockchain
            technology, we are at the forefront of innovation.
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
    </section>
  );
};

export default Home;
