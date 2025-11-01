import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addToCart,
  deleteFromCart,
  showCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, deleteFromCart);
router.get("/showItems", verifyToken, showCart);
export default router;
