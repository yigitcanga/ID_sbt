"use client";

import Link from "next/link";
import Image from "next/image";
import { useMetamask } from "@/contexts/metamask-context";
import Toast from "./toast";

const Header = () => {
  const { address, loading, connectToMetamask, showNotification } =
    useMetamask();

  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl relative">
          <Link href="/" className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Company Logo"
              width={32}
              height={32}
              className="mr-3 h-6 sm:h-9"
            />
            <span className="text-lg sm:text-xl self-center  font-semibold whitespace-nowrap dark:text-white">
              CyberID
            </span>
          </Link>
          <div
            className="hidden sm:flex justify-between items-center  w-auto"
            id="mobile-menu-2"
          >
            <ul className="flex font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/team"
                  className="block pr-4 pl-3 text-gray-700 hover:bg-gray-50 hover:bg-transparent  lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent  lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <button
              onClick={!address ? connectToMetamask : () => {}}
              disabled={loading}
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center min-w-32  sm:min-w-40 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 sm:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
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
          {showNotification && <Toast message="Your messages has been sent successfully" />}
        </div>
        <div
          className="sm:hidden justify-between items-center mt-4"
          id="mobile-menu-2"
        >
          <ul className="flex justify-around font-medium border-b-2 pb-2 border-gray-600">
            <li>
              <Link
                href="/team"
                className="block pr-4 pl-3 text-gray-700 dark:text-gray-400 ml-11"
              >
                Team
              </Link>
            </li>
            <li className="border-r-2 border-gray-600" />
            <li>
              <Link
                href="/contact"
                className="block pr-4 pl-3 text-gray-700 dark:text-gray-400 mr-6"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
