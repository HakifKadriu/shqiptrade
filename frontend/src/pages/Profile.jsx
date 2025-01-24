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
      <div className="w-full border flex flex-col items-center">
        Color Palletes
        <div className="flex gap-2 justify-evenly w-full">
          <div className="border text-white">Dark
            <div className="bg-firstd p-1 w-full">First</div>
            <div className="bg-secondd p-1 w-full">Second</div>
            <div className="bg-thirdd p-1 w-full">Third</div>
            <div className="bg-fourthd p-1 w-full">Fourth</div>
            <div className="bg-fifthd p-1 w-full">Fifth</div>
          </div>
          <div className="border">Light
            <div className="bg-firstl p-1 w-full">First</div>
            <div className="bg-secondl p-1 w-full">Second</div>
            <div className="bg-thirdl p-1 w-full">Third</div>
            <div className="bg-fourthl p-1 w-full">Fourth</div>
            <div className="bg-fifthl p-1 w-full">Fifth</div>
          </div>
        </div>
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
