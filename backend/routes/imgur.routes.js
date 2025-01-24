import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/getratelimits", async (req, res) => {
  try {
    const response = await axios.get(`https://api.imgur.com/3/image/WAMyAzu`, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });

    const rateLimits = {};

    rateLimits.clientlimit = response.headers["x-ratelimit-clientlimit"];
    rateLimits.clientremaining = response.headers["x-ratelimit-clientremaining"];
    rateLimits.clientreset = response.headers["x-ratelimit-clientreset"];
    rateLimits.userlimit = response.headers["x-ratelimit-userlimit"];
    rateLimits.userremaining = response.headers["x-ratelimit-userremaining"];
    rateLimits.userreset = response.headers["x-ratelimit-userreset"];

    res.status(200).json({ rateData: rateLimits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
