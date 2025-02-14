import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="shadow border-t border-black dark:bg-secondd justify-self-end">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-center">
        <span className="text-sm text-black sm:text-center dark:text-green">
          © 2024{" "}
          <Link to={"/"} className="hover:underline">
            ShqipTrade™
          </Link>
          . All Rights Reserved.
        </span>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
