import React, { useEffect } from "react";
import { useImgurStore } from "../store/imgur";
import { useProductStore } from "../store/product";

const AdminDashboard = () => {
  // const { getRateLimits, rateLimits } = useImgurStore();
  const {rateLimits} = useProductStore();

  // useEffect(() => {
  //   getRateLimits();
  // }, []);


  return (
    <div className="flex-1">
      <div className="flex flex-col dark:bg-thirdd dark:text-white">
        <h1>Admin Dashboard</h1>
        {/* <button onClick={getRateLimits}>Get Rate Limits (removes 1 credit)</button> */}
        {rateLimits && (
          <div className="flex flex-col items-center gap-1">
            <p>Rate Limits: </p>
            <div className="flex gap-2">
              <div className="border p-2 rounded bg-green text-black font-bold">
                <p>Max Client Requests: {rateLimits["clientlimit"]}</p>
                <p>Remaining: {rateLimits["clientremaining"]}</p>
                <p>Resets in: {rateLimits["clientreset"]}</p>
              </div>

              <div className="border p-2 rounded bg-green text-black font-bold">
                <p>Max User Requests: {rateLimits["userlimit"]}</p>
                <p>Remaining: {rateLimits["userremaining"]}</p>
                <p>Resets in: {rateLimits["userreset"]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// "UserLimit": 500,
//   "UserRemaining": 500,
//   "UserReset": 1737390553,
//   "ClientLimit": 12500,
//   "ClientRemaining": 12500

export default AdminDashboard;
