import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useTokenStore from "../../store/useTokenStore";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { token } = useTokenStore((state) => state);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // 🚨 TEMPORARY: Authentication disabled for development/testing
  // Set this to false to re-enable authentication
  const DISABLE_AUTH = true;

  useEffect(() => {
    // Simulate a small delay to check authentication status
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while checking authentication
  if (isChecking) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "white", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "white", fontWeight: 500 }}>
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  // 🚨 TEMPORARY: Skip all authentication checks when disabled
  if (DISABLE_AUTH) {
    console.log("🚨 Authentication is temporarily disabled");
    // Still handle auth page redirects for logged-in users
    if (!requireAuth && token && (location.pathname.includes("/auth/"))) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !token) {
    toast.error("Please sign in to access this feature", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect to login page with the current location for redirect after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access auth pages, redirect to home
  if (!requireAuth && token && (location.pathname.includes("/auth/"))) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
