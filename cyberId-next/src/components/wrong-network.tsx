import { networkNames } from "@/constants/networks";
import { changeNetwork } from "@/helpers/change-network";

const WrongNetwork = () => {
  const handleNetworkChange = async () => {
    await changeNetwork(networkNames.Sepolia);
  };
  
  return (
    <section className="bg-white dark:bg-gray-900 fixed top-0 left-0 h-full w-full overflow-hidden flex items-center ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Please switch to Sepolia Network
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We have detected that you are not connected to the Sepolia Network.
            Please switch to the Sepolia Network in your MetaMask extension to
            continue.
          </p>
          <button
            onClick={handleNetworkChange}
            className="inline-flex bg-blue-600 text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Switch to Sepolia Network
          </button>
        </div>
      </div>
    </section>
  );
};

export default WrongNetwork;
