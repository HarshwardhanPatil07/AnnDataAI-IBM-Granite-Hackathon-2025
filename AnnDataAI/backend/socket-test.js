// This file is for testing socket.io connections
// Run this with Node.js to test the socket.io server

const { io } = require("socket.io-client");

// Connect to the socket server
const socket = io("http://localhost:3600");

// Listen for connection events
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);

  // Join a device room
  const deviceId = "device_001";
  socket.emit("join_device", deviceId);

  // Simulate sending sensor data every 5 seconds
  setInterval(() => {
    const sensorData = {
      deviceId: deviceId,
      moisture: Math.floor(Math.random() * 100),
      temperature: 20 + Math.random() * 10,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending sensor data:", sensorData);
    socket.emit("sensor_data", sensorData);

    // If moisture is low, send an alert
    if (sensorData.moisture < 30) {
      socket.emit("moisture_alert", {
        deviceId: deviceId,
        level: sensorData.moisture,
        status: "low",
        timestamp: new Date().toISOString(),
      });
    }
  }, 5000);
});

// Listen for server messages
socket.on("sensor_update", (data) => {
  console.log("Received sensor update:", data);
});

socket.on("alert", (data) => {
  console.log("Received alert:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

console.log("Socket.io test client started. Press Ctrl+C to exit.");
