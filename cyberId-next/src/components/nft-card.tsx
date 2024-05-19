"use client";

import { useMetamask } from "@/contexts/metamask-context";
import { burnNFT } from "@/helpers/burn-nft";

const NFTCard = () => {
  const { nftInfo, tokenID, address } = useMetamask();
  const nftName = nftInfo[0];
  const nftId = nftInfo[1];

  const handleBurnNFT = async () => {
    if (!tokenID || !address) return;
    await burnNFT(address, tokenID);
  };

  return (
    <div className="flex items-center justify-center flex-col md:flex-row max: gap-6 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <div className="mt-0 md:mt-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Your very own NFT...
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          This is the nft that you minted. It is unique and has a name. You are
          the owner of this nft. You can burn it if you want. Just yours. Only
          yours. So yours. Very yours. Much yours. Wow. Such yours. Wow. So much
          yours. Take care of it. It is yours. Only yours. Just yours. Simply
          yours. It is very special nft. You lucky one!
        </p>
      </div>

      <div className="max-w-80 min-w-60  sm:min-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            height={318}
            width={318}
            className="rounded-t-lg"
            src="https://picsum.photos/400/400"
            alt="nft card image"
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {nftName}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            It is a unique NFT. Minted with id: {nftId} on the blockchain.
          </p>
          <button
            onClick={handleBurnNFT}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Let us burn NFT!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
      </div>
    </div>
  );
};

export default NFTCard;
