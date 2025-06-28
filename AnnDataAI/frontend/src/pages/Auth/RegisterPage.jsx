import { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../http/api";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/useTokenStore";

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

// Modern styled components matching LoginPage
const RegisterContainer = styled(Box)(({ theme }) => ({
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

const RegisterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  maxWidth: "520px",
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
  marginBottom: theme.spacing(2),
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

export default function SignUp() {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const { setToken, setUserId } = useTokenStore((state) => state);
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: register,
		onSuccess: (response) => {
			const token = response.data.token;
			const userId = response.data.user.id;
			setToken(token);
			setUserId(userId);
			toast.success("Account created successfully!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			navigate("/");
		},
		onError: (error) => {
			console.error("Registration error:", error);
			
			let errorMessage = "Registration failed. Please try again.";
			
			if (error?.response?.data?.message) {
				errorMessage = error.response.data.message;
			} else if (error?.message) {
				errorMessage = error.message;
			}
			
			toast.error(errorMessage, {
				position: "top-right",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		},
	});
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);

		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!email || !password || !firstName || !lastName) {
			toast.error("Please fill all fields!", {
				position: "top-right",
				autoClose: 4000,
			});
			setLoading(false);
			return;
		}

		// Combine firstName and lastName into a single name field for backend
		const name = `${firstName} ${lastName}`.trim();
		const registrationData = { email, password, name };
		
		console.log("Registration attempt with data:", {
			...registrationData,
			password: "[HIDDEN]"
		});
		
		mutation.mutate(registrationData);
		setLoading(false);
	};

	// Toggle password visibility
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<RegisterContainer>
			<CssBaseline />
			<RegisterPaper elevation={0}>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<StyledAvatar>
						<PersonAddIcon sx={{ fontSize: 32 }} />
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
						Join AnnDataAI
					</Typography>
					
					<Typography 
						variant="body1" 
						color="text.secondary" 
						sx={{ mb: 4, textAlign: "center" }}
					>
						Create your account to access advanced agricultural insights
					</Typography>

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<StyledTextField
									inputRef={firstNameRef}
									autoComplete="fname"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon sx={{ color: "#667eea" }} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<StyledTextField
									inputRef={lastNameRef}
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon sx={{ color: "#667eea" }} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<StyledTextField
									inputRef={emailRef}
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon sx={{ color: "#667eea" }} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<StyledTextField
									inputRef={passwordRef}
									required
									fullWidth
									name="password"
									label="Password"
									type={showPassword ? "text" : "password"}
									id="password"
									autoComplete="new-password"
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
							</Grid>
						</Grid>
						
						<GradientButton
							type="submit"
							fullWidth
							variant="contained"
							disabled={loading}
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? "Creating Account..." : "Create Account"}
						</GradientButton>
						
						<Grid container justifyContent="center" sx={{ mt: 2 }}>
							<Grid item>
								<StyledLink href="/auth/login" variant="body2">
									Already have an account? Sign in
								</StyledLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				
				<Copyright />
			</RegisterPaper>
			
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
		</RegisterContainer>
	);
}