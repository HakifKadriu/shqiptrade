import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import moon from "/moon.svg";
import sun from "/sun-svgrepo-com.svg";
import logindark from "/login-dark.svg";
import loginwhite from "/login-white.svg";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { Link } from "react-router";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true"; // Convert string back to boolean
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark");
  };

  return (
    <Container fluid={true}>
      <div className="p-3 flex border-b justify-between">
        <div className="text-2xl font-bold dark:text-white">
          <Link to={"/"} className="duration-0">
            Shqip Trade
          </Link>
        </div>
        <div className="flex gap-1">
          <Link
            to={"/products"}
            className="text-sm hover:border-b border-black p-1 dark:text-white"
          >
            My Products
          </Link>
          <Link
            to={"/create"}
            className="text-sm hover:border-b border-black p-1 dark:text-white"
          >
            Add Product
          </Link>
        </div>
        <div className="flex gap-2 dark:text-white">
          <button onClick={toggleDarkMode} className="w-8">
            {darkMode ? <Image src={sun} /> : <Image src={moon} />}
          </button>
          <Link className="dark:text-white w-8" to={"/userauth"}>
            {darkMode ? <Image src={loginwhite} /> : <Image src={logindark} />}
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
