import { getApiUrl } from "../config/constants";
import axios from "axios";
import useTokenStore from "../store/useTokenStore";

// Variable to store the current token
let currentToken = null;

// Function to set the current token from the store
export const initializeToken = () => {
  const token = useTokenStore.getState().token;
  if (token) {
    currentToken = token;
    return true;
  }
  return false;
};

// Helper function to get auth header with token
const getAuthHeader = () => {
  // First try to get token from Zustand store
  if (!currentToken) {
    try {
      initializeToken();
    } catch (error) {
      console.error("Failed to initialize token from store:", error);
    }
  }

  // If still no token, try localStorage as fallback
  if (!currentToken) {
    currentToken =
      localStorage.getItem("token") ||
      localStorage.getItem("auth-token") ||
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("auth-token");
  }

  if (!currentToken) {
    console.warn("No authentication token found!");
    console.log("localStorage keys:", Object.keys(localStorage));

    // Return empty headers if no token is found
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  console.log("Auth token found:", currentToken.substring(0, 10) + "...");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
  };
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    // Ensure we have the latest token
    initializeToken();

    const baseUrl = getApiUrl();
    console.log("Base URL is this->:", baseUrl);
    const url = `${baseUrl}/orders`;
    console.log("Making order request to:", url);
    console.log("Order data:", JSON.stringify(orderData));

    // Get auth headers properly
    const headers = getAuthHeader();
    console.log("Request headers:", headers);

    // Make the request with proper configuration
    const response = await axios.post(url, orderData, {
      headers: headers.headers,
      withCredentials: true,
    });

    console.log("Order response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error details:", error.response?.data || "No response data");
    console.error("Error status:", error.response?.status || "No status");
    throw error;
  }
};

// Get all orders for the current user
export const getUserOrders = async () => {
  try {
    // Ensure we have the latest token
    initializeToken();

    const baseUrl = getApiUrl();
    const response = await axios.get(`${baseUrl}/orders/user`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Get a specific order by ID
export const getOrderById = async (orderId) => {
  try {
    // Ensure we have the latest token
    initializeToken();

    const baseUrl = getApiUrl();
    const response = await axios.get(
      `${baseUrl}/orders/${orderId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  try {
    // Ensure we have the latest token
    initializeToken();

    const baseUrl = getApiUrl();
    const response = await axios.patch(
      `${baseUrl}/orders/${orderId}/cancel`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
};

// Test order endpoint without authentication
export const testOrder = async (testData) => {
  try {
    const baseUrl = getApiUrl();
    console.log("Testing order endpoint with:", testData);
    const response = await axios.post(`${baseUrl}/orders/test`, testData);
    console.log("Test order response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error testing order endpoint:", error);
    console.error("Error details:", error.response?.data || "No response data");
    console.error("Error status:", error.response?.status || "No status");
    throw error;
  }
};
