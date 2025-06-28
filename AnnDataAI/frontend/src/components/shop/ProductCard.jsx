import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Rating,
  Chip,
  Collapse,
  CardActions,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

// Styled component for expand icon animation
const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Custom theme colors for buy/rent options
const buyColor = "#1565c0"; // Blue color
const rentColor = "#6a1b9a"; // Purple that complements green
const addToCartColor = "#1b5e20"; // Dark green for add to cart button

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState("buy");
  const { addItem } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    addItem(
      {
        ...product,
        isRental: purchaseOption === "rent",
        price:
          purchaseOption === "rent"
            ? Math.round(product.price * 0.2)
            : product.price,
        rentalUnit: "per month",
      },
      1
    );
  };

  const handleViewDetails = () => {
    navigate(`/shop/product/${product.id}`);
  };

  // Function to display category with proper formatting
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

  // Calculate rental price (20% of buying price)
  const rentalPrice = Math.round(product.price * 0.2);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 200,
        }}
        onClick={handleViewDetails}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            product.image ||
            "https://via.placeholder.com/300x200?text=Product+Image"
          }
          alt={product.name}
          sx={{
            objectFit: "cover",
          }}
        />
        <Chip
          label={categoryDisplay.label}
          color={categoryDisplay.color}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            fontWeight: 600,
            fontSize: "0.7rem",
            height: 22,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pt: 1.5, pb: 1 }}>
        <Typography
          variant="subtitle1"
          component="h3"
          title={product.name}
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "text.primary",
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "40px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.rating})
          </Typography>

          {product.inStock ? (
            <Chip
              icon={
                <VerifiedOutlinedIcon sx={{ fontSize: "0.8rem !important" }} />
              }
              label="In Stock"
              size="small"
              color="success"
              variant="outlined"
              sx={{
                ml: "auto",
                height: 20,
                fontSize: "0.7rem",
                "& .MuiChip-label": { px: 0.5 },
                "& .MuiChip-icon": { ml: 0.5 },
              }}
            />
          ) : (
            <Chip
              label="Out of Stock"
              size="small"
              color="error"
              variant="outlined"
              sx={{
                ml: "auto",
                height: 20,
                fontSize: "0.7rem",
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
        </Box>

        <ToggleButtonGroup
          value={purchaseOption}
          exclusive
          onChange={(event, newOption) => {
            if (newOption !== null) {
              setPurchaseOption(newOption);
            }
          }}
          aria-label="purchase option"
          size="small"
          sx={{
            width: "100%",
            mb: 1.5,
            "& .MuiToggleButtonGroup-grouped": {
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "capitalize",
              py: 0.4,
            },
          }}
        >
          <ToggleButton
            value="buy"
            aria-label="buy option"
            sx={{
              width: "50%",
              "&.Mui-selected": {
                bgcolor: buyColor,
                color: "white",
                "&:hover": {
                  bgcolor: "#0d47a1", // Darker blue on hover
                },
              },
            }}
          >
            Buy
          </ToggleButton>
          <ToggleButton
            value="rent"
            aria-label="rent option"
            sx={{
              width: "50%",
              "&.Mui-selected": {
                bgcolor: rentColor,
                color: "white",
                "&:hover": {
                  bgcolor: "#4a1270", // Darker purple on hover
                },
              },
            }}
          >
            Rent
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography
          variant="h6"
          component="p"
          sx={{
            fontWeight: 700,
            color: purchaseOption === "buy" ? buyColor : rentColor,
            fontSize: "1.1rem",
            mb: 0.5,
          }}
        >
          ₹
          {purchaseOption === "buy"
            ? product.price.toLocaleString("en-IN")
            : rentalPrice.toLocaleString("en-IN")}
          <Typography
            component="span"
            variant="caption"
            color="text.secondary"
            sx={{ ml: 0.5, fontWeight: 400 }}
          >
            {purchaseOption === "buy" ? product.unit : "per month"}
          </Typography>
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
            height: "32px",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ px: 2, py: 1, mt: "auto" }}>
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            borderRadius: 1.5,
            flex: 1,
            boxShadow: 0,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            bgcolor: addToCartColor,
            "&:hover": {
              bgcolor: "#133814", // Darker green on hover
            },
          }}
          size="small"
          disabled={!product.inStock}
        >
          {purchaseOption === "buy" ? "Add to Cart" : "Rent Now"}
        </Button>
        <IconButton
          onClick={handleViewDetails}
          size="small"
          sx={{
            ml: 1,
            bgcolor: "action.hover",
            color: "text.primary",
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="small"
        >
          <ExpandMoreIcon fontSize="small" />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 1, px: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} fontSize="0.8rem">
            Features:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 0 }}>
            {product.features.map((feature, index) => (
              <Typography
                component="li"
                variant="caption"
                key={index}
                sx={{ mb: 0.5 }}
              >
                {feature}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Add PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProductCard;
