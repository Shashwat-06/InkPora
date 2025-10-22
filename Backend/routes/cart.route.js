import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart } from "../controllers/cart.controller.js";
import { deleteFromCart } from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/add", verifyToken, addToCart);
router.get("/remove", verifyToken, deleteFromCart);

export default router;
