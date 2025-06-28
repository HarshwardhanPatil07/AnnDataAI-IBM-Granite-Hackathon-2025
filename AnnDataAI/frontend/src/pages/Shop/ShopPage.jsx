import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Badge,
  Chip,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/shop/ProductCard";
import agricultureProducts from "../../data/agricultureProducts";
import { useCart } from "../../context/CartContext";
import AmazonProductsSection from "../../components/shop/AmazonProductsSection";

const categories = [
  { id: "all", label: "All Products" },
  { id: "seeds", label: "Seeds" },
  { id: "fertilizers", label: "Fertilizers" },
  { id: "tools", label: "Tools & Equipment" },
  { id: "pesticides", label: "Pesticides" },
  { id: "harvested", label: "Harvested Products" },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(agricultureProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [showAmazonProducts, setShowAmazonProducts] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    filterProducts();
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery]);

  const filterProducts = () => {
    let filtered = agricultureProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );

      // Save the search term for potential Amazon fallback
      setLastSearchTerm(searchQuery);

      // If no products found and search query exists, show Amazon products
      setShowAmazonProducts(filtered.length === 0 && query.length > 0);
    } else {
      // If search query is empty, don't show Amazon products
      setShowAmazonProducts(false);
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewCart = () => {
    navigate("/shop/cart");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of products when page changes
    document
      .getElementById("products-grid")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Simple Hero Section */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          height: { xs: 200, md: 300 },
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Agriculture"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pl: { xs: 3, md: 6 },
            pr: { xs: 3, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              mb: 1,
              maxWidth: { md: "60%" },
            }}
          >
            Farmers Agricultural Shop
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              mb: 2,
              maxWidth: { md: "50%" },
              fontWeight: 400,
              display: { xs: "none", sm: "block" },
            }}
          >
            Quality farming supplies with options to buy or rent equipment
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
            sx={{
              borderRadius: 1,
              py: 1,
              px: 3,
              fontWeight: 600,
              width: { xs: "100%", sm: "auto" },
              maxWidth: 200,
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Box>

      {/* Header Section */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Agricultural Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewCart}
          startIcon={<ShoppingBagIcon />}
          sx={{
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
          size="small"
        >
          <Badge badgeContent={cart.totalItems} color="error" sx={{ mr: 1 }}>
            Cart
          </Badge>
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FilterListIcon sx={{ mr: 1, color: "primary.main" }} />
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 40,
                ".MuiTabs-indicator": {
                  backgroundColor: "primary.main",
                  height: 2,
                },
                ".MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: "auto",
                  minHeight: 40,
                  px: 1.5,
                  py: 0,
                  fontSize: "0.85rem",
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.label}
                  value={category.id}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      {/* Simple Feature Highlights */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <VerifiedIcon
                sx={{ fontSize: 24, color: "primary.main", mr: 1 }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                Quality Products
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              All products tested for performance in local farming conditions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocalShippingIcon
                sx={{ fontSize: 24, color: "primary.main", mr: 1 }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                Village Delivery
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Free delivery to your village on orders above ₹1,000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <SupportAgentIcon
                sx={{ fontSize: 24, color: "primary.main", mr: 1 }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                Farmer Support
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Call our agriculture experts for guidance in your local language
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Results Count and Pagination Controls */}
      {filteredProducts.length > 0 && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {filteredProducts.length} products found
            </Typography>
            <Chip
              label={
                categories.find((cat) => cat.id === selectedCategory)?.label ||
                "All Products"
              }
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 110, mr: 2 }}>
              <InputLabel id="products-per-page-label">Show</InputLabel>
              <Select
                labelId="products-per-page-label"
                value={productsPerPage}
                label="Show"
                onChange={handleProductsPerPageChange}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value={12}>12 per page</MenuItem>
                <MenuItem value={24}>24 per page</MenuItem>
                <MenuItem value={36}>36 per page</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}

      {/* Products Grid */}
      <div id="products-grid">
        {filteredProducts.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {currentProducts.map((product) => (
                <Grid
                  item
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    mb: 2,
                  }}
                >
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <ProductCard product={product} />
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ my: 4 }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  shape="rounded"
                  size="medium"
                />
              </Stack>
            )}
          </>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                No products found in our store
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {searchQuery
                  ? `We couldn't find any products matching "${searchQuery}" in our store.`
                  : "Try changing your search or filter to find products"}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                size="small"
              >
                Show All Products
              </Button>
            </Paper>

            {/* Amazon Products Section - will show up when no results are found with search */}
            {showAmazonProducts && (
              <AmazonProductsSection searchTerm={lastSearchTerm} />
            )}
          </>
        )}
      </div>

      {/* Simple Call-to-action */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 1,
          bgcolor: "primary.main",
          color: "white",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Need help choosing the right farming products?
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
          Our team of agriculture experts is available to provide guidance based
          on your specific farming needs
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "primary.main",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.9)",
            },
            borderRadius: 1,
          }}
          size="small"
        >
          Call Helpline: 1800-XXX-XXXX
        </Button>
      </Paper>
    </Container>
  );
};

export default ShopPage;
