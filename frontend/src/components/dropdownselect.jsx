import React, { useState } from "react";
import Select from "react-select";

export const options = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

export const categories = [
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
export const colorStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#404040",
    border: "0px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return { ...styles, color: "white", backgroundColor: "#404040" };
  },
  placeholder: (styles) => ({ ...styles, color: "white" }),
  singleValue: (styles) => ({ ...styles, color: "white" }),
  menuList: (styles) => ({ ...styles, backgroundColor: "#404040" }),
  input: (styles) => ({ ...styles, color: "white" }),
};

