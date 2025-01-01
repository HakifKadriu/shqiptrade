import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardImg from "/Cranky+cat.png";
import bg from "/124621181.jpg";
import { useProductStore } from "../store/product";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useAuthStore } from "../store/auth";
import { CgShoppingCart } from "react-icons/cg";
import { Toast } from "../store/toast";

const Productcard = ({ product }) => {
  const [updatedproduct, setupdatedproduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setupdatedproduct(product);
  };
  const handleShow = () => setShow(true);

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Toast.fire({
          icon: "success",
          title: "Product deleted successfully",
        });
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
      <div className="flex flex-col p-2 w-72 h-72 dark:bg-secondd rounded-3xl gap-2">
        {/* <div>
          <FaRegHeart size={24}/>
          <FaHeart size={24}/>
        </div> */}

        <div className="flex-1 h-[80%]">
          <img
            src={`http://localhost:5000/productimages/${product.image}`}
            alt="Product"
            className="object-cover w-full h-full rounded-t-2xl cursor-pointer"
            onClick={() => setShowDetailModal(true)}
          />
        </div>
        <div className="flex justify-between px-2">
          <div className="dark:text-white">
            <div className="font-semibold">{product.name}</div>
            <div className="dark:text-[#8f8f8f]">€ {product.price}</div>
          </div>
          <div className="self-center space-x-2">
            {product.createdBy._id === user?._id && (
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
            {/* {product.createdBy._id !== user._id && (
              <Button
                variant="secondary"
                className="flex justify-center items-center gap-2 w-full"
              >
                <FaHeart />
              </Button>
            )} */}
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
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

      <Modal
        keyboard={true}
        show={showDetailModal}
        size="xl"
        className="dark:text-white"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowDetailModal(false)}
      >
        <Modal.Header className="bg-thirdd">
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-thirdd flex gap-4">
          <div className="w-1/2 h-full space-y-4">
            <div className="">
              <img
                src={`http://localhost:5000/productimages/${product.image}`}
                alt="Product"
                className="w-full h-64 object-cover object-center rounded-2xl"
              />
            </div>
            <div className="border px-4 py-3 rounded-xl h-full bg-secondd">
              <h1 className="text-3xl">{product.name}</h1>
              <h1>€ {product.price}</h1>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <div className="h-80 overflow-auto border px-4 py-3 rounded-xl bg-secondd">
              <h2 className="text-2xl text-fourthd">Description</h2>
              <p>{product.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="border px-4 py-3 rounded-xl bg-secondd text-center">
                <h2 className="text-2xl text-fourthd font-light">Category</h2>
                <p className="text-base font-thin">{product.category}</p>
              </div>
              <div className="border px-4 py-3 rounded-xl bg-secondd text-center">
                <h2 className="text-2xl text-fourthd font-light">
                  Left in stock
                </h2>
                <p className="text-base font-thin">{product.stock}</p>
              </div>
              <div className="border px-4 py-3 rounded-xl bg-secondd text-center">
                <h2 className="text-2xl text-fourthd font-light">Visibility</h2>
                <p className="text-base font-thin">
                  {product.isPublic === true ? "Public" : "Private"}
                </p>
              </div>
              <div className="border px-4 py-3 rounded-xl bg-secondd text-center">
                <h2 className="text-2xl text-fourthd font-light">Created At</h2>
                <p className="text-base font-thin">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="w-full border px-4 py-3 rounded-xl bg-secondd text-center">
              <h2 className="text-2xl text-fourthd font-light">Created By</h2>
              <p className="text-base font-thin">
                {product.createdBy.name === user?.name
                  ? "You"
                  : product.createdBy.name}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-thirdd flex">
          <div className="flex gap-2">
            <button
              onClick={() => setShowDetailModal(false)}
              className="p-2 rounded-xl bg-fifthd border-0"
            >
              Close
            </button>
            {product.createdBy._id === user?._id ? (
              <>
                <button
                  title="Delete Product"
                  className="p-2 rounded-xl bg-red-500 flex items-center gap-1 justify-evenly text-black border-0 w-fit"
                  onClick={() => confirmDeletion(product._id)}
                >
                  <p className="font-semibold">Delete Product</p>
                  <MdDelete />
                </button>
                <button
                  title="Edit Product"
                  className="p-2 rounded-xl bg-fourthd flex items-center gap-1 justify-evenly text-black border-0 w-fit"
                  onClick={handleShow}
                >
                  <p className="font-semibold">Edit Product</p>
                  <FaEdit />
                </button>
              </>
            ) : (
              <button className="p-2 rounded-xl bg-green-400 flex items-center gap-1 justify-evenly text-black border-0 w-fit">
                <p className="font-semibold">Add to cart </p>
                <CgShoppingCart size={24} />
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Productcard;
