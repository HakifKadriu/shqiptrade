import { create } from "zustand";

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
      if (
        (!newProduct.name,
        !newProduct.description,
        !newProduct.price,
        !newProduct.stock,
        !newProduct.category,
        !newProduct.createdBy)
      ) {
        return {
          success: false,
          message: "Please fill all the required fields.",
        };
      }

      const res = await fetch("/api/product/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      set({
        isLoading: false,
        product: response.data.data,
      });

      return {
        success: data.success,
        message: "Product created successfully.",
      };
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  fetchProducts: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/product/get-user-products/${userId}`);
      const data = await res.json();
      set({ isLoading: false, products: data.data });
    } catch (error) {
      set({ message: error.message, isLoading: false, error: true });
    }
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`/api/product/delete-product/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return {
      success: data.success,
      message: "Product deleted successfully.",
    };
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
      const res = await fetch(`/api/product/get-random-products?count=${size}`);
      const data = await res.json();
      set({ isLoading: false, products: data.data });
    } catch (error) {
      set({ message: error.message, isLoading: false, error: true });
    }
  },
}));
