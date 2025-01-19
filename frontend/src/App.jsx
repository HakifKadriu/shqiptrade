import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Products from "./pages/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./pages/ForgotPassword";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { Toast } from "./store/toast";
import Footer from "./components/footer";
import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    Toast.fire({
      icon: "error",
      title: "You need to be logged in to access this page.",
    });
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const IfAuthButNotVerified = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified == false) {
    Toast.fire({
      icon: "error",
      title: "You need to be verified to access this page.",
    });
    return <Navigate to="/profile" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <div>Checking Auth</div>;

  return (
    <div
      style={{ minHeight: "100vh" }}
      className=" bg-firstl dark:bg-firstd flex flex-col min-h-100vh"
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<HomePage />} />

          <Route
            path="/auth"
            element={
              <RedirectAuthenticatedUser>
                <Auth />
              </RedirectAuthenticatedUser>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:productId" element={<ProductDetails />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/verify-email"
            element={
              <IfAuthButNotVerified>
                <VerifyEmail />
              </IfAuthButNotVerified>
            }
          /> */}
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
