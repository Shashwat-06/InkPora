import bcrypt, { hash } from "bcryptjs";
import { User } from "../models/user.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import {
  resetPasswordMail,
  resetPasswordSuccessMail,
  verificationMail,
  welcomeEmail,
} from "../resend/resend.config.js";
import crypto from "crypto";
import { measureMemory } from "vm";

// signup
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All Fields are required!");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs
    });

    await user.save();

    generateTokenAndSetCookies(res, user._id);
    await verificationMail(user.email, verificationToken);

    res
      .status(200)
      .json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// verify Mail
export const verifyMail = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code) {
      throw new Error("All Fields are required!");
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.save();

    await welcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "User Verified Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(error);
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
        unverified: true,
        email: user.email,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "wrong username or password" });
    }

    generateTokenAndSetCookies(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    await resetPasswordMail(user.email, resetToken);

    res.status(200).json({
      success: true,
      message: "reset password link sent successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired token" });
    }

    const updatedPassword = await bcrypt.hash(password, 10);

    user.password = updatedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    await resetPasswordSuccessMail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "password changed successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// check auth
export const checkAuth = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).select("-password");
  try {
    if (!user) {
      res.status(400).json({ success: false, message: "No User Found" });
    }
    res.status(200).json({ success: true, user });
    // res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
