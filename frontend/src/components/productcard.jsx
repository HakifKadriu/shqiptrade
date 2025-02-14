import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardImg from "/Cranky+cat.png";
import bg from "/124621181.jpg";
import { useProductStore } from "../store/product";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { FaEdit, FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useAuthStore } from "../store/auth";
import { CgShoppingCart } from "react-icons/cg";
import { Toast } from "../store/toast";
import { categories, colorStyles, options } from "./dropdownselect";
import Select from "react-select";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/esm/CarouselItem";
import ProductCarousel from "./ProductCarousel";
import { useNavigate } from "react-router";
import CenteredModal from "./centeredModal";

const Productcard = ({ product }) => {
  const navigate = useNavigate();

  const [updatedproduct, setupdatedproduct] = useState({
    ...product,
    newImages: [],
  });
  const { deleteProduct, updateProduct, getRandomProducts, message } =
    useProductStore();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showImageSelectionModal, setshowImageSelectionModal] = useState(false);
  const [category, setcategory] = useState("");
  const [newImage, setnewImage] = useState("");
  const [fullCategory, setfullCategory] = useState("");
  const [fullVisibility, setfullVisibility] = useState(null);
  const [stringedVisibility, setstringedVisibility] = useState(
    product.isPublic ? "public" : "private"
  );
  const [previewImages, setpreviewImages] = useState([]);
  const [defaultImageIndex, setdefaultImageIndex] = useState(
    product.defaultImageIndex
  );
  const [imageFullScreen, setimageFullScreen] = useState(false);

  useEffect(() => {
    setUpProduct();
  }, []);

  const closeImageSelectionModal = () => {
    setshowImageSelectionModal(false);
    setdefaultImageIndex(product.defaultImageIndex);
  };

  const handleDefaultImageIndexChange = () => {
    setupdatedproduct({
      ...updatedproduct,
      defaultImageIndex: defaultImageIndex,
    });

    Toast.fire({
      icon: "success",
      title: "Default image updated successfully",
    });
    setshowImageSelectionModal(false);
  };

  const handleDefaultImageIndex = (index, mode, action) => {
    if (mode === "existing") {
      if (action === "set") {
        setdefaultImageIndex(index);
      } else {
        setdefaultImageIndex(0);
      }
    }

    if (mode === "updated") {
      if (action === "set") {
        setdefaultImageIndex(index);
      } else {
        setdefaultImageIndex(0);
      }
    }
  };

  const setUpProduct = () => {
    setfullCategory(categories.find((c) => c.value === product.category));
    setfullVisibility(options.find((c) => c.value === stringedVisibility));
    setupdatedproduct({ ...product, newImages: [] });
  };

  const handleClose = () => {
    setShow(false);
    setupdatedproduct(product);
    setimageFullScreen(false);
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
    const pathname = window.location.pathname;

    let localUpdatedProduct = { ...updatedproduct };
    localUpdatedProduct.tags = localUpdatedProduct.tags.filter(
      (tag) => tag.trim() !== ""
    );

    const fullArrayLength =
      localUpdatedProduct.image.length + previewImages.length;

    if (localUpdatedProduct.defaultImageIndex >= fullArrayLength) {
      localUpdatedProduct.defaultImageIndex = 0;
    }

    try {
      await updateProduct(product._id, localUpdatedProduct);

      if (pathname === "/explore") {
        getRandomProducts();
      }

      setShow(false);

      Toast.fire({
        icon: "success",
        title: "Product Updated",
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  };

  const handleCategory = (e) => {
    setcategory(e.value);
    setupdatedproduct({ ...updatedproduct, category: e.value });
  };

  const changeVisibility = (e) => {
    const value = e.value === "public" ? true : false;
    setupdatedproduct({ ...updatedproduct, isPublic: value });
  };

  const deleteTag = (tag) => {
    const updatedTags = updatedproduct.tags.filter((t) => t !== tag);
    setupdatedproduct({ ...updatedproduct, tags: updatedTags });
  };

  const updateTag = (e, tag) => {
    const updatedTag = e.target.value;
    const updatedTags = updatedproduct.tags.map((t) =>
      t === tag ? updatedTag : t
    );
    setupdatedproduct({ ...updatedproduct, tags: updatedTags });
  };

  const addNewTag = () => {
    setupdatedproduct((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, ""],
    }));
  };

  const deleteImage = (img) => {
    const updatedImage = updatedproduct.image.filter((i) => i !== img);
    setupdatedproduct({ ...updatedproduct, image: updatedImage });
  };

  const addImage = (e) => {
    const files = e.target.files;
    const fileNames = Array.from(files).map((file) => file);

    setupdatedproduct({ ...updatedproduct, newImages: fileNames });
    const newImageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setpreviewImages(newImageUrls);
  };

  const removeImage = (index, isNew) => {
    if (isNew) {
      const updatedImage = updatedproduct.newImages.filter(
        (_, i) => i !== index
      );
      setupdatedproduct({ ...updatedproduct, newImages: updatedImage });

      const updatedImagePreview = previewImages.filter((_, i) => i !== index);
      setpreviewImages(updatedImagePreview);
    } else {
      const updatedImage = updatedproduct.image.filter((_, i) => i !== index);
      setupdatedproduct({ ...updatedproduct, image: updatedImage });
    }
  };

  return (
    <>
      <div className="flex flex-col p-2 w-72 bg-fifthl dark:bg-secondd rounded-3xl gap-2 hover:scale-105 transition-transform">
        <div className="flex-1 h-[80%]">
          <img
            src={`https://i.imgur.com/${
              product.image[product.defaultImageIndex]
            }`}
            alt="Product"
            className="object-cover object-center w-full rounded-t-2xl cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="flex flex-col px-2">
          <div className="dark:text-white line-clamp-6">
            <div className="font-semibold" title={product.name}>
              {product.name}
            </div>
          </div>
          <div className="dark:text-[#8f8f8f]">€ {product.price}</div>
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
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <Modal show={show} fullscreen onHide={handleClose} centered={true}>
        <Modal.Header className="dark:bg-secondd">
          <Modal.Title className="dark:text-green">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center p-4 gap-2 dark:bg-secondd">
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col items-center border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Image</h2>
              <div className="w-[80%] flex">
                <div className="flex overflow-x-auto pb-2 w-full flex-nowrap space-x-4">
                  {updatedproduct.image.map((img, index) => {
                    return (
                      <div className="relative flex-shrink-0" key={index}>
                        <img
                          src={`https://i.imgur.com/${img}`}
                          alt="Product"
                          className="object-cover w-40 h-40 rounded-3xl"
                        />
                        <button
                          className="absolute top-1 right-1 p-2"
                          type="button"
                        >
                          <MdDelete
                            size={24}
                            className="dark:text-red-500"
                            onClick={() => removeImage(index, false)}
                          />
                        </button>
                      </div>
                    );
                  })}
                  {previewImages.map((img, index) => {
                    return (
                      <div className="relative flex-shrink-0" key={index}>
                        <img
                          src={img}
                          alt="Product"
                          className="object-cover w-40 h-40 rounded-3xl"
                        />
                        <button
                          className="absolute top-1 right-1 p-2"
                          type="button"
                        >
                          <MdDelete
                            size={24}
                            className="dark:text-red-500"
                            onClick={() => removeImage(index, true)}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <label className="self-center cursor-pointer">
                  <FaPlus size={64} className="text-gray-500"></FaPlus>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => addImage(e)}
                    className="hidden rounded p-2 border mt-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50 file:bg-secondd file:border-0 file:text-white file:rounded-lg"
                  />
                </label>
              </div>
              <div
                title="The Image that shows as the first one on the product page"
                className="dark:text-white border p-1 text-sm rounded-lg mt-2 cursor-pointer"
                onClick={() => setshowImageSelectionModal(true)}
              >
                Set Default Picture
              </div>
            </div>
            <div className="border !border-green-500 px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Product Name</h2>
              <input
                value={updatedproduct.name}
                onChange={(e) =>
                  setupdatedproduct({
                    ...updatedproduct,
                    name: e.target.value,
                  })
                }
                className="text-base font-semibold dark:text-white dark:bg-thirdd text-center"
              ></input>
            </div>
            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Description</h2>
              <textarea
                name="description"
                required
                placeholder="Description"
                className="min-h-20 mt-1 rounded p-2 w-full border dark:bg-thirdd text-white dark:placeholder:text-white dark:placeholder:opacity-50 "
                value={updatedproduct.description}
                onChange={(e) =>
                  setupdatedproduct({
                    ...updatedproduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Category</h2>
              <div className="border mt-1 text-start">
                {/* <CategorySelect
                  category={updatedproduct.category}
                  handleCategory={handleCategory}
                /> */}
                <Select
                  styles={colorStyles}
                  options={categories}
                  isSearchable
                  defaultValue={fullCategory}
                  // value={fullCategory}
                  onChange={handleCategory}
                />
              </div>
            </div>
            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Price</h2>
              <input
                value={updatedproduct.price}
                className="bg-transparent text-center text-base font-semibold dark:text-white"
                onChange={(e) =>
                  setupdatedproduct({
                    ...updatedproduct,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Stock</h2>
              <input
                value={updatedproduct.stock}
                className="bg-transparent text-center text-base font-semibold dark:text-white"
                onChange={(e) =>
                  setupdatedproduct({
                    ...updatedproduct,
                    stock: e.target.value,
                  })
                }
              />
            </div>
            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center ">
              <h2 className="text-2xl text-fourthd font-light">Tags</h2>
              <div className="flex flex-col justify-center mt-1 items-center">
                {updatedproduct.tags.map((tag, index) => {
                  return (
                    <div className="relative w-fit" key={index}>
                      <input
                        value={tag}
                        onChange={(e) => updateTag(e, tag)}
                        className="bg-transparent text-center  text-base font-semibold dark:text-white"
                      />
                      <MdDelete
                        className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                        fill="red"
                        onClick={() => deleteTag(tag)}
                      />
                    </div>
                  );
                })}
                <div className="mt-1">
                  <FaPlus
                    fill="white"
                    className="cursor-pointer"
                    onClick={addNewTag}
                  />
                </div>
              </div>
            </div>
            <div className="border px-4 py-3 rounded-xl bg-thirdd text-center">
              <h2 className="text-2xl text-fourthd font-light">Visibility</h2>
              {/* <p className="text-base font-semibold dark:text-white">
                {product.isPublic ? "Public" : "Private"}
              </p> */}
              <div className="border text-start">
                <Select
                  styles={colorStyles}
                  options={options}
                  isSearchable={false}
                  defaultValue={fullVisibility}
                  onChange={changeVisibility}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dark:bg-secondd">
          <button
            variant="secondary"
            onClick={handleClose}
            className="p-2 rounded-xl bg-fifthd dark:! text-white flex items-center gap-1 justify-evenly font-semibold border-0 w-fit"
          >
            Cancel
          </button>
          <button
            variant="primary"
            onClick={handleUpdate}
            className="p-2 rounded-xl bg-green-500 flex items-center gap-1 justify-evenly text-black border-0 w-fit font-semibold bg-green"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* details Modal */}
      <Modal
        keyboard={true}
        show={showDetailModal}
        size="xl"
        className="dark:text-white"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setShowDetailModal(false);
          setimageFullScreen(false);
        }}
      >
        <Modal.Header className="bg-thirdd">
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-thirdd flex gap-4">
          <div className="w-1/2 h-full flex flex-col justify-between gap-2">
            <div>
              <ProductCarousel images={product.image} />
            </div>
            <div className=" px-4 py-3 rounded-xl bg-secondd min-h-32 border">
              <h1 className="text-sm line-clamp-6 text-ellipsis">
                {product.name}
              </h1>
              <h1>€ {product.price}</h1>
            </div>
            <div className="w-full border rounded-xl bg-secondd text-center">
              <h2 className="text-2xl text-fourthd font-light">Created By</h2>
              <p className="text-base font-thin">
                {product.createdBy.name === user?.name
                  ? "You"
                  : product.createdBy.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-2">
            <div className="h-80 overflow-auto w-full border px-4 py-3 rounded-xl bg-secondd">
              <h2 className="text-2xl text-fourthd">Description</h2>
              <p className="whitespace-break-spaces">{product.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="border px-4 py-3 rounded-xl bg-secondd text-center">
                <h2 className="text-2xl text-fourthd font-light">Category</h2>
                <p className="text-base font-thin">{fullCategory.label}</p>
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
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-thirdd flex">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowDetailModal(false);
                setimageFullScreen(false);
              }}
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
              <button className="p-2 rounded-xl bg-green flex items-center gap-1 justify-evenly text-black border-0 w-fit">
                <p className="font-semibold">Add to cart </p>
                <CgShoppingCart size={24} />
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      {/* Select Default Image */}
      <Modal show={showImageSelectionModal} onHide={closeImageSelectionModal}>
        <Modal.Header closeButton className="dark:bg-secondd dark:text-white">
          <Modal.Title>Choose Default Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark:bg-secondd w-full">
          <div className="flex flex-wrap items-center justify-center gap-4 dark:bg-secondd">
            {updatedproduct.image.map((img, index) => {
              return (
                <div
                  className="relative flex-shrink-0 hover:scale-110 transition-transform"
                  key={index}
                >
                  <img
                    src={`http://localhost:5000/productimages/${img}`}
                    alt="Product"
                    className="object-cover w-40 h-40 rounded-3xl"
                  />
                  {defaultImageIndex === index ? (
                    <IoIosRadioButtonOn
                      className="absolute top-1 right-1 text-white cursor-pointer"
                      size={32}
                      onClick={() =>
                        handleDefaultImageIndex(index, "existing", "remove")
                      }
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      className="absolute top-1 right-1 text-white cursor-pointer"
                      size={32}
                      onClick={() =>
                        handleDefaultImageIndex(index, "existing", "set")
                      }
                    />
                  )}
                </div>
              );
            })}
            {previewImages.map((img, index) => {
              return (
                <div
                  className="relative flex-shrink-0 hover:scale-110 transition-transform"
                  key={index}
                >
                  <img
                    src={img}
                    alt="Product"
                    className="object-cover w-40 h-40 rounded-3xl"
                  />
                  {defaultImageIndex === updatedproduct.image.length + index ? (
                    <IoIosRadioButtonOn
                      className="absolute top-1 right-1 text-white cursor-pointer"
                      size={32}
                      onClick={() =>
                        handleDefaultImageIndex(
                          updatedproduct.image.length + index,
                          "updated",
                          "remove"
                        )
                      }
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      className="absolute top-1 right-1 text-white cursor-pointer"
                      size={32}
                      onClick={() =>
                        handleDefaultImageIndex(
                          updatedproduct.image.length + index,
                          "updated",
                          "set"
                        )
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer className="dark:bg-secondd">
          <Button
            className="bg-fifthd border-0 hover:bg-fifthd"
            onClick={closeImageSelectionModal}
          >
            Close
          </Button>
          <Button
            className="bg-thirdd border-0 hover:bg-thirdd"
            onClick={handleDefaultImageIndexChange}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Full Name Modal */}
      <CenteredModal />
    </>
  );
};
export default Productcard;
