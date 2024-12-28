import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";
import { Toast } from "../store/toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const { verifyemail, error, isLoading, resendVerifyEmail, user } =
    useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyemail(verificationCode);
      navigate("/");
      Toast.fire({
        icon: "success",
        title: "Email Verification Successful",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleResetCode = () => {
    resendVerifyEmail(user.email);
    Toast.fire({
      icon: "info",
      title: "Verification code resent successfully",
    });
  };

  return (
    <Container className="flex flex-col items-center justify-center h-[80vh]">
      <div className="dark:text-white text-4xl mb-4">Verify Your Email</div>
      <p className="dark:text-white mb-4">
        Enter the 6-digit code sent to your email address.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-tertiaryd focus:outline-none"
            />
          ))}
        </div>
        {error && (
          <div className="text-center mt-4 mb-4">
            <div className="text-red-500 font-semibold mt-3 self-center">
              {error}
            </div>
            <button
              type="button"
              onClick={handleResetCode}
              className="dark:text-white bg-secondaryd p-1 rounded-xl"
            >
              Resend Verification Code
            </button>
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-secondaryd mt-4 rounded-lg py-2 px-4 !border-tertiaryd border"
          disabled={isLoading || code.some((digit) => !digit)}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </Container>
  );
};

export default VerifyEmail;
