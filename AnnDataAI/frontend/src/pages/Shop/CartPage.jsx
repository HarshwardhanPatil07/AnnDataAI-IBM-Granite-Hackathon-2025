import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import ShippingRates from "../../components/shop/ShippingRates";
import {
  createOrder,
  testOrder,
  initializeToken,
} from "../../services/orderService";
import axios from "axios";
import { API_URL } from "../../config/constants";
import useTokenStore from "../../store/useTokenStore";
import LoginAlert from "../../components/shop/LoginAlert";

const steps = ["Shopping Cart", "Shipping Details", "Payment", "Confirmation"];

const CartPage = () => {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [selectedShippingRate, setSelectedShippingRate] = useState({
    id: "standard",
    price: 60,
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Add access to the token store
  const { token } = useTokenStore((state) => ({ token: state.token }));

  // Handle quantity changes
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  // Navigate back to shop
  const handleContinueShopping = () => {
    navigate("/shop");
  };

  // Add this function within the CartPage component
  const checkApiConnection = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      console.log("API health check:", response.data);
      return true;
    } catch (error) {
      console.error("API connectivity error:", error);
      return false;
    }
  };

  // Modify the handleNext function to check auth before completing the order
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Order complete - try to send to backend
      setIsProcessing(true);
      setApiError(null);

      try {
        // Make sure we have latest token
        initializeToken();
        console.log("Current token:", useTokenStore.getState().token);

        // Check if user is logged in before submitting
        if (!token) {
          console.warn(
            "User is not logged in. Please sign in to complete your order."
          );
          setApiError(
            "You must be logged in to complete your order. Please sign in first."
          );
          setIsProcessing(false);
          return;
        }

        const orderData = {
          items: cart.items.map((item) => ({
            productId: item.id ? item.id.toString() : null,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            image:
              item.image ||
              "https://via.placeholder.com/300x180?text=Product+Image",
          })),
          shippingInfo: shippingInfo,
          paymentMethod: shippingInfo.paymentMethod,
          shippingMethod: selectedShippingRate,
          subTotal: cart.totalPrice,
          total: getOrderTotal(),
        };

        try {
          // Call createOrder directly without any preliminary checks
          const result = await createOrder(orderData);
          console.log("Order successfully created in backend:", result);
          // Show success dialog
          setOrderSuccess(true);
        } catch (orderError) {
          console.error("Error creating order in backend:", orderError);
          if (!token) {
            console.warn(
              "No authentication token found. This might be why order creation failed."
            );
          }
          setApiError(
            orderError.response?.data?.message ||
              orderError.message ||
              "Failed to create order. Please check your connection and try again."
          );
        }
      } catch (error) {
        console.error("Error processing order:", error);
        setApiError(
          error.response?.data?.message ||
            error.message ||
            "Failed to process your order. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle shipping form changes
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle shipping rate selection
  const handleShippingRateChange = (rate) => {
    setSelectedShippingRate(rate);
  };

  // Handle successful order completion
  const handleOrderComplete = () => {
    clearCart();
    setOrderSuccess(false);
    navigate("/home");
  };

  // Calculate order total with shipping
  const getOrderTotal = () => {
    return cart.totalPrice + (selectedShippingRate?.price || 0);
  };

  // Check if all required fields are filled for the current step
  const isStepComplete = () => {
    if (activeStep === 0) {
      return cart.items.length > 0;
    }
    if (activeStep === 1) {
      const { name, phone, address, city, state, pincode } = shippingInfo;
      return name && phone && address && city && state && pincode;
    }
    return true;
  };

  // Render different steps based on activeStep
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderCartItems();
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentMethod();
      case 3:
        return renderOrderSummary();
      default:
        return "Unknown step";
    }
  };

  // Render cart items
  const renderCartItems = () => {
    if (cart.items.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography variant="h6" color="text.primary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven&apos;t added any products to your cart yet.
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Box>
      );
    }

    return (
      <Box>
        <LoginAlert />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cart.items.map((item) => (
              <Card key={item.id} sx={{ mb: 2, borderRadius: 2 }}>
                <Grid container>
                  <Grid item xs={3} sm={2}>
                    <CardMedia
                      component="img"
                      sx={{ height: "100%", objectFit: "cover" }}
                      image={
                        item.image ||
                        "https://via.placeholder.com/300x180?text=Product+Image"
                      }
                      alt={item.name}
                    />
                  </Grid>
                  <Grid item xs={9} sm={10}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₹{item.price} {item.unit}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <TextField
                              size="small"
                              value={item.quantity}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 0;
                                handleQuantityChange(item.id, newValue);
                              }}
                              inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                              }}
                              sx={{ width: "60px", mx: 1 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sm={2} sx={{ textAlign: "right" }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}

            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleContinueShopping}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      Subtotal ({cart.totalItems} items)
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="body2">
                      ₹{cart.totalPrice.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">Shipping Fee</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="body2">
                      ₹
                      {cart.totalPrice > 0
                        ? selectedShippingRate.price.toFixed(2)
                        : "0.00"}
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
                    ₹{cart.totalPrice > 0 ? getOrderTotal().toFixed(2) : "0.00"}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3, borderRadius: 2 }}
                onClick={handleNext}
                disabled={cart.items.length === 0}
                endIcon={<ShoppingCartCheckoutIcon />}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render shipping form
  const renderShippingForm = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Full Name"
                  fullWidth
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Phone Number"
                  fullWidth
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Address"
                  fullWidth
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="City"
                  fullWidth
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="State"
                  fullWidth
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Pin Code"
                  fullWidth
                  name="pincode"
                  value={shippingInfo.pincode}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <ShippingRates onSelectRate={handleShippingRateChange} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    Items ({cart.totalItems})
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    ₹{cart.totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Shipping</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    ₹{selectedShippingRate.price.toFixed(2)}
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
                  ₹{getOrderTotal().toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!isStepComplete()}
                sx={{ borderRadius: 2 }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // Render payment method selection
  const renderPaymentMethod = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Payment Method
            </Typography>
            <TextField
              select
              label="Select Payment Method"
              fullWidth
              name="paymentMethod"
              value={shippingInfo.paymentMethod}
              onChange={handleShippingInfoChange}
              sx={{ mt: 2 }}
            >
              <MenuItem value="cod">Cash on Delivery</MenuItem>
              <MenuItem value="upi">UPI Payment</MenuItem>
              <MenuItem value="card">Credit/Debit Card</MenuItem>
            </TextField>

            {shippingInfo.paymentMethod === "cod" && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">
                  Pay with cash upon delivery. Our delivery partner will collect
                  the payment when you receive the package.
                </Typography>
              </Box>
            )}

            {shippingInfo.paymentMethod === "upi" && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="UPI ID"
                  fullWidth
                  placeholder="example@upi"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Please ensure your UPI ID is correct. You will receive a
                  payment request on your UPI app.
                </Typography>
              </Box>
            )}

            {shippingInfo.paymentMethod === "card" && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      placeholder="123"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Name on Card" fullWidth />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    Items ({cart.totalItems})
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    ₹{cart.totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Shipping</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    ₹{selectedShippingRate.price.toFixed(2)}
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
                  ₹{getOrderTotal().toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ borderRadius: 2 }}
              >
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // Render order summary
  const renderOrderSummary = () => {
    return (
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{ p: 4, borderRadius: 2, textAlign: "center" }}
          >
            {apiError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {apiError}
              </Alert>
            )}

            {isProcessing && (
              <Box sx={{ mb: 3, mt: 2 }}>
                <Alert severity="info">
                  Processing your order. Please wait...
                </Alert>
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight={700}
                color="primary"
              >
                Order Confirmation
              </Typography>
              <Typography variant="body1">
                Thank you for your order! Your order has been placed
                successfully.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Order Details
              </Typography>
              <Typography variant="body2">
                Order Number: #ORD-{Math.floor(Math.random() * 10000)}
              </Typography>
              <Typography variant="body2">
                Order Date: {new Date().toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Payment Method:{" "}
                {shippingInfo.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : shippingInfo.paymentMethod === "upi"
                  ? "UPI Payment"
                  : "Card Payment"}
              </Typography>
              <Typography variant="body2">
                Shipping Method: {selectedShippingRate.name}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Shipping Address
              </Typography>
              <Typography variant="body2">{shippingInfo.name}</Typography>
              <Typography variant="body2">{shippingInfo.address}</Typography>
              <Typography variant="body2">
                {shippingInfo.city}, {shippingInfo.state} -{" "}
                {shippingInfo.pincode}
              </Typography>
              <Typography variant="body2">
                Phone: {shippingInfo.phone}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Order Summary
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={8} textAlign="left">
                  <Typography variant="body2">Subtotal</Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography variant="body2">
                    ₹{cart.totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={8} textAlign="left">
                  <Typography variant="body2">Shipping</Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography variant="body2">
                    ₹{selectedShippingRate.price.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={8} textAlign="left">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="primary"
                  >
                    ₹{getOrderTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2 }}
              onClick={handleNext}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Processing...
                </>
              ) : (
                "Complete Order"
              )}
            </Button>

            {typeof window !== "undefined" &&
              window.process &&
              window.process.env.NODE_ENV !== "production" && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "rgba(0,0,0,0.05)",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Debug Info (Development Only)
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      try {
                        const isConnected = await checkApiConnection();
                        setApiError(
                          isConnected
                            ? "API connectivity test successful"
                            : "API connectivity test failed"
                        );
                      } catch (err) {
                        setApiError(`API test error: ${err.message}`);
                      }
                    }}
                  >
                    Test API Connection
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                    onClick={async () => {
                      try {
                        const testData = {
                          test: true,
                          timestamp: new Date().toISOString(),
                        };
                        await testOrder(testData);
                        setApiError("Order test endpoint successful");
                      } catch (err) {
                        setApiError(`Order test error: ${err.message}`);
                      }
                    }}
                  >
                    Test Order Endpoint
                  </Button>
                </Box>
              )}
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 1,
          fontWeight: 700,
          color:
            theme.palette.mode === "light" ? "primary.main" : "primary.light",
        }}
      >
        {activeStep === 0 ? "Shopping Cart" : steps[activeStep]}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: "text.secondary" }}>
        {activeStep === 0
          ? "Review your items and proceed to checkout"
          : activeStep === 1
          ? "Enter your shipping details"
          : activeStep === 2
          ? "Choose your payment method"
          : "Review and confirm your order"}
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {getStepContent(activeStep)}

      {/* Order Success Dialog */}
      <Dialog
        open={orderSuccess}
        onClose={handleOrderComplete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Order Successfully Placed!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your order has been successfully placed. Thank you for shopping with
            AnnDataAI!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOrderComplete}
            variant="contained"
            color="primary"
            autoFocus
          >
            Return to Home
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
