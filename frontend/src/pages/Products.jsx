import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Productcard from "../components/productcard";
import { useProductStore } from "../store/product";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";

const Products = () => {
  const { fetchProducts, products, error, message, isLoading } =
    useProductStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProducts(user._id);
  }, [fetchProducts]);

  return (
    <Container className="flex-1 mt-4">
      <div className="flex justify-between items-center mb-4 dark:text-white ">
        <div className="text-3xl font-light">My Products</div>
        <Link to={'/create-product'} className="dark:bg-fourthd dark:text-black font-semibold p-2 rounded-xl">Add Product</Link>
      </div>
      <div>
        <div className="flex gap-4 flex-wrap">
          {isLoading ? (
            <div className="dark:text-white font-light">
              Loading products...
            </div>
          ) : (
            products?.map((product) => (
              <Productcard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
