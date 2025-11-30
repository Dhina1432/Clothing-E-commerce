import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.use(protect); // All cart routes require authentication

cartRouter.get("/", getCart);
cartRouter.post("/add", addToCart);
cartRouter.put("/update", updateCartItem);
cartRouter.delete("/remove", removeFromCart);

export default cartRouter;
