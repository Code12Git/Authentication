import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errors } from "@vinejs/vine";
import { loginSchema } from "../validations/authSchema.js";
import vine from "@vinejs/vine";
import { registerSchema } from "../validations/authSchema.js";
import { CustomErrorReporter } from "../validations/CustomErrorReporter.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../services/email.service.js";
import generateRandomToken from "../helper/generateRandomToken.js";
dotenv.config({ path: "./.env" });

// Register Controller
export const RegisterController = async (req, res) => {
  try {
    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(req.body);
    const existingUser = await User.findOne({
      $or: [{ email: payload.email }, { username: payload.username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const newUser = await User.create({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(req.body);
    const isEmailExist = await User.findOne({ email: payload.email });

    if (!isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    const isPasswordValid = bcrypt.compareSync(
      payload.password,
      isEmailExist.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: isEmailExist.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      user: isEmailExist,
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = generateRandomToken(32);

    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const link = `http://localhost:5173/reset-password?token=${resetToken}&user=${user.id}`;

    sendPasswordResetEmail(user.email, link);
    console.log(link);

    return res.status(200).json({
      success: true,
      message:
        "Password reset instructions have been sent to your email. Please check your inbox and follow the provided instructions to reset your password.",
      updateUser: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    const user = await User.findById(id);

    if (
      !user ||
      user.resetToken !== token ||
      user.resetTokenExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired reset token. Please request a new password reset link.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match. Please make sure they match.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now log in with your new password.",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
