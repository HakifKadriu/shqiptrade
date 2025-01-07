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
// update image errors - done
// multiple images for product - done
// green theme to borders and other stuff
// image carousel - done
// clean code (remove unused functions)
// clean console logs
// choose default product image to show in explore
// fullscreen images on click - done
// white mode fix
// saving images -- DONE
// fix create-product category select not working
// handle errors in create-product
// edit product functionality - done
// user hearted products
// user profile
// email verification
// convert from fetch() to axios
// homepage
// responsive web design
// complete css rework