import { io } from "socket.io-client";
import { API_URL } from "../constants";

let socket = null;
let adminListeners = [];
let userListeners = [];

export const initializeSocket = () => {
  // Close any existing connection
  if (socket) socket.disconnect();

  // Get the base URL for WebSocket connection (remove /api if present)
  let socketUrl = API_URL;
  if (socketUrl.endsWith("/api")) {
    socketUrl = socketUrl.substring(0, socketUrl.length - 4);
  }

  console.log("Connecting to WebSocket server at:", socketUrl);

  // Connect to the WebSocket server
  socket = io(socketUrl, {
    withCredentials: true, // For session cookie
    transports: ["websocket"], // Prefer WebSocket transport
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Register global event listeners
  socket.on("connect", () => {
    console.log("Socket connected successfully");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

// Join the admin room (for admin users)
export const joinAdminRoom = () => {
  if (!socket || !socket.connected) {
    console.error("Socket not connected");
    return;
  }

  socket.emit("join_admin_room");
  console.log("Joined admin room");
};

// Join the user's orders room (for regular users)
export const joinUserOrdersRoom = (userId) => {
  if (!socket || !socket.connected) {
    console.error("Socket not connected");
    return;
  }

  socket.emit("join_user_orders", userId);
  console.log("Joined user orders room for user:", userId);
};

// Register a listener for admin events
export const onAdminEvent = (eventName, callback) => {
  if (!socket || !socket.connected) {
    console.error("Socket not connected");
    return () => {};
  }

  socket.on(eventName, callback);

  // Store the listener for cleanup
  adminListeners.push({ eventName, callback });

  // Return a function to remove this specific listener
  return () => {
    socket.off(eventName, callback);
    adminListeners = adminListeners.filter(
      (listener) =>
        listener.eventName !== eventName || listener.callback !== callback
    );
  };
};

// Register a listener for user events
export const onUserEvent = (eventName, callback) => {
  if (!socket || !socket.connected) {
    console.error("Socket not connected");
    return () => {};
  }

  socket.on(eventName, callback);

  // Store the listener for cleanup
  userListeners.push({ eventName, callback });

  // Return a function to remove this specific listener
  return () => {
    socket.off(eventName, callback);
    userListeners = userListeners.filter(
      (listener) =>
        listener.eventName !== eventName || listener.callback !== callback
    );
  };
};

// Clean up all admin listeners
export const cleanupAdminListeners = () => {
  if (!socket) return;

  adminListeners.forEach(({ eventName, callback }) => {
    socket.off(eventName, callback);
  });

  adminListeners = [];
};

// Clean up all user listeners
export const cleanupUserListeners = () => {
  if (!socket) return;

  userListeners.forEach(({ eventName, callback }) => {
    socket.off(eventName, callback);
  });

  userListeners = [];
};

// Disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    adminListeners = [];
    userListeners = [];
  }
};

// Get the socket instance
export const getSocket = () => socket;
