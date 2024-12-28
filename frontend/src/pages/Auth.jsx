import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import RegisterComponent from "../components/registerComponent";
import LoginComponent from "../components/loginComponent";
import Image from "react-bootstrap/esm/Image";
import chairimg from "/login-whitebg.jpg";

const Auth = () => {
  const [registerMode, setregisterMode] = useState(2); // 1 for register, 2 for login

  return (
    <Container className="flex justify-center h-[100%] mt-20 ">
      <div className="flex w-fit h-[60vh] border rounded-xl p-4 dark:bg-transparent gap-1 ">
        <div className="w-full">
          <Image className="h-full rounded-xl" src={chairimg}></Image>
        </div>
        <div className="justify-self-center w-full flex flex-col items-center justify-between">
          {registerMode == 1 ? <RegisterComponent /> : <LoginComponent />}

          <div className="self-center text-sm flex justify-center w-1/2">
            <div className="flex border border-black w-full rounded-xl p-1 gap-2 justify-center text-center ">
              <button
                onClick={() => setregisterMode(1)}
                className={` ${
                  registerMode == 1 ? "bg-buttond !border-white text-white" : "bg-transparent"
                } rounded-s-lg w-full p-1 duration-500 dark:text-white`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setregisterMode(2)}
                className={` ${
                  registerMode == 2 ? "bg-buttond !border-white text-white" : "bg-transparent"
                } rounded-e-lg w-full p-1 duration-500 dark:text-white`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Auth;
