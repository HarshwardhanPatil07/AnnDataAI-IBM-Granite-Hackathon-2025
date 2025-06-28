import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Skeleton,
  Alert,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Using Open Food Facts API to get organic products
        const response = await fetch(
          "https://world.openfoodfacts.org/cgi/search.pl?search_terms=organic+agriculture&search_simple=1&action=process&json=1&page_size=6"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const products = data.products
          .filter((product) => product.product_name && product.image_url)
          .slice(0, 6);

        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setError("Failed to load featured products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewShop = () => {
    navigate("/shop");
  };

  // Function to format a product for display
  const formatProduct = (product) => {
    const name = product.product_name || "Organic Product";
    const brand = product.brands || "Organic";
    const imageUrl =
      product.image_url ||
      "https://images.unsplash.com/photo-1492496913980-501348b61469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

    // Generate categories based on product tags
    const categories = [];
    if (product.categories_tags) {
      if (product.categories_tags.some((tag) => tag.includes("organic")))
        categories.push("organic");
      if (product.categories_tags.some((tag) => tag.includes("grain")))
        categories.push("grain");
      if (product.categories_tags.some((tag) => tag.includes("vegetable")))
        categories.push("vegetable");
      if (product.categories_tags.some((tag) => tag.includes("fruit")))
        categories.push("fruit");
    }

    // Calculate a pseudo rating based on nutrition score if available
    let rating = (
      product.nutriscore_score
        ? (10 - Math.min(product.nutriscore_score, 8)) / 2
        : 4.0
    ).toFixed(1);
    rating = Math.max(3.0, Math.min(5.0, rating)); // Ensure rating is between 3 and 5

    return {
      id: product.code,
      name,
      brand,
      image: imageUrl,
      categories: categories.length > 0 ? categories : ["organic"],
      rating,
      price: (Math.random() * 100 + 50).toFixed(2), // Mock price since API doesn't provide one
    };
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={`skeleton-${index}`}>
          <Card sx={{ height: "100%", borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={28} width="80%" />
              <Skeleton variant="text" height={20} width="40%" />
              <Skeleton variant="text" height={24} width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ));
  };

  return (
    <Box sx={{ mt: 8, mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          fontWeight={700}
          color={
            theme.palette.mode === "light" ? "primary.main" : "primary.light"
          }
        >
          Featured Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewShop}
          sx={{ borderRadius: 2 }}
        >
          View All Products
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {loading
          ? renderSkeletons()
          : featuredProducts.map((product) => {
              const formattedProduct = formatProduct(product);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  key={formattedProduct.id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 5,
                      },
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={formattedProduct.image}
                      alt={formattedProduct.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        {formattedProduct.categories.map((category, index) => (
                          <Chip
                            key={index}
                            label={category}
                            size="small"
                            color={
                              category === "organic"
                                ? "success"
                                : category === "grain"
                                ? "primary"
                                : category === "vegetable"
                                ? "secondary"
                                : "default"
                            }
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {formattedProduct.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {formattedProduct.brand}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "warning.main",
                          }}
                        >
                          <StarIcon fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {formattedProduct.rating}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            ml: "auto",
                            fontWeight: 700,
                            color:
                              theme.palette.mode === "light"
                                ? "primary.main"
                                : "primary.light",
                          }}
                        >
                          ₹{formattedProduct.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
