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
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
  };
};

// Get current user details
export const getCurrentUser = async () => {
  try {
    // Ensure we have the latest token
    initializeToken();

    const baseUrl = getApiUrl();
    const response = await axios.get(`${baseUrl}/users/me`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Check if current user is admin
export const isUserAdmin = () => {
  // Get user role from store
  const userRole = useTokenStore.getState().userRole;
  return userRole === "admin";
};
