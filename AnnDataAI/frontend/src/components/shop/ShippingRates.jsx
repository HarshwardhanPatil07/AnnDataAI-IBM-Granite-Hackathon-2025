import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const ShippingRates = ({ onSelectRate = () => {} }) => {
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingRates = async () => {
      try {
        // In a real application, you would fetch shipping rates from a shipping API
        // using the customer's address and cart information
        // For this demo, we'll simulate a network request with mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock shipping rates data
        const mockRates = [
          {
            id: "standard",
            name: "Standard Shipping",
            price: 60,
            estimated_days: "3-5",
            icon: <LocalShippingIcon />,
          },
          {
            id: "express",
            name: "Express Shipping",
            price: 120,
            estimated_days: "1-2",
            icon: <AirplanemodeActiveIcon />,
          },
          {
            id: "economy",
            name: "Economy Shipping",
            price: 40,
            estimated_days: "5-8",
            icon: <DirectionsBoatIcon />,
          },
        ];

        setRates(mockRates);
        // Pre-select standard shipping by default
        const defaultRate = mockRates.find((rate) => rate.id === "standard");
        setSelectedRate(defaultRate);
        onSelectRate(defaultRate);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shipping rates:", err);
        setError("Failed to load shipping options. Please try again later.");
        setLoading(false);
      }
    };

    fetchShippingRates();
  }, [onSelectRate]);

  const handleRateChange = (event) => {
    const rateId = event.target.value;
    const rate = rates.find((r) => r.id === rateId);
    setSelectedRate(rate);
    onSelectRate(rate);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
        }}
      >
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography variant="body2">Loading shipping options...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Shipping Method
      </Typography>

      <RadioGroup value={selectedRate?.id || ""} onChange={handleRateChange}>
        {rates.map((rate) => (
          <Paper
            key={rate.id}
            elevation={selectedRate?.id === rate.id ? 2 : 0}
            sx={{
              mb: 1.5,
              p: 1.5,
              borderRadius: 1,
              border: "1px solid",
              borderColor:
                selectedRate?.id === rate.id ? "primary.main" : "divider",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "background.paper",
              },
            }}
          >
            <FormControlLabel
              value={rate.id}
              control={<Radio />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 1.5, color: "text.secondary" }}>
                      {rate.icon}
                    </Box>
                    <Box>
                      <Typography variant="body1">{rate.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Delivery in {rate.estimated_days} business days
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ₹{rate.price}
                  </Typography>
                </Box>
              }
              sx={{
                mx: 0,
                width: "100%",
                ".MuiFormControlLabel-label": {
                  width: "100%",
                },
              }}
            />
          </Paper>
        ))}
      </RadioGroup>
    </Box>
  );
};

export default ShippingRates;
