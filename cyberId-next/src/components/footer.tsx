import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 sm:my-8" />
        <div className="flex justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              CyberID™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
