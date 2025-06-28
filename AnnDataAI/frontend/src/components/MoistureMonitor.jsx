import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Divider,
  List,
  ListItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";

const MoistureMonitor = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [moisture, setMoisture] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [deviceId, setDeviceId] = useState("device_001");

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io("http://localhost:3600");

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
      setConnected(true);

      // Join device-specific room
      socketInstance.emit("join_device", deviceId);
    });

    socketInstance.on("sensor_update", (data) => {
      console.log("Received sensor update:", data);
      if (data.deviceId === deviceId) {
        setMoisture(data.moisture);
        setTemperature(data.temperature);
        setLastUpdate(new Date(data.timestamp));
      }
    });

    socketInstance.on("alert", (data) => {
      console.log("Received alert:", data);
      setAlerts((prev) => [...prev, data].slice(-5)); // Keep last 5 alerts
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setConnected(false);
    });

    setSocket(socketInstance);

    // Clean up the socket connection on component unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [deviceId]);

  // Function to determine moisture level status and color
  const getMoistureStatus = (level) => {
    if (level < 30) return { status: "Low", color: "red" };
    if (level < 70) return { status: "Optimal", color: "green" };
    return { status: "High", color: "blue" };
  };

  // Get current moisture status
  const { status, color } = getMoistureStatus(moisture);

  return (
    <Box p={5}>
      <Heading mb={4}>Soil Moisture Monitor</Heading>

      <Badge colorScheme={connected ? "green" : "red"} mb={4}>
        {connected ? "Connected" : "Disconnected"}
      </Badge>

      <Text mb={4}>Device ID: {deviceId}</Text>

      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Card flex={1}>
          <CardHeader>
            <Heading size="md">Current Readings</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="center">
              <CircularProgress
                value={moisture}
                size="150px"
                thickness="8px"
                color={color + ".400"}
              >
                <CircularProgressLabel>{moisture}%</CircularProgressLabel>
              </CircularProgress>

              <Text fontWeight="bold" fontSize="xl">
                Moisture Level: <Badge colorScheme={color}>{status}</Badge>
              </Text>

              <HStack spacing={4}>
                <Box textAlign="center">
                  <Text fontSize="sm">Temperature</Text>
                  <Text fontWeight="bold">{temperature.toFixed(1)}°C</Text>
                </Box>
                <Divider orientation="vertical" height="40px" />
                <Box textAlign="center">
                  <Text fontSize="sm">Last Update</Text>
                  <Text fontWeight="bold">
                    {lastUpdate ? lastUpdate.toLocaleTimeString() : "N/A"}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card flex={1}>
          <CardHeader>
            <Heading size="md">Recent Alerts</Heading>
          </CardHeader>
          <CardBody>
            <List spacing={3}>
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <ListItem key={index}>
                    <Alert
                      status={alert.status === "low" ? "warning" : "info"}
                      borderRadius="md"
                    >
                      <AlertIcon />
                      <Box>
                        <AlertTitle>{alert.message}</AlertTitle>
                        <AlertDescription>
                          {new Date(alert.timestamp).toLocaleString()}
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </ListItem>
                ))
              ) : (
                <Text color="gray.500">No recent alerts</Text>
              )}
            </List>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default MoistureMonitor;
