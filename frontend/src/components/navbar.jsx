import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import moon from "/moon.svg";
import sun from "/sun-svgrepo-com.svg";
import logindark from "/login-dark.svg";
import loginwhite from "/login-white.svg";
import Image from "react-bootstrap/Image";
import { CgProfile } from "react-icons/cg";
import Dropdown from "react-bootstrap/Dropdown";
import profile from "/profile.svg";
import profilelight from "/profilelight.svg";

import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";
import { Toast } from "../store/toast";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true"; // Convert string back to boolean
  });

  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
      Toast.fire({
        icon: "success",
        title: "Logged Out Successfully",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to log out",
      });
    }
  };

  return (
    <Container
      fluid={true}
      className="sticky top-0 z-10  bg-transparent backdrop-blur-md"
    >
      <div className="p-3 flex border-b justify-between">
        <div className="text-2xl font-bold">
          <Link to={"/"} className="duration-0 dark:text-white">
            Shqip Trade
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Link
            to={"/explore"}
            className="text-sm hover:border-b border-black p-1 dark:text-white"
          >
            Explore
          </Link>
          {/* <Link
            to={"/create-product"}
            className="text-sm hover:border-b border-black p-1 dark:text-white"
          >
            Add Product
          </Link> */}
        </div>
        <div className="flex gap-2 dark:text-white">
          <button onClick={toggleDarkMode} className="w-8">
            {darkMode ? <Image src={sun} /> : <Image src={moon} />}
          </button>
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="after:hidden bg-transparent  border-0 text-black dark:!text-white"
              >
                <Image
                  src={darkMode ? profilelight : profile}
                  className="w-8"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dark:bg-thirdd ">
                <Dropdown.Item
                  onClick={() => navigate("/profile")}
                  className="dark:!text-white bg-transparent hover:bg-transparent"
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/products")}
                  className="dark:!text-white bg-transparent hover:bg-transparent"
                >
                  My Products
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleLogout}
                  className="dark:!text-white bg-transparent hover:bg-transparent"
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div onClick={() => navigate("/auth")}>
              <Image
                src={darkMode ? loginwhite : logindark}
                className="w-8 cursor-pointer"
              />
            </div>
          )}

          {/* {darkMode ? <Image src={loginwhite} /> : <Image src={logindark} />} */}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
