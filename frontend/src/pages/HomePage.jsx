import React from "react";
import { Toast } from "../store/toast";

const HomePage = () => {
  return (
    <div className="dark:text-white">
      <button
        onClick={() =>
          Toast.fire({
            icon: "success",
            title: "Product Updated",
          })
        }
      >
        Click me
      </button>
    </div>
  );
};

export default HomePage;
