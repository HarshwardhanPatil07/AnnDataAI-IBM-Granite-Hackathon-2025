import { NextFunction, Request, Response } from "express";
import { CreateOrderRequestBody } from "../utils/orderTypes";
import Order from "../models/orderModel";
import { CustomError } from "../utils/error";
import { AuthRequest } from "../middlewares/authentication";
import { emitOrderUpdate, emitNewOrder } from "../socket";
import mongoose from "mongoose";

// Interface for Order document with proper typing
interface IOrderDocument extends mongoose.Document {
  status: string;
  _id: mongoose.Types.ObjectId;
  user: string;
  // Add other properties as needed
}

// Generate a unique order number
const generateOrderNumber = (): string => {
  const prefix = "AGR";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Received order request:", JSON.stringify(req.body, null, 2));
    console.log("User in request:", (req as AuthRequest).user);

    // Extract the data from the request body with flexible structure
    const {
      items,
      customerInfo,
      totalAmount,
      shippingInfo,
      paymentMethod,
      shippingMethod,
      subTotal,
      total,
    } = req.body;

    // Validate request body with support for both formats
    if (
      !items ||
      items.length === 0 ||
      (!customerInfo && !shippingInfo) ||
      (!totalAmount && !total && !subTotal)
    ) {
      throw new CustomError(
        "Please provide all required fields: items, shipping information, and total amount",
        400
      );
    }

    // Normalize shipping info format
    const shippingAddress = customerInfo || shippingInfo;

    // Check if shipping address has all required fields
    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      throw new CustomError(
        "Shipping address must include name, phone, address, city, state, and pincode",
        400
      );
    }

    // Normalize order items format
    const orderItems = items.map((item: any) => {
      // Create base order item without product field
      const orderItem: any = {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image:
          item.image ||
          "https://via.placeholder.com/300x180?text=Product+Image",
      };

      // Only add product field if it's a valid MongoDB ObjectId string
      if (
        item.productId &&
        typeof item.productId === "string" &&
        mongoose.Types.ObjectId.isValid(item.productId)
      ) {
        orderItem.product = new mongoose.Types.ObjectId(item.productId);
      }
      // Don't include product field if it's a number or invalid ObjectId

      return orderItem;
    });

    console.log("Processed order items:", JSON.stringify(orderItems, null, 2));

    // Get user ID with fallback
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id || authReq.user?._id;

    console.log("createOrder - authReq.user:", authReq.user);
    console.log("createOrder - extracted userId:", userId);

    if (!userId) {
      throw new CustomError("User not authenticated", 401);
    }

    // Create the order object
    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      user: userId,
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod || "cod",
      shippingPrice: shippingMethod?.price || 60,
      totalPrice: totalAmount || total || subTotal,
      status: "pending",
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("Created new order:", JSON.stringify(savedOrder, null, 2));

    // Emit socket event for new order if available
    try {
      emitNewOrder(savedOrder);
    } catch (error) {
      console.log("Socket emission error (non-critical):", error);
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// @desc    Get all orders for user
// @route   GET /api/orders
// @access  Private
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id || authReq.user?._id;

    console.log("getOrders - authReq.user:", authReq.user);
    console.log("getOrders - extracted userId:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userOrders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: userOrders.length,
      orders: userOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id || authReq.user?._id;
    const userRole = authReq.user?.role;

    console.log("getOrderById - authReq.user:", authReq.user);
    console.log("getOrderById - extracted userId:", userId);

    // Find the order in the database
    const order = await Order.findById(orderId);

    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    // Check if the order belongs to the authenticated user or user is admin
    if (order.user.toString() !== userId && userRole !== "admin") {
      throw new CustomError("Not authorized to access this order", 403);
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get orders for the current user
 * @route GET /api/orders/user
 * @access Private
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    // Use authRequest to get the authenticated user
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id || authReq.user?._id;

    console.log("getUserOrders - authReq.user:", authReq.user);
    console.log("getUserOrders - extracted userId:", userId);

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "User not authenticated",
      });
    }

    // Default pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get orders for the user with pagination
    const totalItems = await Order.countDocuments({ user: userId });
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "email name")
      .lean();

    // Add formatted orderNumber to each order if it doesn't exist
    const formattedOrders = orders.map((order: any) => {
      // If orderNumber already exists, use it, otherwise generate
      if (order.orderNumber) {
        return order;
      }
      return {
        ...order,
        orderNumber: `ORD-${order._id.toString().slice(-6).toUpperCase()}`,
      };
    });

    return res.status(200).json({
      status: "success",
      data: formattedOrders,
      pagination: {
        totalItems,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Cancel an order
export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id || authReq.user?._id;

    console.log("cancelOrder - authReq.user:", authReq.user);
    console.log("cancelOrder - extracted userId:", userId);

    const order = (await Order.findOne({
      _id: orderId,
      user: userId,
    })) as IOrderDocument;

    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    // Check if order can be cancelled
    if (order.status === "shipped" || order.status === "delivered") {
      throw new CustomError(
        "Cannot cancel an order that has already been shipped or delivered",
        400
      );
    }

    // Update order status to cancelled
    order.status = "cancelled";
    await order.save();

    // Emit order update for admin dashboard - use a string version of the ID
    const orderIdString = order._id.toString();
    emitOrderUpdate(orderIdString, {
      status: "cancelled",
      orderId: orderIdString,
      userId: order.user,
    });

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// Get admin order dashboard (for admins only)
export const getOrdersDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This should be protected by an admin middleware
    const pendingCount = await Order.countDocuments({ status: "pending" });
    const processingCount = await Order.countDocuments({
      status: "processing",
    });
    const shippedCount = await Order.countDocuments({ status: "shipped" });
    const deliveredCount = await Order.countDocuments({ status: "delivered" });
    const cancelledCount = await Order.countDocuments({ status: "cancelled" });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "email");

    res.status(200).json({
      status: "success",
      data: {
        counts: {
          pending: pendingCount,
          processing: processingCount,
          shipped: shippedCount,
          delivered: deliveredCount,
          cancelled: cancelledCount,
          total:
            pendingCount +
            processingCount +
            shippedCount +
            deliveredCount +
            cancelledCount,
        },
        recentOrders,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get all orders with pagination and filtering (for admins only)
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);

    // Get orders with pagination
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "email");

    res.status(200).json({
      status: "success",
      results: orders.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalItems: totalOrders,
        itemsPerPage: limit,
      },
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only in full implementation)
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!status) {
      throw new CustomError("Please provide a status", 400);
    }

    // Find the order in the database
    const order = await Order.findById(orderId);

    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    // Update order status
    order.status = status;
    order.updatedAt = new Date();

    // Save the updated order
    const updatedOrder = await order.save();

    // Emit socket event for order update if available
    try {
      emitOrderUpdate(orderId, {
        status: status,
        orderId: orderId,
        userId: order.user.toString(),
      });
    } catch (error) {
      console.log("Socket emission error (non-critical):", error);
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
