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
        <div className="text-3xl font-light dark:text-green">My Products</div>
        <Link
          to={"/create-product"}
          className="dark:bg-green dark:text-black font-semibold p-2 rounded-xl"
        >
          Add Product
        </Link>
      </div>
      <div>
        <div
          className="grid gap-4 mt-4 justify-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            alignItems: "start", 
          }}
        >
          {isLoading ? (
            <div className="dark:text-white font-light bg-white">
              Loading products...
            </div>
          ) : products.length > 0 ? (
            products?.map((product) => (
              <Productcard key={product._id} product={product} />
            ))
          ) : (
            <div className="dark:text-white ml-auto mr-auto">
              You have no products.
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
