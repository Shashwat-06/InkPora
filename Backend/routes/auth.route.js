import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyMail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyMail", verifyMail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;
