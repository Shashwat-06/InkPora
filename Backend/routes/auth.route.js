import express from "express";
import { signup, verifyMail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyMail", verifyMail);

export default router;
