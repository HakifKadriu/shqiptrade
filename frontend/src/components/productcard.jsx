import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardImg from "/Cranky+cat.png";
import bg from "/124621181.jpg";
import { useProductStore } from "../store/product";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useAuthStore } from "../store/auth";

const Productcard = ({ product }) => {
  const [updatedproduct, setupdatedproduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setupdatedproduct(product);
  };
  const handleShow = () => setShow(true);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 1000,
  });

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Successfully deleted!", "", "success");
      }
    });
  };

  const handleUpdate = async () => {
    await updateProduct(product._id, updatedproduct);

    setShow(false);
    Toast.fire({
      icon: "success",
      title: "Product Updated",
    });
  };

  return (
    <>
      {/* <Card
        style={{ width: "18rem", height: "30rem" }}
        className="flex dark:bg-[#393E46]"
      >
        <Card.Img className="object-cover h-full" variant="top" src={bg} />
        <Card.Body className="flex flex-col justify-between">
          <div>
            <Card.Title className="mb-0 dark:text-white">
              {product.name}
            </Card.Title>
            <Card.Text className="text-[#8f8f8f]">€ {product.price}</Card.Text>
            <Card.Text className="dark:text-[#8f8f8f]">
              From: {product.createdBy.name}
            </Card.Text>
          </div>
          <div className="flex gap-2 justify-start mt-2">
            {product.createdBy._id === user._id && (
              <>
                <Button
                  variant="danger"
                  title="Delete Product"
                  onClick={() => confirmDeletion(product._id)}
                >
                  <MdDeleteForever />
                </Button>
                <Button
                  variant="warning"
                  title="Edit Product"
                  className="pl-4"
                  onClick={handleShow}
                >
                  <FaEdit />
                </Button>
              </>
            )}
            {product.createdBy._id !== user._id && (
              <Button
                variant="secondary"
                className="flex justify-center items-center gap-2 w-full"
              >
                Add to Cart <FaShoppingCart />
              </Button>
            )}
          </div>
        </Card.Body>
      </Card> */}

      <div className="flex flex-col p-2 w-72 h-72 dark:bg-secondd rounded-3xl gap-2">
        {/* <div>
          <FaRegHeart size={24}/>
          <FaHeart size={24}/>
        </div> */}

        <div className="flex-1">
          <img
            src={bg}
            alt="Product"
            className="object-cover w-full h-full rounded-t-2xl"
          />
        </div>
        <div className="flex justify-between px-2">
          <div className="dark:text-white">
            <div className="font-semibold">{product.name}</div>
            <div className="dark:text-[#8f8f8f]">€ {product.price}</div>
          </div>
          <div className="self-center space-x-2">
            {product.createdBy._id === user._id && (
              <>
                <Button
                  variant="danger"
                  title="Delete Product"
                  onClick={() => confirmDeletion(product._id)}
                >
                  <MdDeleteForever />
                </Button>
                <Button
                  variant="warning"
                  title="Edit Product"
                  className="pl-4"
                  onClick={handleShow}
                >
                  <FaEdit />
                </Button>
              </>
            )}
            {product.createdBy._id !== user._id && (
              <Button
                variant="secondary"
                className="flex justify-center items-center gap-2 w-full"
              >
                Add to Cart <FaShoppingCart />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered={true} keyboard={false}>
        <Modal.Header className="dark:bg-[#393E46]">
          <Modal.Title className="dark:text-white">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col justify-center p-4 gap-2 dark:bg-[#393E46]">
          <div className="flex flex-col">
            <label className="font-bold dark:text-white">Name</label>
            <input
              className="border rounded p-1"
              type="text"
              placeholder="Name"
              value={updatedproduct.name}
              onChange={(e) =>
                setupdatedproduct({ ...updatedproduct, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold dark:text-white">Price</label>
            <input
              className="border rounded p-1"
              type="number"
              placeholder="Price"
              value={updatedproduct.price}
              onChange={(e) =>
                setupdatedproduct({ ...updatedproduct, price: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="dark:bg-[#393E46]">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Productcard;
