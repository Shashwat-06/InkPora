import express from "express";
import { productData } from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", productData);

export default router;
