import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { LuMoon } from "react-icons/lu";

import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";
import { Toast } from "../store/toast";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAdminPanelSettings, MdOutlineWbSunny } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
      <div className="p-3 flex border-b border-fifthl dark:border-white justify-between">
        <div className="text-2xl font-bold">
          <Link to={"/"} className="duration-0 dark:text-green">
            Shqip Trade
          </Link>
        </div>
        <div className="gap-1 items-center hidden sm:flex">
          <Link
            to={"/explore"}
            className="text-sm hover:border-b border-black p-1 dark:text-green"
          >
            Explore Products
          </Link>
          {/* <Link
            to={"/create-product"}
            className="text-sm hover:border-b border-black p-1 dark:text-white"
          >
            Add Product
          </Link> */}
        </div>

        <div className="hidden sm:flex gap-2  dark:text-green">
          <button onClick={toggleDarkMode} className="w-8">
            {darkMode ? <MdOutlineWbSunny size={30} /> : <LuMoon size={30} />}
          </button>
          {user && user.role === "admin" && (
            <button>
              <Link to={"/admindashboard"}>
                <MdOutlineAdminPanelSettings size={30} />
              </Link>
            </button>
          )}
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="after:hidden bg-transparent border-0 text-black dark:!text-white"
              >
                <CgProfile size={30} className="dark:text-green"/>
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
            <div
              className="dark:bg-green text-black self-center py-1 px-2 rounded-lg font-medium cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="after:hidden bg-transparent  border-0 text-black dark:!text-white"
              >
                <GiHamburgerMenu size={18} className="text-green" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dark:bg-thirdd">
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
                  onClick={() => navigate("/explore")}
                  className="dark:!text-green bg-transparent hover:bg-transparent"
                >
                  Explore Products
                </Dropdown.Item>
                <Dropdown.Divider color="white" />
                <Dropdown.Item
                  onClick={toggleDarkMode}
                  className="dark:!text-green bg-transparent hover:bg-transparent"
                >
                  Dark Mode
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
            <div
              className=" dark:bg-green text-black self-center py-1 px-2 rounded-lg font-medium cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
