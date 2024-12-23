import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiGalleryView2 } from "react-icons/ri";
import { FaRegMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";

import { Link } from "react-router";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
        <div className="flex">
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <IoSunnyOutline fontSize={34} className="dark:text-white" />
            ) : (
              <FaRegMoon fontSize={34} className="dark:text-white" />
            )}
          </button>
          <Link to={"/products"} className="duration-0">
            <RiGalleryView2
              fontSize={34}
              className="dark:text-white duration-0"
            ></RiGalleryView2>
          </Link>
          <Link to={"/create"} className="duration-0">
            <IoMdAddCircleOutline
              fontSize={34}
              className="dark:text-white duration-0"
            ></IoMdAddCircleOutline>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
