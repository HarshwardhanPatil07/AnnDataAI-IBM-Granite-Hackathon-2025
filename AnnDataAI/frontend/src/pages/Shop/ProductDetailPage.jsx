import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  Chip,
  Paper,
  IconButton,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  Snackbar,
  useTheme,
  MobileStepper,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import agricultureProducts from "../../data/agricultureProducts";
import { useCart } from "../../context/CartContext";
import RecommendedProducts from "../../components/shop/RecommendedProducts";
import { getProductImageUrl } from "../../utils/imageUtils";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Function to generate additional image URLs for the carousel
  const generateAdditionalImages = (product) => {
    // For demo purposes, we'll generate variations of the main image
    // In a real app, these would be actual different images of the product
    const baseImage = product.image;
    const categoryImages = agricultureProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .map((p) => p.image)
      .slice(0, 2);

    return [
      baseImage,
      ...categoryImages,
      `https://images.unsplash.com/photo-1552089123-2d26226fc2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`, // Generic agriculture image
    ];
  };

  useEffect(() => {
    // Find product by ID
    const foundProduct = agricultureProducts.find(
      (p) => p.id === parseInt(productId)
    );
    if (foundProduct) {
      // Generate additional images for the carousel
      const additionalImages = generateAdditionalImages(foundProduct);
      setProduct({
        ...foundProduct,
        additionalImages,
      });
    } else {
      // If product not found, redirect to shop
      navigate("/shop");
    }
  }, [productId, navigate]);

  if (!product) {
    return null; // Loading or redirecting
  }

  // Function to get category details
  const getCategoryDisplay = (category) => {
    const categories = {
      seeds: { label: "Seeds", color: "success" },
      fertilizers: { label: "Fertilizer", color: "primary" },
      tools: { label: "Equipment", color: "secondary" },
      pesticides: { label: "Pesticide", color: "warning" },
      harvested: { label: "Harvested", color: "info" },
    };

    return categories[category] || { label: category, color: "default" };
  };

  const categoryDisplay = getCategoryDisplay(product.category);

  // Handle quantity changes
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowSnackbar(true);
  };

  // Handle continue shopping
  const handleBack = () => {
    navigate(-1);
  };

  // Handle view cart
  const handleViewCart = () => {
    navigate("/shop/cart");
  };

  // Handle snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  // Handle image carousel navigation
  const handleNext = () => {
    setActiveStep((prevStep) =>
      prevStep === product.additionalImages.length - 1 ? 0 : prevStep + 1
    );
  };

  const handleBack2 = () => {
    setActiveStep((prevStep) =>
      prevStep === 0 ? product.additionalImages.length - 1 : prevStep - 1
    );
  };

  // Get seasonal recommendations based on product category
  const getSeasonalRecommendation = (category) => {
    const recommendations = {
      seeds: {
        title: "Optimal Sowing Season",
        content:
          "Best time to sow these seeds is during the onset of monsoon for rain-fed agriculture or pre-summer for irrigated lands. Plant in well-drained soil with adequate organic matter.",
      },
      fertilizers: {
        title: "Application Guidelines",
        content:
          "Apply this fertilizer during the early growing season. For best results, incorporate into the soil before planting or side-dress plants when they are actively growing.",
      },
      tools: {
        title: "Seasonal Usage Tip",
        content:
          "This equipment is ideal for use during the pre-sowing or post-harvest period. Ensure proper maintenance before the peak farming season for optimal performance.",
      },
      pesticides: {
        title: "Application Timing",
        content:
          "Most effective when applied early in the morning or late evening to avoid rapid evaporation. Monitor pest populations regularly and apply preventatively before infestation becomes severe.",
      },
      harvested: {
        title: "Storage Recommendation",
        content:
          "Store in a cool, dry place away from direct sunlight. For longer shelf life, keep in airtight containers. Best consumed within 3-6 months of purchase for optimal nutritional value.",
      },
    };

    return (
      recommendations[category] || {
        title: "General Recommendation",
        content:
          "Follow package instructions for best results. Contact our agricultural experts for personalized guidance specific to your farming needs and local conditions.",
      }
    );
  };

  const seasonalRecommendation = getSeasonalRecommendation(product.category);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Home
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/shop")}
        >
          Shop
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/shop?category=${product.category}`)}
        >
          {categoryDisplay.label}
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Image Carousel */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: theme.palette.mode === "light" ? 2 : 4,
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: 400,
                objectFit: "contain",
                p: 2,
              }}
              src={product.additionalImages[activeStep]}
              alt={`${product.name} - view ${activeStep + 1}`}
            />
            <MobileStepper
              steps={product.additionalImages.length}
              position="static"
              activeStep={activeStep}
              sx={{ bgcolor: "background.paper" }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  sx={{ borderRadius: 2 }}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack2}
                  sx={{ borderRadius: 2 }}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Chip
                  label={categoryDisplay.label}
                  color={categoryDisplay.color}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  fontWeight={700}
                >
                  {product.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <IconButton color="primary">
                  <FavoriteIcon />
                </IconButton>
                <IconButton color="primary">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {product.rating} rating
              </Typography>
            </Box>

            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              ₹{product.price}{" "}
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
              >
                {product.unit}
              </Typography>
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Features:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {product.features.map((feature, index) => (
                  <Typography
                    component="li"
                    variant="body2"
                    key={index}
                    paragraph
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Seasonal Recommendation */}
            <Card
              sx={{
                mb: 3,
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(129, 199, 132, 0.1)"
                    : "rgba(129, 199, 132, 0.05)",
                borderLeft: "4px solid",
                borderLeftColor: "success.main",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmojiNatureIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {seasonalRecommendation.title}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {seasonalRecommendation.content}
                </Typography>
              </CardContent>
            </Card>

            <Divider sx={{ my: 3 }} />

            {/* Quantity and Add to Cart */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Quantity:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue) && newValue > 0) {
                      setQuantity(newValue);
                    }
                  }}
                  inputProps={{ min: 1, style: { textAlign: "center" } }}
                  sx={{ width: "80px", mx: 2 }}
                />
                <IconButton onClick={() => handleQuantityChange(1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                    sx={{ borderRadius: 2 }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleViewCart}
                    sx={{ borderRadius: 2 }}
                  >
                    View Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* In Stock Status */}
            <Box>
              <Typography
                variant="subtitle2"
                color={product.inStock ? "success.main" : "error.main"}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {product.name} added to cart!
        </Alert>
      </Snackbar>

      {/* Recommended Products */}
      <RecommendedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </Container>
  );
};

export default ProductDetailPage;
