import React from "react";
import { Toast } from "../store/toast";
import { useAuthStore } from "../store/auth";

const HomePage = () => {
  const { checkAuth } = useAuthStore();

  return (
    <div className="dark:text-white flex-1">
      <button onClick={() => console.log("hello")}>Click me</button>
    </div>
  );
};

export default HomePage;


// todo:
// saving images -- DONE
// handle errors in create-product 
// edit product functionality
// user hearted products
// user profile
// email verification
// convert from fetch() to axios
// homepage
// responsive web design
// complete css rework