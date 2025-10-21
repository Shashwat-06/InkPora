import express from "express";
import {
  individualProduct,
  productData,
} from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", productData);
router.get("/showProduct/:id", individualProduct);

export default router;
