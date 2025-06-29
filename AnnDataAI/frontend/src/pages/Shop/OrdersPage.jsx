import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  useTheme,
  Divider,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { getUserOrders, cancelOrder } from "../../services/orderService.js";
import {
  initializeSocket,
  joinUserOrdersRoom,
  onUserEvent,
  cleanupUserListeners,
} from "../../services/socketService.js";
import useAuthStore from "../../store/useAuthStore.js";

const OrdersPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchOrders();

    // Initialize WebSocket connection for real-time updates
    if (user && user._id) {
      const socket = initializeSocket();
      joinUserOrdersRoom(user._id);

      // Listen for order updates
      const unsubscribe = onUserEvent("user_order_updated", (data) => {
        console.log("Order update received:", data);

        // Update the order in the list if it exists
        setOrders((prevOrders) => {
          return prevOrders.map((order) => {
            if (order._id === data.orderId) {
              return { ...order, status: data.status };
            }
            return order;
          });
        });
      });

      // Cleanup on component unmount
      return () => {
        unsubscribe();
        cleanupUserListeners();
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getUserOrders();
      setOrders(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setActionLoading(true);
      await cancelOrder(orderId);
      fetchOrders(); // Refresh orders after cancellation
    } catch (err) {
      console.error("Error cancelling order:", err);
      setError(
        err.response?.data?.message ||
          "Failed to cancel order. Please try again."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/shop/orders/${orderId}`);
  };

  const getStatusChipColor = (status) => {
    const statusColors = {
      pending: "warning",
      processing: "info",
      shipped: "primary",
      delivered: "success",
      cancelled: "error",
    };
    return statusColors[status] || "default";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/shop")}
          sx={{ mb: 2 }}
        >
          Back to Shop
        </Button>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          sx={{
            color:
              theme.palette.mode === "light" ? "primary.main" : "primary.light",
          }}
        >
          My Orders
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          View and manage your orders
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <ShoppingBagIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/shop")}
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Browse Products
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ReceiptIcon sx={{ mr: 1, color: "primary.main" }} />
                      {order.orderNumber}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)
                      }
                      color={getStatusChipColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewOrderDetails(order._id)}
                      >
                        View
                      </Button>
                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={actionLoading}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersPage;
