import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.use(protect); // All order routes require authentication

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);

export default orderRouter;
