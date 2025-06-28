import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  Paper,
  Alert,
  Link,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LinkIcon from "@mui/icons-material/Link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Mock Amazon products data generator
const generateMockProducts = (searchTerm) => {
  // Return some mock products related to the search term
  return [
    {
      id: 'mock-1',
      title: `${searchTerm} Seeds - Premium Quality`,
      image: 'https://source.unsplash.com/random/300x300/?seeds',
      price: '₹549',
      url: `https://www.amazon.in/s?k=${searchTerm}+seeds`
    },
    {
      id: 'mock-2',
      title: `Organic ${searchTerm} Fertilizer`,
      image: 'https://source.unsplash.com/random/300x300/?fertilizer',
      price: '₹799',
      url: `https://www.amazon.in/s?k=${searchTerm}+fertilizer`
    },
    {
      id: 'mock-3',
      title: `${searchTerm} Farming Equipment`,
      image: 'https://source.unsplash.com/random/300x300/?farm+equipment',
      price: '₹1,249',
      url: `https://www.amazon.in/s?k=${searchTerm}+farming+equipment`
    },
    {
      id: 'mock-4',
      title: `${searchTerm} Pesticide - Organic`,
      image: 'https://source.unsplash.com/random/300x300/?pesticide',
      price: '₹349',
      url: `https://www.amazon.in/s?k=${searchTerm}+pesticide`
    }
  ];
};

const AmazonProductsSection = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API loading with mock data
  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      const mockProducts = generateMockProducts(searchTerm);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!searchTerm) {
    return null;
  }

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          textAlign: "center",
          mt: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 1,
        }}
      >
        <CircularProgress size={30} sx={{ mb: 2 }} />
        <Typography variant="body2">
          Finding related products for "{searchTerm}"...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body2" color="text.secondary" align="center">
          We couldn't find products matching "{searchTerm}" on Amazon.
        </Typography>
      </Paper>
    );
  }

  if (products.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No products found on Amazon for "{searchTerm}".
        </Alert>
        <Typography variant="body2" color="text.secondary" align="center">
          Try a different search term or check back later.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ my: 3 }}>
      <Paper sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            mb: 2,
          }}
        >
          <ShoppingBagIcon sx={{ mr: 1, color: "#e77600" }} />
          Similar Products
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          We couldn't find "{searchTerm}" in our store, but here are some similar products that might help:
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: "contain", p: 1 }}
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    component="h3"
                    sx={{
                      height: "2.5em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 1,
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {product.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0, mt: "auto" }}>
                  <Button
                    component={Link}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="warning"
                    fullWidth
                    startIcon={<OpenInNewIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      bgcolor: "#FF9900",
                      "&:hover": {
                        bgcolor: "#E88A00",
                      },
                    }}
                    onClick={() => {
                      alert("This is a mock product recommendation. In a real app, this would link to the product.");
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Alert severity="info" sx={{ mt: 3 }}>
          These are sample product recommendations. In a production app, these could be from your inventory or partnerships.
        </Alert>
      </Paper>
    </Box>
  );
};

AmazonProductsSection.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default AmazonProductsSection;
