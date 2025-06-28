import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  cancelOrder,
} from "../controllers/orderController";
import { authenticate } from "../middlewares/authMiddleware";
import { authentication } from "../middlewares/authentication";

const router = express.Router();

// Protected routes - use both middleware for backward compatibility
router.post("/", [authenticate, authentication], createOrder);
router.get("/", [authenticate, authentication], getOrders);
router.get("/user", [authenticate, authentication], getUserOrders);
router.get("/:id", [authenticate, authentication], getOrderById);
router.patch("/:id/cancel", [authenticate, authentication], cancelOrder);
router.put("/:id/status", [authenticate, authentication], updateOrderStatus);

// Test endpoint (to be removed in production)
router.post("/test", (req, res) => {
  console.log("Test order endpoint hit:", req.body);
  res.status(200).json({ message: "Test endpoint working" });
});

export default router;
