import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";
import { Toast } from "../store/toast";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
    Toast.fire({
      icon: "success",
      title: "Logged in successfully",
    });
  };

  return (
    <Container className="flex flex-col items-center dark:text-white w-[20rem]">
      <div className="mt-8 p-4 rounded">
        <h1 className="text-3xl mb-12 font-semibold ">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4 w-[15rem]">
          <input
            type="text"
            className="form-control dark:bg-thirdd dark:text-white border-0 dark:placeholder:text-white dark:focus:ring-4 dark:focus:ring-fifthd hover:ring-2 dark:hover:ring-fifthd"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="usernameHelp"
          />

          <input
            type="password"
            className="form-control dark:bg-thirdd dark:text-white border-0 dark:placeholder:text-white dark:focus:ring-4 dark:focus:ring-fifthd hover:ring-2 dark:hover:ring-fifthd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordHelp"
          />
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="!mt-12 text-xs"
          >
            Forgot your password?
          </button>

          <button
            type="submit"
            onClick={handleLogin}
            className="mt-1 border dark:bg-fifthd bg-fifthl  dark:text-white font-semibold  p-1 rounded-md w-full"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default LoginComponent;
