import React from "react";
import { Toast } from "../store/toast";
import { useAuthStore } from "../store/auth";

const HomePage = () => {

  const {checkAuth} = useAuthStore();


  
  return (
    <div className="dark:text-white flex-1">
      <button onClick={() => console.log("hello")}>Click me</button>
    </div>
  );
};

export default HomePage;
