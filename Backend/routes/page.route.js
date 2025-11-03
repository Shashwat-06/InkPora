import express from "express";
import {
  individualProduct,
  productData,
  searchData,
} from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", productData);
router.get("/showProduct/:id", individualProduct);
router.get("/search/:searchParam", searchData);

export default router;
