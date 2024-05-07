"use client";

import Link from "next/link";
import Image from "next/image";
import { useMetamask } from "@/contexts/metamask-context";

const Header = () => {
  const { address, loading, connectToMetamask, disconnectMetamask} = useMetamask();
  
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Company Logo"
              width={32}
              height={32}
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CyberID
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <button
              onClick={!address ? connectToMetamask : disconnectMetamask}
              disabled={loading}
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center min-w-40 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading
                ? "Connecting..."
                : address
                ? address.slice(0, 6) + "..." + address.slice(-4)
                : "Connect to Wallet"}
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/team"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
