import React, { useState } from "react";
import { useProductStore } from "../store/product";
import Swal from "sweetalert2";
import Container from "react-bootstrap/esm/Container";
import Select from "react-select";
import { useAuthStore } from "../store/auth";

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
  });
  const [tab, settab] = useState(1);
  const [category, setcategory] = useState("");

  const options = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home_kitchen", label: "Home & Kitchen" },
    { value: "beauty_personal_care", label: "Beauty & Personal Care" },
    { value: "health_fitness", label: "Health & Fitness" },
    { value: "books_stationery", label: "Books & Stationery" },
    { value: "baby_kids", label: "Baby & Kids" },
    { value: "food_beverages", label: "Food & Beverages" },
    { value: "automotive", label: "Automotive" },
    { value: "sports_outdoors", label: "Sports & Outdoors" },
    { value: "pets", label: "Pets" },
    { value: "gadgets_innovations", label: "Gadgets & Innovations" },
    { value: "art_crafts", label: "Art & Crafts" },
    { value: "music_entertainment", label: "Music & Entertainment" },
    { value: "tools_industrial", label: "Tools & Industrial" },
    { value: "travel_luggage", label: "Travel & Luggage" },
  ];

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#404040" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "white", backgroundColor: "#404040" };
    },
    placeholder: (styles) => ({ ...styles, color: "white" }),
    singleValue: (styles) => ({ ...styles, color: "white" }),
    menuList: (styles) => ({ ...styles, backgroundColor: "#404040" }),
    input: (styles) => ({ ...styles, color: "white" }),
  };

  const handleArrayInsert = (value) => {
    const tagsArray = value.split(",");
    setnewproduct({ ...newproduct, tags: tagsArray });
  };

  const handleTextInsert = (e) => {
    setnewproduct({ ...newproduct, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    setcategory(e.value);
    setnewproduct({ ...newproduct, category: e.value });
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
                required
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.name}
                onChange={handleTextInsert}
              />
              <label className="font-semibold pl-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
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
                hasValue={category}
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
                required
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
                required
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
                  options={options}
                  styles={colorStyles}
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
                required
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.name}
                onChange={(e) => setnewproduct(e.target.value)}
              />
              <label className="font-semibold pl-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
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
                required
                className="rounded p-2 dark:bg-thirdd dark:placeholder:text-white dark:placeholder:opacity-50"
                value={newproduct.category}
                onChange={(e) => setnewproduct(e.target.value)}
              />
            </form>
          </div>
        );
    }
  }

  const { createProduct, error, message } = useProductStore();

  const handleProductCreation = async (e) => {
    e.preventDefault();
    try {
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
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred while creating the product.",
      });
    }
  };

  return (
    <Container className="flex flex-col rounded-2xl px-12 py-4 mt-8 mb-80 gap-4 w-[50vw] border border-white bg-secondl dark:bg-secondd dark:text-white">
      <div>
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-sm">Add a new product to your store.</p>
      </div>
      <div className="flex justify-around">
        <div
          className={`border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 1 ? "bg-fourthd text-black " : null
          }`}
        >
          General
        </div>
        <div
          className={`border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 2 ? "bg-fourthd text-black " : null
          }`}
        >
          Pricing
        </div>
        <div
          className={`border border-white px-2 py-1 rounded-3xl font-medium ${
            tab === 3 ? "bg-green-400 text-black " : null
          }`}
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
            className="bg-green-400 text-black font-semibold py-1 w-full rounded-e-xl"
            type="submit"
            onClick={handleProductCreation}
          >
            Publish
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
