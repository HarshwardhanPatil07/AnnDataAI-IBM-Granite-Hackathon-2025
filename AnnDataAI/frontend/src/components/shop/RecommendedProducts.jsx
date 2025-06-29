import React from "react";
import { Box, Typography, Grid, useTheme, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import agricultureProducts from "../../data/agricultureProducts.jsx";

const RecommendedProducts = ({ currentProductId, category }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Get recommended products from the same category, excluding current product
  const recommendedProducts = agricultureProducts
    .filter(
      (product) =>
        product.id !== currentProductId &&
        (category ? product.category === category : true)
    )
    .slice(0, 4); // Show up to 4 recommended products

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          color="text.primary"
        >
          Recommended Products
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/shop")}
        >
          View All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {recommendedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedProducts;
