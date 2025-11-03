import express from "express";
import {
  individualProduct,
  productData,
} from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", productData);
router.get("/showProduct/:id", individualProduct);
router.get("/search/:searchParam", individualProduct);

export default router;
