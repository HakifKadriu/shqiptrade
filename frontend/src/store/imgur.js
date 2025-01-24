import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useImgurStore = create((set) => ({
  rateLimits: null,
  isLoading: false,
  error: null,
  message: null,
  success: false,
  getRateLimits: async () => {
    set({ isLoading: true, message: "Retrieving rate limits..." });
    try {
      const response = await axios.get(`/api/imgur/getratelimits`);

      set({
        isLoading: false,
        rateLimits: response.data.rateData,
        message: "Rate limit retrieved successfully",
        success: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: true,
        message: "Error retrieving rate limits",
        success: false,
      });
      console.log(error)

      throw error;
    }
  },
}));
