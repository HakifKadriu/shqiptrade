import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  product: null,
  products: [],
  error: null,
  isLoading: false,
  message: null,

  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("category", newProduct.category);
      formData.append("createdBy", newProduct.createdBy);
      formData.append("tags", newProduct.tags);
      formData.append("isPublic", newProduct.isPublic);

      if (Array.isArray(newProduct.image)) {
        newProduct.image.forEach((img) => {
          formData.append("images", img);
        });
      } else {
        throw new Error("Images must be an array");
      }

      const response = await axios.post(
        `/api/product/create-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set({
        isLoading: false,
        message: response.data.message,
        product: response.data.product,
      });

      // response
      // - data
      // -- message
      // -- product
      // -- success
    } catch (error) {
      // error
      // - message: "Request failed..."
      // - response
      // -- data
      // --- message and success

      set({
        message: error.response.data.message,
        error: true,
        isLoading: false,
      });
      throw error;
    }
  },
  fetchProducts: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/api/product/get-user-products/${userId}`
      );
      set({ isLoading: false, products: response.data.products });
    } catch (error) {
      set({ message: error.message, isLoading: false, error: true });
    }
  },
  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete(
        `/api/product/delete-product/${productId}`
      );
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
        message: "Product deleted successfully.",
        isLoading: false,
      }));
    } catch (error) {
      set({ message: error.message, isLoading: false });
      throw error;
    }
  },
  updateProduct: async (productId, updatedProduct) => {
    try {
      const formData = new FormData();

      // Append existing product fields
      formData.append("name", updatedProduct.name);
      formData.append("description", updatedProduct.description);
      formData.append("price", updatedProduct.price);
      formData.append("stock", updatedProduct.stock);
      formData.append("category", updatedProduct.category);
      formData.append("isPublic", updatedProduct.isPublic);
      formData.append("createdBy", updatedProduct.createdBy);

      // Append tags as a comma-separated string if it's an array
      if (Array.isArray(updatedProduct.tags)) {
        formData.append("tags", updatedProduct.tags.join(","));
      } else {
        formData.append("tags", updatedProduct.tags);
      }

      if (Array.isArray(updatedProduct.image)) {
        updatedProduct.image.forEach((imageUrl) =>
          formData.append("existingImages", imageUrl)
        );
      } else {
        formData.append("existingImages", updatedProduct.image);
      }

      if (Array.isArray(updatedProduct.newImages)) {
        updatedProduct.newImages.forEach((imageUrl) =>
          formData.append("newImages", imageUrl)
        );
      } else {
        formData.append("newImages", updatedProduct.newImages);
      }

      const res = await axios.put(
        `/api/product/update-product/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data } = res;

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? data.product : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({
        message: error.message,
        error: true,
        isLoading: false,
      });
      throw error;
    }
  },
  getRandomProducts: async () => {
    set({ isLoading: true });
    const size = 30;

    try {
      const res = await axios.get(
        `/api/product/get-random-products?count=${size}`
      );
      set({ success: true, products: res.data.data, isLoading: false });
    } catch (error) {
      set({ error: true, message: error.message, isLoading: false });
      throw error;
    }
  },
}));
