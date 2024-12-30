import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Container className="flex flex-col dark:text-white w-full flex-1">
      <div className="text-3xl mb-2 font-semibold">User Profile</div>
      <div>
        <div className="font-bold">Name:</div>
        <div className=" ">{user.name}</div>
        <div className="font-bold">Email:</div>
        <div>{user.email}</div>
        {/* <div className="font-bold">Verified: </div> */}
        {/* <div>{user.isVerified === true ? "True" : "False"}</div> */}
      </div>
      {/* {!user.isVerified && (
          <button
            className="bg-tertiaryd text-black w-fit p-1 rounded-xl self-center"
            onClick={() => navigate("/verify-email")}
          >
            Verify Email
          </button>
        )} */}
    </Container>
  );
};
export default Profile;
