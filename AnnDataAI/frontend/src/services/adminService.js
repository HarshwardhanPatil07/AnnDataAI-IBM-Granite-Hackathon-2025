import { API_URL } from "../constants";
import { handleResponse, handleError } from "./helpers";
import useTokenStore from "../store/useTokenStore";
import axios from "axios";

// Helper function to get auth header with token
const getAuthHeader = () => {
  const token = useTokenStore.getState().token;
  if (!token) {
    console.warn("No authentication token found!");
    return {};
  }

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    console.log(
      "Getting dashboard stats with token:",
      useTokenStore.getState().token
    );
    const baseUrl = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
    console.log("Using API URL:", `${baseUrl}/orders/admin/dashboard`);

    const response = await axios.get(
      `${baseUrl}/orders/admin/dashboard`,
      getAuthHeader()
    );

    console.log("Dashboard response:", response.status, response.data);
    return {
      status: "success",
      data: response.data.data,
    };
  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error.response?.data || error.message
    );
    return {
      status: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch dashboard stats",
      data: null,
    };
  }
};

// Get all orders with pagination and filtering
export const getAllOrders = async (page = 1, limit = 10, status = "all") => {
  try {
    const baseUrl = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
    const response = await axios.get(
      `${baseUrl}/orders/admin/all?page=${page}&limit=${limit}&status=${status}`,
      getAuthHeader()
    );

    return {
      status: "success",
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error(
      "Get all orders error:",
      error.response?.data || error.message
    );
    return {
      status: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders",
      data: [],
    };
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const baseUrl = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
    const response = await axios.patch(
      `${baseUrl}/orders/admin/${orderId}/status`,
      { status },
      getAuthHeader()
    );

    return {
      status: "success",
      data: response.data.data,
    };
  } catch (error) {
    console.error(
      "Update order status error:",
      error.response?.data || error.message
    );
    return {
      status: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to update order",
      data: null,
    };
  }
};

// Get sales data for charts (last 7 days)
export const getSalesData = async (days = 7) => {
  try {
    // This is a placeholder - you would need to implement a proper endpoint
    // For now, we'll return some mock data for demonstration
    // In a real app, this would be:
    // const response = await fetch(`${API_URL}/api/admin/sales?days=${days}`...);

    // Mock data for demonstration
    const mockData = {
      labels: Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1) + i);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }),
      sales: Array.from(
        { length: days },
        () => Math.floor(Math.random() * 3000) + 1000
      ),
      orders: Array.from(
        { length: days },
        () => Math.floor(Math.random() * 20) + 5
      ),
    };

    return {
      status: "success",
      data: mockData,
    };
  } catch (error) {
    return handleError(error);
  }
};

// Get product category distribution
export const getProductCategories = async () => {
  try {
    // Mock data for demonstration - would connect to a real endpoint in production
    const mockData = {
      categories: [
        { name: "Seeds", value: 35 },
        { name: "Tools", value: 25 },
        { name: "Fertilizers", value: 20 },
        { name: "Equipment", value: 15 },
        { name: "Pesticides", value: 5 },
      ],
    };

    return {
      status: "success",
      data: mockData,
    };
  } catch (error) {
    return handleError(error);
  }
};
