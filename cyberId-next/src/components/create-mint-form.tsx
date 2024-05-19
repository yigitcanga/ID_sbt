"use client";

import { useState } from "react";
import { useMetamask } from "@/contexts/metamask-context";
import { mintNFT } from "@/helpers/mint-nft";
import Spinner from "./spinner";

const CreateMintForm = () => {
  const [mintId, setMintId] = useState<number>(0);
  const [nftName, setNftName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useMetamask();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address) return;

    setIsSubmitting(true);
    try {
      await mintNFT(address, nftName, mintId);
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
    >
      <div className="flex gap-8">
        <div className="w-full">
          <label
            htmlFor="Name of the NFT"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Enter the name of the NFT
          </label>
          <input
            type="text"
            id="Name of the NFT"
            value={nftName}
            onChange={(event) => setNftName(event.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter the name of the NFT..."
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="ID of the NFT"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Enter the id of the NFT
          </label>
          <input
            type="number"
            id="ID of the NFT"
            value={mintId}
            onChange={(event) => setMintId(Number(event.target.value))}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter the id of the NFT..."
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
        } flex items-center justify-center py-3 px-5 min-w-28 min-h-12 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {isSubmitting ? <Spinner /> : "Mint NFT!"}
      </button>
    </form>
  );
};

export default CreateMintForm;
