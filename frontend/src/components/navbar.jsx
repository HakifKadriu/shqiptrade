import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import moon from "/moon.svg";
import sun from "/sun-svgrepo-com (2).svg";
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
      className="sticky top-0 z-10  bg-transparent backdrop-blur-md "
    >
      <div className="p-3 flex border-b justify-between">
        <div className="text-2xl font-bold">
          <Link to={"/"} className="duration-0 dark:text-green">
            Shqip Trade
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Link
            to={"/explore"}
            className="text-sm hover:border-b border-black p-1 dark:text-green"
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
        <div className="flex gap-2  dark:text-green">
          <button onClick={toggleDarkMode} className="w-8 ">
            {darkMode ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                    stroke="#DAF7A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            )}
          </button>
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="after:hidden bg-transparent  border-0 text-black dark:!text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                      stroke="#DAF7A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                      stroke="#DAF7A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#DAF7A6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dark:bg-thirdd ">
                <Dropdown.Item
                  onClick={() => navigate("/profile")}
                  className="dark:!text-green bg-transparent hover:bg-transparent"
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/products")}
                  className="dark:!text-green bg-transparent hover:bg-transparent"
                >
                  My Products
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleLogout}
                  className="dark:!text-green bg-transparent hover:bg-transparent"
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="dark:bg-green text-black self-center py-1 px-2 rounded-lg font-medium cursor-pointer" onClick={() => navigate("/auth")}>
              Log In
            </div>
          )}

          {/* {darkMode ? <Image src={loginwhite} /> : <Image src={logindark} />} */}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
