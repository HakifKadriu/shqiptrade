import React from "react";
import { Toast } from "../store/toast";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  return (
    <div className="dark:text-white flex flex-col flex-1">
      <div className="flex flex-col justify-center min-h-[100vh] items-center font-semibold">
        <h1 className="text-9xl mb-8 transition-transform">Shqip Trade</h1>
        <h3 className="font-thin">Insert Company Moto</h3>
      </div>

      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
      <button onClick={() => navigate('/explore')}>Explore Products</button>
    </div>
  );
};

export default HomePage;


// todo:
// clean up product auth (messages and errors)
// update image errors - done
// product deletion deletes all images in public/productImages
// multiple images for product - done
// green theme to borders and other stuff
// image carousel - done
// clean code (remove unused functions)
// private products
// clean console logs
// choose default product image to show in explore - done
// fullscreen images on click - done
// white mode fix
// saving images -- DONE
// fix create-product category select not working
// handle errors in create-product
// edit product functionality - done
// user hearted products
// user profile
// email verification
// convert from fetch() to axios - done
// homepage
// responsive web design
// complete css rework