import React from "react";
import { Alert, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/useTokenStore";

export default function LoginAlert() {
  const navigate = useNavigate();
  const { token } = useTokenStore();

  if (token) {
    return null; // Don't show anything if user is logged in
  }

  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity="warning"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate("/auth/login")}
          >
            Sign In
          </Button>
        }
      >
        <Typography variant="body2">
          You need to be logged in to complete your purchase. Please sign in or
          create an account.
        </Typography>
      </Alert>
    </Box>
  );
}
