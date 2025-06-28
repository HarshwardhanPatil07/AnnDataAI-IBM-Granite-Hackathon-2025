// API base URL
export const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3600/api"
    : "https://your-production-api.com/api");

// Make sure the API URL has the proper format
export const getApiUrl = () => {
  // Make sure the URL has a protocol
  if (!API_URL.startsWith("http://") && !API_URL.startsWith("https://")) {
    return `http://${API_URL}`;
  }
  return API_URL;
};

// Image placeholder
export const DEFAULT_IMAGE_PLACEHOLDER =
  "https://via.placeholder.com/300x180?text=Product+Image";
