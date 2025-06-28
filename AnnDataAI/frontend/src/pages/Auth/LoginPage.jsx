import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../http/api";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import app from "../../config/firebase";
import useTokenStore from "../../store/useTokenStore";

// Copyright component
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        AnnDataAI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Modern styled components with gradient backgrounds and animations
const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"0.5\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
    animation: "float 20s ease-in-out infinite",
  }
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  maxWidth: "480px",
  width: "100%",
  position: "relative",
  zIndex: 1,
  animation: "slideUp 0.8s ease-out",
  "@keyframes slideUp": {
    from: {
      opacity: 0,
      transform: "translateY(60px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: "0 auto 24px",
  width: 72,
  height: 72,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.9)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 1)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 32px rgba(102, 126, 234, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  padding: "16px 32px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 32px rgba(102, 126, 234, 0.6)",
    background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
  },
  "&:disabled": {
    background: "rgba(102, 126, 234, 0.5)",
    transform: "none",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: "12px 24px",
  borderRadius: "16px",
  border: "2px solid rgba(102, 126, 234, 0.2)",
  background: "rgba(255, 255, 255, 0.9)",
  color: "#333",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(102, 126, 234, 0.4)",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#667eea",
  textDecoration: "none",
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#5a67d8",
    textDecoration: "underline",
  },
}));

// Firebase auth configuration
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUserId, setUserRole } = useTokenStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, default to home
  const from = location.state?.from?.pathname || "/";

  // Mutation for email/password login
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Response data:", response.data);
      const { access_token, user_id, role, token, user } = response.data;

      // Use either access_token or token, whichever is available
      const authToken = access_token || token || "";
      const userId = user_id || (user && user.id) || "";
      const userRole = role || (user && user.role) || "";

      console.log(
        "Login successful, token:",
        authToken.substring(0, 10) + "..."
      );
      console.log("User role:", userRole);

      // Store in Zustand
      setToken(authToken);
      setUserId(userId);
      setUserRole(userRole);

      // Also store in localStorage if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem("token", authToken);
        console.log("Token stored in localStorage for remember me");
      }

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect based on role or return to previous page
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(from, { replace: true });
      }
    },
    onError: () => {
      toast.error("Incorrect email or password", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Function for handling Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch(
        "http://localhost:3600/api/users/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Google Sign-In successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        const token = data.access_token;
        setToken(token);
        navigate(from, { replace: true });
      } else {
        toast.error(`Google Sign-In failed: ${data.message}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Error during Google Sign-In", error);
      toast.error("Google Sign-In failed!", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function for handling email/password sign-in
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      toast.error("Please fill email and password!", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    mutation.mutate({ email, password });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handling remember me option
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("auth-token");
    }
  };

  return (
    <LoginContainer>
      <CssBaseline />
      <LoginPaper elevation={0}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <StyledAvatar>
            <LockOutlinedIcon sx={{ fontSize: 32 }} />
          </StyledAvatar>
          
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, textAlign: "center" }}
          >
            Sign in to your AnnDataAI account to continue
          </Typography>

          <Box component="form" onSubmit={handleOnSubmit} sx={{ width: "100%" }}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputRef={emailRef}
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              name="password"
              inputRef={passwordRef}
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": {
                      color: "#667eea",
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{ mb: 2 }}
            />
            
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </GradientButton>

            <GoogleButton
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignIn}
              disabled={loading}
              startIcon={<GoogleIcon />}
            >
              {loading ? "Signing In..." : "Sign in with Google"}
            </GoogleButton>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <StyledLink href="#" variant="body2">
                  Forgot password?
                </StyledLink>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <StyledLink href="/auth/register" variant="body2">
                  Don't have an account? Sign Up
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        <Copyright />
      </LoginPaper>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </LoginContainer>
  );
}
