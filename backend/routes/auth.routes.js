import express from "express";
import {
  forgotPassword,
  login,
  logout,
  signUp,
  verifyEmail,
  resetPassword,
  checkAuth,
  resendVerificationToken,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

// router.post("/verify-email", verifyEmail);
router.post("/resendVerifyToken", resendVerificationToken);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
