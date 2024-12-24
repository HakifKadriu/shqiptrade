import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAuth from "./pages/UserAuth";

function App() {
  return (
    <div style={{minHeight: '100vh'}} className="max-w-full dark:bg-[#222831]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/userauth" element={<UserAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// #F9F7F7 - white background
// #DBE2EF - second
// #3F72AF - third
// #112D4E - fourth

export default App;
