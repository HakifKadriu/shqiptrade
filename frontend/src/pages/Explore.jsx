import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useProductStore } from "../store/product";
import Productcard from "../components/productcard";

const Explore = () => {
  const { getRandomProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    getRandomProducts(30);
  }, []);

  return (
    <Container className="flex-1 mt-4 mb-8">
      <div className="dark:text-white text-3xl font-semibold">
        Explore Products
      </div>
      <div className="border border-white"></div>
      <div className="flex gap-4 mt-4 flex-wrap">
        {isLoading ? (
          <div className="dark:text-white font-light">Loading products...</div>
        ) : (
          products?.map((product) => (
            <Productcard key={product._id} product={product} />
          ))
        )}
      </div>
    </Container>
  );
};

export default Explore;
