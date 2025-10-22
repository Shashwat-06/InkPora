import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { resetPasswordSuccessMail } from "../resend/resend.config.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    if (!product) {
      res.status(400).json({ success: false, message: "Product not found" });
    }

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      user.cart.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    if (!product) {
      res.status(400).json({ success: false, message: "Product not found" });
    }

    const selectedProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!selectedProduct) {
      res
        .status(400)
        .json({ success: false, message: "No such product in cart" });
    } else {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "product removed from cart successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
