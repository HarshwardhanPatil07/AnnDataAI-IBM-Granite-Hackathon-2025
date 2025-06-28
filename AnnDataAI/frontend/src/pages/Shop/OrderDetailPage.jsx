import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  useTheme,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { getOrderById, cancelOrder } from "../../services/orderService";
import {
  initializeSocket,
  joinUserOrdersRoom,
  onUserEvent,
  cleanupUserListeners,
} from "../../services/socketService";
import useAuthStore from "../../store/useAuthStore";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchOrderDetails();

    // Initialize WebSocket connection for real-time updates
    if (user && user._id) {
      const socket = initializeSocket();
      joinUserOrdersRoom(user._id);

      // Listen for order updates
      const unsubscribe = onUserEvent("user_order_updated", (data) => {
        console.log("Order update received:", data);

        // Update current order if it matches
        if (data.orderId === orderId) {
          setOrder((prevOrder) => {
            if (prevOrder) {
              return { ...prevOrder, status: data.status };
            }
            return prevOrder;
          });
        }
      });

      // Cleanup on component unmount
      return () => {
        unsubscribe();
        cleanupUserListeners();
      };
    }
  }, [orderId, user]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await getOrderById(orderId);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load order details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setCancelling(true);
      await cancelOrder(orderId);
      fetchOrderDetails(); // Refresh order details
    } catch (err) {
      console.error("Error cancelling order:", err);
      setError(
        err.response?.data?.message ||
          "Failed to cancel order. Please try again."
      );
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cod: "Cash on Delivery",
      upi: "UPI Payment",
      card: "Card Payment",
    };
    return methods[method] || method;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/shop/orders")}
          sx={{ mb: 3 }}
        >
          Back to Orders
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/shop/orders")}
          sx={{ mb: 3 }}
        >
          Back to Orders
        </Button>
        <Alert severity="warning">
          Order not found. It may have been removed or you don't have access.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/shop/orders")}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <ReceiptIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" component="h1" fontWeight={600}>
                    Order #{order.orderNumber}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Placed on {formatDate(order.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: { sm: "right" } }}>
                <Chip
                  label={
                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  }
                  color={getStatusChipColor(order.status)}
                  sx={{ mb: 1 }}
                />
                {(order.status === "pending" ||
                  order.status === "processing") && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleCancelOrder}
                      disabled={cancelling}
                    >
                      {cancelling ? "Cancelling..." : "Cancel Order"}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Items
            </Typography>
            <List disablePadding>
              {order.items.map((item, index) => (
                <React.Fragment key={item.productId}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 0,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        mb: { xs: 2, sm: 0 },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 2,
                        }}
                        image={
                          item.image ||
                          "https://via.placeholder.com/80?text=Product"
                        }
                        alt={item.name}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Category: {item.category}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2">
                            ₹{item.price.toFixed(2)} × {item.quantity}
                          </Typography>
                          <Typography variant="subtitle2" fontWeight={600}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  {index < order.items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="body2">Subtotal</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                      <Typography variant="body2">
                        ₹{order.subTotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">Shipping</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                      <Typography variant="body2">
                        ₹{order.shippingMethod.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color="primary"
                    >
                      ₹{order.total.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Shipping Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight={500}>
                    {order.shippingInfo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.shippingInfo.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.shippingInfo.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                    {order.shippingInfo.pincode}
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Shipping Method
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <LocalShippingIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <Typography variant="body2">
                      {order.shippingMethod.name} - ₹
                      {order.shippingMethod.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Payment Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PaymentIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "primary.main" }}
                  />
                  <Typography variant="body2">
                    {getPaymentMethodLabel(order.paymentMethod)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailPage;
