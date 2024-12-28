import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";
import { Toast } from "../store/toast";
import { AiOutlineLoading } from "react-icons/ai";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/verify-email");
      Toast.fire({
        icon: "success",
        title: "Account created successfully.",
      });
    } catch (error) {
      console.error("Error Signing Up", error);
    }
  };

  return (
    <Container className="flex flex-col items-center dark:text-white w-[20rem]">
      <div className="mt-8 p-4 rounded ">
        <h1 className="text-3xl mb-12 dark:text-white ">Create an account</h1>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control dark:bg-[#393E46] dark:text-white dark:focus:bg-[#393E46]  dark:placeholder:text-white"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="usernameHelp"
          />

          <input
            type="text"
            className="form-control dark:bg-[#393E46] dark:text-white dark:focus:bg-[#393E46]  dark:placeholder:text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="usernameHelp"
          />

          <input
            type="password"
            className="form-control dark:bg-[#393E46] dark:text-white dark:focus:bg-[#393E46]  dark:placeholder:text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordHelp"
          />

          {error && <div className="text-red-500 font-semibold">{error}</div>}

          <button
            type="submit"
            className="mt-5 font-medium bg-buttond !text-white  p-1 rounded-md w-full"
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterComponent;
