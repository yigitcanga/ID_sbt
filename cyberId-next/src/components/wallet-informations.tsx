"use client";

import { useState } from "react";
import { useMetamask } from "@/contexts/metamask-context";
import CreateMintForm from "./create-mint-form";
import DollarIcon from "@/icons/dollar-icon";
import WalletIcon from "@/icons/wallet-icon";
import NFTCard from "@/components/nft-card";

const WalletInformations = () => {
  const { address, balance, isMinter, nftInfo } = useMetamask();
  const [toggleNFT, setToggleNFT] = useState(false);

  const handleToggleNFT = () => {
    setToggleNFT(!toggleNFT);
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Wallet Informations
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Here you can find informations about your wallet, search for the mints
          and mint your own NFT.
        </p>
        <div className="space-y-8">
          <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex gap-2">
                <WalletIcon />
                <p className="text-nowrap text-base font-normal text-gray-500 dark:text-gray-400">
                  Wallet Address:
                </p>
              </div>

              <span className="text-base font-medium text-gray-900 dark:text-white break-all">
                {address}
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <DollarIcon />
                <p className="text-nowrap text-base font-normal text-gray-500 dark:text-gray-400">
                  Balance:
                </p>
              </div>

              <span className="text-base font-medium text-gray-900 dark:text-white break-all">
                {balance}
              </span>
            </div>
          </div>

          {isMinter ? (
            <>
              {nftInfo[1] == 0 ? (
                <CreateMintForm />
              ) : (
                <>
                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={handleToggleNFT}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Show NFT!
                      <svg
                        className="w-3.5 h-3.5 ms-2 rotate-90"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>

                  {toggleNFT ? <NFTCard /> : null}
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WalletInformations;
