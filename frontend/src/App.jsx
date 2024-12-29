import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Products from "./pages/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./pages/ForgotPassword";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import Profile from "./pages/Profile";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const IfAuthButNotVerified = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified == true) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="max-w-full  dark:bg-[#222831]"
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/auth"
            element={
              <RedirectAuthenticatedUser>
                <Auth />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
