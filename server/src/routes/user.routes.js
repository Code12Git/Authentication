import { Router } from "express";
import {
  RegisterController,
  forgotPassword,
  loginController,
  resetPassword,
} from "../controllers/user.controller.js";
const router = Router();

// Register user
router.post("/register", RegisterController);

// Login user
router.post("/login", loginController);

// Forgot password
router.post("/forgotpassword", forgotPassword);

// Reset Password
router.post("/reset-password/:token/:id", resetPassword);

export default router;
