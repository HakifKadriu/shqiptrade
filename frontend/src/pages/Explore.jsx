import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useProductStore } from "../store/product";
import Productcard from "../components/productcard";
import { Toast } from "../store/toast";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";

const Explore = () => {
  const navigate = useNavigate();

  const { getRandomProducts, isLoading, error, message, products } =
    useProductStore();

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <Container className="flex-1 mt-4 mb-8">
      <div className="dark:text-white pb-1 border-b border-fifthl dark:border-white text-3xl font-semibold pl-1">
        Explore Products
      </div>
      <div
        className="grid gap-4 mt-4 justify-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          alignItems: "start",
        }}
      >
        {isLoading ? (
          <div className="dark:text-white font-light">Loading products...</div>
        ) : products.length > 0 ? (
          products?.map((product) => (
            <Productcard key={product._id} product={product} />
          ))
        ) : (
          <div className="dark:text-white">
            No products available.{" "}
            {isAuthenticated && (
              <span
                className="font-semibold text-green cursor-pointer"
                onClick={() => navigate("/create-product")}
              >
                Add one here.
              </span>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Explore;
