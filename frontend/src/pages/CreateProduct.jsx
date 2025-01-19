import React, { useState } from "react";
import { useProductStore } from "../store/product";
import Swal from "sweetalert2";
import Container from "react-bootstrap/esm/Container";
import Select from "react-select";
import { useAuthStore } from "../store/auth";
import defaultImage from "/defaultImage.jpg";
import { Carousel } from "@material-tailwind/react";
import bg from "/124621181.jpg";
import { categories, colorStyles, options } from "../components/dropdownselect";

const CreateProduct = () => {
  const { user } = useAuthStore();
  const [newproduct, setnewproduct] = useState({
    name: "",
    description: "",
    price: 1,
    stock: 1,
    category: "",
    createdBy: user._id,
    tags: [],
    isPublic: true,
    image: null,
  });

  const [newImage, setnewImage] = useState([]);

  const [tab, settab] = useState(1);
  const [category, setcategory] = useState("");

  const handleArrayInsert = (value) => {
    const tagsArray = value.split(",");
    setnewproduct({ ...newproduct, tags: tagsArray });
  };

  const handleTextInsert = (e) => {
    setnewproduct({ ...newproduct, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    // setcategory(e.value);
    setnewproduct({ ...newproduct, category: e.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setnewproduct({ ...newproduct, image: files });
    const previewImages = files.map((file) => {
      return { file, url: URL.createObjectURL(file) };
    });
    setnewImage(previewImages);
  };

  const { createProduct, error, message, isLoading } = useProductStore();

  const handleProductCreation = async (e) => {
    e.preventDefault();
    try {

      if (!newproduct.image){
        newproduct.image = defaultImage
      }

      await createProduct(newproduct);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product successfully created.",
      });

      setnewproduct({
        name: "",
        description: "",
        price: 1,
        stock: 1,
        category: "",
        createdBy: user._id,
        tags: [],
        isPublic: true,
      });

      settab(1);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
      });
    }
  };

  function FormatTab(tab) {
    switch (tab) {
      case 1:
        return (
          <div>
            <form className="flex flex-col gap-1">
              <label className="font-semibold pl-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.name}
                onChange={handleTextInsert}
              />
              <div className="h-80 flex gap-2 ">
                <div className="flex flex-col w-full">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50 file:bg-secondd file:border-0 file:text-white file:rounded-lg"
                  />
                </div>
                <div className="w-full h-full flex justify-center mt-1">
                  <Carousel
                    className="rounded-xl"
                    onClick={(e) => e.preventDefault()}
                  >
                    {newImage.length > 0 ? (
                      newImage.map((img, index) => (
                        <img
                          key={index}
                          src={img.url}
                          alt={`Preview ${index}`}
                          className="h-full w-full object-cover object-center"
                        />
                      ))
                    ) : (
                      <img
                        src={defaultImage}
                        alt={`Preview default`}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </Carousel>
                </div>
              </div>
              <label
                className="font-semibold pl-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.description}
                onChange={handleTextInsert}
              />
              <label className="font-semibold pl-1">
                Tags <span className="text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.tags.join(",")}
                onChange={(e) => handleArrayInsert(e.target.value)}
              />
              <label className="font-semibold pl-1">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                styles={colorStyles}
                options={categories}
                isSearchable
                // defaultValue={searchedValue}
                onChange={handleCategory}
              />
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <form className="flex flex-col gap-1">
              <label className="font-semibold pl-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="EUR"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.price}
                onChange={handleTextInsert}
              />
              <label className="font-semibold pl-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.stock}
                onChange={handleTextInsert}
              />
            </form>
          </div>
        );
      case 3:
        return (
          <div>
            <form className="flex flex-col gap-1">
              <label className="font-semibold pl-1">
                Visibility <span className="text-red-500">*</span>
              </label>
              <div>
                <Select
                  styles={colorStyles}
                  options={options}
                  isSearchable={false}
                  defaultValue={options[0]}
                />
              </div>
            </form>
          </div>
        );
      default:
        return (
          <div>
            <form className="flex flex-col gap-1">
              <label className="font-semibold pl-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.name}
                onChange={(e) => setnewproduct(e.target.value)}
              />
              <label className="font-semibold pl-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.description}
                onChange={(e) => setnewproduct(e.target.value)}
              />
              <label className="font-semibold pl-1">
                Tags <span className="text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.tags}
                onChange={(e) => setnewproduct(e.target.value)}
              />
              <label className="font-semibold pl-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.category}
                onChange={(e) => setnewproduct(e.target.value)}
              />
            </form>
          </div>
        );
    }
  }

  return (
    <Container className="flex flex-col rounded-2xl px-12 py-4 mt-8 mb-80 gap-4 w-[50vw] border border-white bg-secondl dark:bg-secondd dark:text-white">
      <div>
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-sm">Add a new product to your store.</p>
      </div>
      <div className="flex justify-around">
        <div
          className={`cursor-pointer border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 1 ? "bg-fourthd text-black " : null
          }`}
          onClick={() => settab(1)}
        >
          General
        </div>
        <div
          className={`cursor-pointer border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 2 ? "bg-fourthd text-black " : null
          }`}
          onClick={() => settab(2)}
        >
          Pricing
        </div>
        <div
          className={`cursor-pointer border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 3 ? "bg-green text-black " : null
          }`}
          onClick={() => settab(3)}
        >
          Publish
        </div>
      </div>
      {FormatTab(tab)}
      {tab === 3 ? (
        <div className="w-full flex gap-2">
          <button
            className="bg-fifthd py-1 w-1/4 font-semibold rounded-s-xl text-white"
            onClick={() => settab(tab - 1)}
          >
            Back
          </button>
          <button
            className="bg-green text-black font-semibold py-1 w-full rounded-e-xl"
            type="submit"
            onClick={handleProductCreation}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Publish"}
          </button>
        </div>
      ) : tab === 2 ? (
        <div className="w-full flex gap-2 justify-between">
          <div className="bg-fifthd p-2 rounded-xl font-semibold text-white">
            <button onClick={() => settab(tab - 1)}>Previous Step</button>
          </div>
          <div className="bg-fifthd p-2 rounded-xl font-semibold text-white">
            <button onClick={() => settab(tab + 1)}>Next Step</button>
          </div>
        </div>
      ) : (
        <div className="self-end bg-fifthd p-2 rounded-xl font-semibold text-white">
          <button onClick={() => settab(tab + 1)}>Next Step</button>
        </div>
      )}
    </Container>
  );
};

export default CreateProduct;
