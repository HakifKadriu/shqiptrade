import React, { useState } from "react";
import { useProductStore } from "../store/product";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

const CreateProduct = () => {
  const [newproduct, setnewproduct] = useState({
    name: "",
    price: "",
  });

  const { createProduct } = useProductStore();
  const handleProductCreation = async () => {
    const { success, message } = await createProduct(newproduct);

    if (!success) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${message}`,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product has been successfully created",
      }).then((result) => {
        setnewproduct({ name: "", price: "" });
      });
    }
  };

  return (
    <div className="flex flex-col items-center" style={{ height: "80vh" }}>
      Create Product Page
      <div
        className="flex flex-col justify-center items-center gap-4 p-12 rounded-3xl"
        style={{ width: "40rem", backgroundColor: "#DBE2EF" }}
      >
        <div>Product Details</div>
        <div>
          <input
            className="p-1 rounded-lg"
            placeholder="Name"
            type="text"
            value={newproduct.name}
            onChange={(e) =>
              setnewproduct({ ...newproduct, name: e.target.value })
            }
          />
        </div>
        <div>
          <input
            className="p-1 rounded-lg"
            placeholder="Price in EUR"
            type="text"
            required={true}
            value={newproduct.price}
            onChange={(e) =>
              setnewproduct({ ...newproduct, price: e.target.value })
            }
          />
        </div>
        <div>
          <Button
            variant="secondary"
            className="opacity-100"
            type="submit"
            onClick={handleProductCreation}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
