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
      if (newProduct.image) {
        formData.append("image", newProduct.image);
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
      if (!updatedProduct.name || !updatedProduct.price) {
        return {
          success: false,
          message: "Required fields are missing.",
        };
      }
      const res = await fetch(`/api/product/update-product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? data.data : product
        ),
      }));
      return {
        success: data.success,
        message: "Product updated successfully.",
      };
    } catch (error) {
      return { success: false, message: "Server Error" };
    }
  },
  getRandomProducts: async (size) => {
    set({ isLoading: true });

    try {
      const res = await axios.get(
        `/api/product/get-random-products?count=${size}`
      );
      set({ success: true, products: res.data.data, isLoading: false });
    } catch (error) {
      set({ error: true, message: error.message });
      throw error;
    }
  },
}));
