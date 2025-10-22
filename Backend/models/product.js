import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["pen", "diary"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
  },
  price: {
    type: Number,
  },
  detail: {
    type: String,
  },
});

export const Product = mongoose.model("Product", productSchema);
