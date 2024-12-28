import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Productcard from "../components/productcard";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router";

const Products = () => {
  let navigate = useNavigate();

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container className="min-h-svh flex flex-wrap justify-center gap-3 pt-4">
      {products.map((product) => (
        <Productcard key={product._id} product={product} />
      ))}

      {products.length === 0 && (
        <div className="flex flex-col items-center dark:text-white">
          <div>There are no products available.</div>
          <div
            className="font-bold cursor-pointer"
            onClick={() => navigate("/create")}
          >
            Add Product
          </div>
        </div>
      )}
    </Container>
  );
};

export default Products;
