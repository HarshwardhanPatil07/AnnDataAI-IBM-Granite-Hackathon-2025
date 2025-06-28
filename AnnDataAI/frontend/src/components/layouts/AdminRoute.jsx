import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../../store/useTokenStore";
import { Box, CircularProgress, Typography } from "@mui/material";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const { token, userRole } = useTokenStore((state) => state);

  useEffect(() => {
    // Short delay to ensure everything is loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [token, userRole]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (userRole !== "admin") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" color="error">
          Access Denied: Admin privileges required.
        </Typography>
        <Typography variant="body1">
          Please log in with an admin account to access this page.
        </Typography>
      </Box>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
